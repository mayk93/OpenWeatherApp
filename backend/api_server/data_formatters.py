# Python
import hashlib

# Formatter


def format_autocomplete(predictions):
    for prediction in predictions:
        prediction["hash"] = hashlib.sha224(prediction["description"].encode("utf-8")).hexdigest()
    return predictions


def format_weather_data(weather_data):
    # print("This is the received weather data: ", weather_data)

    name = get_weather_data_name(weather_data)
    temperature = get_weather_data_temperature(weather_data["list"])
    pressure = get_weather_data_pressure(weather_data["list"])
    humidity = get_weather_data_humidity(weather_data["list"])

    temperature, pressure, humidity = pad_to("longest", [temperature, pressure, humidity])

    return [{
        "name": name,
        "location": get_weather_data_location(weather_data),
        "temperature": temperature,
        "pressure": pressure,
        "humidity": humidity,
        "hash": hashlib.sha224(name.encode("utf-8")).hexdigest()
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


def pad(desired_length):
    def _(array):
        while len(array) < desired_length:
            array.append(0)
        return array
    return _


def pad_to(mode, arrays):
    if mode == "longest":
        max_len = max(map(len, arrays))
        return [_ for _ in map(pad(max_len), arrays)]
    else:
        raise NotImplementedError("Mode %s not yet implemented" % mode)


import unittest


class TestHelpers(unittest.TestCase):
    def test_pad_to(self):
        result = pad_to("longest", [[1, 2, 3, 4], [1, 2], [1, 2, 3, 4, 5, 6]])

        self.assertEquals(len(result), 3)
        self.assertEqual(result[0][len(result[0]) - 1], 0)
