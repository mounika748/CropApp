import requests


def get_weather(latitude, longitude, api_key):

    url = "https://api.openweathermap.org/data/2.5/weather"

    params = {
        "lat": latitude,
        "lon": longitude,
        "appid": api_key,
        "units": "metric"
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        if response.status_code != 200:

            return {
                "error": "Weather service error: "
                         + str(response.status_code)
            }

        data = response.json()

        rainfall = 0

        if "rain" in data:

            rainfall = data["rain"].get(
                "1h",
                0
            )

        return {
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "rainfall": rainfall,
            "description": data["weather"][0]["description"]
        }

    except requests.exceptions.RequestException as error:

        return {
            "error": "Could not connect to weather service."
        }

    except Exception:

        return {
            "error": "Unable to read weather data."
        }