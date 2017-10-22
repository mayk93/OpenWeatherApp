# Formatter


def format_autocomplete(predictions):
    return predictions


def format_weather_data(weather_data):
    # print("This is the received weather data: ", weather_data)

    return [{
        "name": get_weather_data_name(weather_data),
        "location": get_weather_data_location(weather_data),
        "temperature": get_weather_data_temperature(weather_data["list"]),
        "pressure": get_weather_data_pressure(weather_data["list"]),
        "humidity": get_weather_data_humidity(weather_data["list"])
    }]

# Helpers


def get_weather_data_name(weather_data):
    return weather_data["city"]["name"]


def get_weather_data_location(weather_data):
    return {
        "lat": weather_data["city"]["coord"]["lat"],
        "lng": weather_data["city"]["coord"]["lon"]
    }


def get_weather_data_temperature(weather_data_list):
    return get_weather_data_list(weather_data_list, "temp")


def get_weather_data_pressure(weather_data_list):
    return get_weather_data_list(weather_data_list, "pressure")


def get_weather_data_humidity(weather_data_list):
    return get_weather_data_list(weather_data_list, "humidity")


def get_weather_data_list(weather_data_list, list_item):
    temperature = []
    for entry in weather_data_list:
        temperature.append(entry["main"].get(list_item, 0.0))
    return temperature
