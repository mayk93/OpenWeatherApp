/**
 * Created by michael on 21/09/2017.
 */

let OPEN_WEATHER_API_KEY = "39c0045ecf5427f863ee825ebba7fd3b"

/*
    Todo:
    1. In the future, request these from the server
    2. In the further future, ask the server to perform the requests, do not talk to APIs directly
*/
export default () => {
    return {
        open_weather: OPEN_WEATHER_API_KEY
    }
}