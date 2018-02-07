import os

PROD = os.environ.get("PROD") == "true"

ALLOWED_ORIGINS = ["https://projects.myapps.gallery"] if PROD else ["http://localhost:3000"]
KEY_LOCATIONS = ["keys.json", "/home/deploy/server/keys.json"]