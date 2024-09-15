const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors")
const fetch = require('node-fetch');
const geonamesApiKey = process.env.GEO_NAMES_API_USER_NAME;
const pixabayApiKey = process.env.PIXABAY_API_KEY;
const weatherbitApiKey = process.env.WEATHER_BIT_API_KEY;
const geonamesBaseUrl = `http://api.geonames.org/searchJSON`;
const pixabayBaseUrl = `https://pixabay.com/api/`;
const weatherbitBaseUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
})

app.post('/travel', async (req, res) => {
    const { location, departureDate } = req.body;

    ///////////////////////////////////////////////////////////////// calling geonames and pixabay apis
    const geoNamesParams = new URLSearchParams({
        name: location,
        maxRows: 10,
        username: geonamesApiKey
    });
    const geoNamesURL = `${geonamesBaseUrl}?${geoNamesParams.toString()}`;

    const pixabayParams = new URLSearchParams({
        q: location,
        image_type: `photo`,
        editors_choice: true,
        per_page: 5,
        key: pixabayApiKey
    });
    const pixabayURL = `${pixabayBaseUrl}?${pixabayParams.toString()}`;

    const [geonamesResponse, pixabayResponse] = await Promise.all([
        fetch(geoNamesURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }),
        fetch(pixabayURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    ]);

    const locations = await geonamesResponse.json();
    const locationDetails = locations?.geonames?.[0];

    const locationImages = await pixabayResponse.json();

    ///////////////////////////////////////////////////////////////// calling weatherbit api
    const weatherbitParams = new URLSearchParams({
        lat: parseFloat(locationDetails?.lat),
        lon: parseFloat(locationDetails?.lng),
        key: weatherbitApiKey
    });
    const weatherbitURL = `${weatherbitBaseUrl}?${weatherbitParams.toString()}`;
    const weatherbitResponse = await fetch(weatherbitURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const WeatherDetails = await weatherbitResponse.json();

    const WeatherDates = WeatherDetails.data;
    const availableDates = getSurroundingDates(WeatherDates, departureDate);
    const availableDatesWeather = WeatherDates.filter(day =>
        availableDates.includes(day.datetime)
    );

    res.send({ location, availableDatesWeather, locationImages });
})


const getSurroundingDates = (WeatherDetails, enteredDate) => {
    const dates = WeatherDetails.map((dateWeather) => dateWeather.datetime)
    const enteredDateIndex = dates.findIndex(date => date === enteredDate);

    if (enteredDateIndex === -1) {
        return [];
    }

    // Get the 2 days before and 7 days after if they exist
    const startIndex = Math.max(0, enteredDateIndex - 2); // Ensure index doesn't go below 0
    const endIndex = Math.min(dates.length - 1, enteredDateIndex + 7); // Ensure index doesn't exceed array length

    // Return the slice of dates
    return dates.slice(startIndex, endIndex + 1);
};

// Setup Server
const port = 3000;
const listening = () => {
    console.log(`running on localhost: ${port}`);
};
const server = app.listen(port, listening);

module.exports = app;