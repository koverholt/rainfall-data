import csv
import io
import re
import time

import requests
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DEFAULT_SITE = 2959
CACHE_TTL_SECONDS = 60
_cache = {
    "timestamp": 0.0,
    "records_by_site": {},
    "sites_list": [],
}


def _norm_loc(loc: str) -> str:
    return re.sub(r"[, ]+", " ", (loc or "")).strip().lower()


def _parse_float(val) -> float:
    if val is None:
        return 0.0
    s = str(val).strip()
    if not s or s.upper() in ("NULL", "NAN", "NONE"):
        return 0.0
    try:
        return float(s)
    except ValueError:
        return 0.0


def _fetch_csv_rows(url: str):
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    reader = csv.reader(io.StringIO(resp.text))
    rows = list(reader)
    return rows[1:] if len(rows) > 1 else []


def load_all_gauges():
    now = time.monotonic()
    if _cache["records_by_site"] and (now - _cache["timestamp"]) < CACHE_TTL_SECONDS:
        return _cache["records_by_site"], _cache["sites_list"]

    r1_rows = _fetch_csv_rows("https://hydromet.lcra.org/media/Rainfall.csv")
    r5_rows = _fetch_csv_rows("https://hydromet.lcra.org/media/Rain5Day.csv")
    rm_rows = _fetch_csv_rows("https://hydromet.lcra.org/media/RainMonthYear.csv")

    r5_map = {}
    for row in r5_rows:
        if len(row) >= 10 and row[0].strip().isdigit():
            key = (int(row[0].strip()), _norm_loc(row[1]))
            r5_map[key] = row

    rm_map = {}
    for row in rm_rows:
        if len(row) >= 7 and row[0].strip().isdigit():
            key = (int(row[0].strip()), _norm_loc(row[1]))
            rm_map[key] = row

    records_by_site = {}
    sites_list = []

    for row in r1_rows:
        if len(row) < 8 or not row[0].strip().isdigit():
            continue
        site_id = int(row[0].strip())
        location = row[1].strip()
        key = (site_id, _norm_loc(location))

        r5 = r5_map.get(key)
        rm = rm_map.get(key)
        if not r5 or not rm:
            continue

        this_year = _parse_float(rm[5])
        last_year = _parse_float(rm[6])
        yoy = round((this_year / last_year) * 100) if last_year > 0 else 0.0
        site_name = location.rsplit(" ", 2)[0]

        rec = {
            "site": site_id,
            "location": location,
            "Previous 1 hour": _parse_float(row[3]),
            "Previous 3 hours": _parse_float(row[4]),
            "Previous 6 hours": _parse_float(row[5]),
            "Previous 24 hours": _parse_float(row[6]),
            "Since midnight": _parse_float(row[7]),
            "1 day ago": _parse_float(r5[5]),
            "2 days ago": _parse_float(r5[6]),
            "3 days ago": _parse_float(r5[7]),
            "4 days ago": _parse_float(r5[8]),
            "5 day total": _parse_float(r5[9]),
            "30 day total": _parse_float(rm[3]),
            "This month": _parse_float(rm[4]),
            "This year": this_year,
            "Last year": last_year,
            "Site name": site_name,
            "Year over year": float(yoy),
        }
        records_by_site[site_id] = rec
        sites_list.append({"site": site_id, "location": location})

    sites_list.sort(key=lambda s: s["location"].lower())

    _cache["timestamp"] = now
    _cache["records_by_site"] = records_by_site
    _cache["sites_list"] = sites_list
    return records_by_site, sites_list


@app.post("/")
async def get_rainfall_amounts(request: Request):
    try:
        request_json = await request.json()
    except Exception:
        request_json = {}

    raw_site = request_json.get("site", DEFAULT_SITE) if isinstance(request_json, dict) else DEFAULT_SITE
    try:
        site_id = int(raw_site)
    except (ValueError, TypeError):
        site_id = DEFAULT_SITE

    try:
        records_by_site, sites_list = load_all_gauges()
    except requests.RequestException as exc:
        raise HTTPException(status_code=502, detail=f"Failed to fetch upstream LCRA data: {exc}")

    if not records_by_site:
        raise HTTPException(status_code=502, detail="No rainfall gauges returned from upstream")

    selected = (
        records_by_site.get(site_id)
        or records_by_site.get(DEFAULT_SITE)
        or next(iter(records_by_site.values()))
    )

    return {
        "rainfall_amounts": [selected],
        "list_of_sites": sites_list,
    }
