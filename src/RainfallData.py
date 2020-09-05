import Algorithmia
import ssl
import pandas as pd

def get_rainfall_totals(site):
    ssl._create_default_https_context = ssl._create_unverified_context

    rainfall_one_day = pd.read_csv("https://hydromet.lcra.org/media/Rainfall.csv")
    rainfall_five_day = pd.read_csv("https://hydromet.lcra.org/media/Rain5Day.csv")

    df = pd.merge(rainfall_one_day, rainfall_five_day)

    df.columns = (
        df.columns.str.strip()
        .str.lower()
        .str.replace(" ", "_")
        .str.replace("(", "")
        .str.replace(")", "")
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
    ]

    df = df[df["site"] == site]

    df = df.drop(
        [
            "site",
            "location",
            "date_time",
            "one_day_report_date",
            "basin",
            "today",
            "last24",
            "five_day_report_date",
        ],
        axis=1,
    )

    no_data = False
    if df.empty:
        no_data = True
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
            },
            ignore_index=True,
        )
    return df

def apply(input):
    site = input.get("site", 2959)
    result = get_rainfall_totals(site)
    return result.to_json(orient="records", lines=True)

if __name__ == "__main__":
    input = {"site": 2959}
    print(apply(input=input))
