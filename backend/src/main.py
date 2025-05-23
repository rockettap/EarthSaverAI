import csv
from enum import Enum
from typing import List
from datetime import datetime

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from fastapi.staticfiles import StaticFiles

from .hemisphere_ranges import *


class HemisphereEnum(str, Enum):
    north = "north"
    south = "south"


class Forecast(BaseModel):
    year: int
    month: int
    hemisphere: HemisphereEnum
    extent: float
    image: HttpUrl

    class Config:
        json_schema_extra = {
            "example": {
                "extent": 10.403,
                "hemisphere": "north",
                "month": 10,
                "year": 1978,
                "image": "https://earthsaverai.onrender.com/static/north-images/11.webp",
            }
        }


from starlette.responses import FileResponse


class CacheStaticFiles(StaticFiles):
    def __init__(self, *args, cache_max_age: int, **kwargs):
        self.cache_max_age = cache_max_age
        super().__init__(*args, **kwargs)

    async def get_response(self, path: str, scope):
        response: FileResponse = await super().get_response(path, scope)
        response.headers["Cache-Control"] = (
            f"public, max-age={self.cache_max_age}, immutable"
        )
        return response


app = FastAPI(title="EarthSaverAI")

app.mount(
    "/static",
    CacheStaticFiles(directory="static", cache_max_age=31536000),
    name="static",
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_image_url(hemisphere: HemisphereEnum, extent: float) -> HttpUrl:
    if hemisphere == HemisphereEnum.north:
        ranges = north_hemisphere_ranges
    elif hemisphere == HemisphereEnum.south:
        ranges = south_hemisphere_ranges
    else:
        raise ValueError()

    for r in ranges:
        if r["min"] <= extent <= r["max"]:
            url = f"https://earthsaverai.onrender.com/static/{hemisphere.value}-images/optimized/{r['part']}.webp"
            return HttpUrl(url)

    return HttpUrl("https://earthsaverai.onrender.com/static/default.webp")


def load_forecasts_from_csv(
    file_path: str, hemisphere: str, forecasts: List[Forecast]
) -> None:
    with open(file_path) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            date = datetime.strptime(row["Date"], "%m/%d/%Y")
            extent = float(row["Extent"])
            image = get_image_url(HemisphereEnum(hemisphere), extent)

            forecast = Forecast(
                year=date.year,
                month=date.month,
                hemisphere=HemisphereEnum(hemisphere),
                extent=extent,
                image=image,
            )
            forecasts.append(forecast)


forecasts: List[Forecast] = []

load_forecasts_from_csv("src/data/north_hemisphere_extent.csv", "north", forecasts)
load_forecasts_from_csv("src/data/south_hemisphere_extent.csv", "south", forecasts)


@app.get("/forecast")
def forecast(
    hemisphere: HemisphereEnum = Query(description="The hemisphere"),
    year: int = Query(ge=1978, le=2100, description="The year"),
) -> List[Forecast]:
    matching_forecasts = [
        forecast
        for forecast in forecasts
        if forecast.hemisphere == hemisphere and forecast.year == year
    ]

    if matching_forecasts:
        return matching_forecasts
    raise HTTPException(status_code=404)
