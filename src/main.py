import json
import ssl
import pandas as pd


def get_rainfall_totals(site):
    ssl._create_default_https_context = ssl._create_unverified_context

    rainfall_one_day = pd.read_csv("https://hydromet.lcra.org/media/Rainfall.csv")
    rainfall_five_day = pd.read_csv("https://hydromet.lcra.org/media/Rain5Day.csv")
    rainfall_month_year = pd.read_csv(
        "https://hydromet.lcra.org/media/RainMonthYear.csv"
    )

    rainfall_month_year.columns = [
        "Site",
        "Location",
        "DateTime",
        "Rainfall30Days",
        "RainfallMonth",
        "RainfallYear",
        "RainfallPrevYear",
    ]

    df = pd.merge(rainfall_one_day, rainfall_five_day)
    df = pd.merge(df, rainfall_month_year)

    df.columns = (
        df.columns.str.strip()
        .str.lower()
        .str.replace(" ", "_", regex=False)
        .str.replace("(", "", regex=False)
        .str.replace(")", "", regex=False)
    )

    df.columns = [
        "site",
        "location",
        "date_time",
        "Previous 1 hour",
        "Previous 3 hours",
        "Previous 6 hours",
        "Previous 24 hours",
        "Since midnight",
        "one_day_report_date",
        "basin",
        "today",
        "last24",
        "1 day ago",
        "2 days ago",
        "3 days ago",
        "4 days ago",
        "5 day total",
        "five_day_report_date",
        "datetime",
        "30 day total",
        "This month",
        "This year",
        "Last year",
    ]

    df_sites = df[["site", "location"]].copy()
    df = df[df["site"] == site]

    # Additional calculated values
    df["Site name"] = df["location"].iloc[0].rsplit(" ", 2)[0]
    df["This month"] = df["This month"].fillna(0)
    df["Year over year"] = round((df["This year"] / df["Last year"]) * 100)

    df = df.drop(
        [
            "date_time",
            "one_day_report_date",
            "basin",
            "today",
            "last24",
            "five_day_report_date",
            "datetime",
        ],
        axis=1,
    )

    # Payload if data is empty
    if df.empty:
        df = df.append(
            {
                "Previous 1 hour": 0,
                "Previous 3 hours": 0,
                "Previous 6 hours": 0,
                "Previous 24 hours": 0,
                "Since midnight": 0,
                "1 day ago": 0,
                "2 days ago": 0,
                "3 days ago": 0,
                "4 days ago": 0,
                "5 day total": 0,
                "30 day total": 0,
                "This month": 0,
                "This year": 0,
                "Last year": 0,
            },
            ignore_index=True,
        )
    return df, df_sites


def apply(request):
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)

    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    request_json = request.get_json(silent=True)
    site = request_json.get("site", 2959)
    rainfall_totals = get_rainfall_totals(site)
    rainfall_amounts = rainfall_totals[0].to_dict(orient="records")
    list_of_sites = rainfall_totals[1].to_dict(orient="records")

    result = {
        "rainfall_amounts": rainfall_amounts,
        "list_of_sites": list_of_sites,
    }

    return (json.dumps(result), 200, headers)
