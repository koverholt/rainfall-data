# rainfall-data

Display rainfall data in Central Texas

![Rainfall Data](https://github.com/koverholt/rainfall-data/blob/main/images/rainfall-totals.png?raw=true)

Data from https://hydromet.lcra.org/

## Deployment

Frontend (`site/`) deploys automatically to Cloudflare Pages (`rainfall.koverholt.com`) on push to `main`.

Backend (`src/`) deploys automatically to Cloud Run via Cloud Build trigger (`rainfall-data`) on push to `main`, or manually via:

```
gcloud run deploy rainfall-data --source src/ --region us-central1 --allow-unauthenticated
```
