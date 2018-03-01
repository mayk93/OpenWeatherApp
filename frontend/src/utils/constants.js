/**
 * Created by michael on 25/09/2017.
 */

export const BACKEND_SERVER = (
    process.env.NODE_ENV === 'production' ?
      'https://myapps.gallery:8000/api/open_weather'
      :
      'http://localhost:8000/api/open_weather'
);

export const NARROW_SCREEN_WIDTH = 800;

export const BREAKPOINTS = [
    {lower: 370, upper: 420, style: {width: 150}},
    {lower: 420, upper: 470, style: {width: 200}},
    {lower: 470, upper: 530, style: {width: 250}},
    {lower: 530, upper: 580, style: {width: 300}},
    {lower: 580, upper: 650, style: {width: 350}},
    {lower: 650, upper: 750, style: {width: 400}},
    {lower: 750, upper: 800, style: {width: 450}}
];

export const CITIES_EXAMPLE = [
    'London',
    'New York',
    'Paris',
    'Berlin',
    'San Francisco',
    'Bucharest',
    'Tokyo'
];
