import { checkDateValidation } from './dateValidation';
import { checkDateRange, dataFormat } from './dateRangeValidation';

const handleSubmit = async (event) => {
    event.preventDefault()

    const serverUrl = `http://localhost:3000`;
    const location = document.getElementById('location').value;
    const inputDate = document.getElementById('date').value;
    const departureDate = inputDate ? dataFormat(inputDate) : "";

    if (!!location) {
        if (!!checkDateValidation(inputDate)) {
            if (!!checkDateRange(inputDate)) {
            console.log("::: Form Submitted :::");
            const response = await postData(`${serverUrl}/travel`, { location, departureDate });

            prepareDataToView(response);
            } else {
                alert('Please enter a date within max 16 days range from now');
            }
        } else {
            alert('Please enter a valid date');
        }
    } else {
        alert('Please location to visit');
    }
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();

        return newData;
    } catch (error) {
        throw error;
    }
}

const prepareDataToView = ({ location, availableDatesWeather, locationImages }) => {
    prepareLocationWeatherDetails({ location, availableDatesWeather });
    prepareLocationImages(locationImages);
}

const prepareLocationWeatherDetails = ({ location, availableDatesWeather }) => {
    if (availableDatesWeather?.length) {
        document.querySelector('.weather-data').classList.remove('hidden');
    }
    
    const inputDate = document.getElementById('date').value;
    const weatherDataElement = document.getElementById('day-weather-details');
    weatherDataElement.innerHTML = '';

    document.getElementById('city-name').innerHTML = `${location}`;

    availableDatesWeather.forEach((dayWeather) => {
        const weatherCard = document.createElement('div');
        const isTripDate = dataFormat(inputDate) === dayWeather.datetime;

        weatherCard.classList.add('weather-card');

        weatherCard.innerHTML = `
            <div class="weather-details">
                <p><b>${isTripDate ? 'Trip Date' : 'Date'}:</b> ${dayWeather.datetime || 'N/A'}</p>
                <p><b>Highest Temperature:</b> ${dayWeather?.high_temp || 'N/A'} Celsius</p>
                <p><b>Lowest Temperature:</b> ${dayWeather?.low_temp || 'N/A'} Celsius</p>
                <p><b>Temperature:</b> ${dayWeather?.temp || 'N/A'} Celsius</p>
                <p><b>Weather description:</b> ${dayWeather?.weather?.description || 'N/A'}</p>
                <p><b>Wind Direction:</b> ${dayWeather?.wind_cdir_full || 'N/A'}</p>
            </div>
        `;

        if (isTripDate) {
            weatherCard.style.backgroundColor = '#0093db';
        }

        weatherDataElement.appendChild(weatherCard);
    });
}

const prepareLocationImages = (locationImages) => {
    if (locationImages) {
        document.querySelector('.location-images').classList.remove('hidden');
    }

    const galleryElement = document.getElementById('gallery');
    galleryElement.innerHTML = '';

    locationImages?.hits?.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        item.innerHTML = `
                <a href="${image.pageURL}" target="_blank">
                    <img src="${image.previewURL}" alt="${image.tags}">
                </a>
                <p><b>Tags:</b> ${image.tags}</p>
                <p><b>Author:</b> ${image.user}</p>
                <a href="${image.pageURL}" target="_blank">View Image</a>
            `;

        galleryElement.appendChild(item);
    });
}

export { handleSubmit }