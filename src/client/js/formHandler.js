const handleSubmit = async (event) => {
    event.preventDefault()

    const serverUrl = `http://localhost:3000`;
    const location = document.getElementById('location').value;
    const departureDate = document.getElementById('date').value;

    if (!!location) {
        if (!!Client.checkDateValidation(departureDate)) {
            if (!!Client.checkDateRange(departureDate)) {
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

const prepareDataToView = ({ location, tripDateWeatherData, locationImages }) => {
    prepareLocationWeatherDetails({ location, tripDateWeatherData });
    prepareLocationImages(locationImages);
}

const prepareLocationWeatherDetails = ({ location, tripDateWeatherData }) => {
    if (tripDateWeatherData) {
        document.querySelector('.weather-data').classList.remove('hidden');
    }

    document.getElementById('city-name').innerHTML = `${location}`;
    document.getElementById('date').innerHTML = `Date: ${tripDateWeatherData?.datetime}`;
    document.getElementById("high-temp").innerHTML = `Highest Temperature: ${tripDateWeatherData?.high_temp} celsius`;
    document.getElementById("low-temp").innerHTML = `Lowest Temperature: ${tripDateWeatherData?.low_temp} celsius`;
    document.getElementById("temp").innerHTML = `Temperature: ${tripDateWeatherData?.temp} celsius`;
    document.getElementById("description").innerHTML = `Weather description: ${tripDateWeatherData?.weather?.description} `;
    document.getElementById("wind-dir").innerHTML = `Wind Direction: ${tripDateWeatherData?.wind_cdir_full}`;
}

const prepareLocationImages = (locationImages) => {
    if (locationImages) {
        document.querySelector('.location-images').classList.remove('hidden');
    }

    const galleryElement = document.getElementById('gallery');

    locationImages?.hits?.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        item.innerHTML = `
                <a href="${image.pageURL}" target="_blank">
                    <img src="${image.previewURL}" alt="${image.tags}">
                </a>
                <p><strong>Tags:</strong> ${image.tags}</p>
                <p><strong>Author:</strong> ${image.user}</p>
                <a href="${image.pageURL}" target="_blank">View Image</a>
            `;

        galleryElement.appendChild(item);
    });
}

export { handleSubmit }
