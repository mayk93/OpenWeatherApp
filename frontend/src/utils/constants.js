/**
 * Created by michael on 25/09/2017.
 */

export const BACKEND_SERVER = (
    process.env.NODE_ENV === 'production' ? 'https://myapps.gallery:8000' : 'http://localhost:8000'
);

export const NARROW_SCREEN_WIDTH = 800;

export const BREAKPOINTS = [
    {lower: 370, upper: 420, style: {width: "150px"}},
    {lower: 420, upper: 470, style: {width: "200px"}},
    {lower: 470, upper: 530, style: {width: "250px"}},
    {lower: 530, upper: 580, style: {width: "300px"}},
    {lower: 580, upper: 650, style: {width: "350px"}},
    {lower: 650, upper: 750, style: {width: "400px"}},
    {lower: 750, upper: 800, style: {width: "450px"}}
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