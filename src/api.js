const API_KEY ="5d240e73bdeaa7d6c94bdcd0543d36ec";

export const fetchDataFromApi = (latitude, longitude, city) => {
    let url;
    if (city) {
        // If city is provided, use it in the API call
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    } else if (latitude && longitude) {
        // If latitude and longitude are provided, use them in the API call
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    } else {
        // If neither city nor latitude/longitude is provided, return a rejected Promise
        return Promise.reject("No location information provided");
    }

    // Fetch data from the API
    return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch weather data");
            }
            return res.json();
            console.log('json',res.json())
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
};

