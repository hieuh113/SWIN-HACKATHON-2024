let weatherData; // Variable to store weather data
let currentDate; // Variable to store the current date

// Function to fetch Weather Data
async function fetchWeather() {
    const apiKey = '86623d8dfc4d4372542ad13a0dfd0189'; // Replace with your actual API key
    const city = 'Ha Noi'; // Change this to your desired city
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Store the fetched weather data in a variable
        weatherData = data.main.temp; // Store the temperature in Celsius
        // Display the fetched temperature
        document.getElementById('weather-temp').innerText = `${weatherData}°C`;
    } catch (error) {
        document.getElementById('weather-temp').innerText = 'Error fetching weather';
    }
}

// Function to update the current date
function updateDate() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    currentDate = now.toLocaleDateString('en-US', options);
    document.getElementById('current-date-time').innerText = currentDate;
}

// Function to refresh both weather and date every 10 seconds
function updateWeatherAndDate() {
    if (weatherData) {
        // Update the weather display using the cached data
        document.getElementById('weather-temp').innerText = `${weatherData}°C`;
    }
    updateDate(); // Update the date display
}

// Initial fetch and setup
fetchWeather(); // Fetch weather data on initial load
updateDate(); // Set the initial date

// Call to refresh both every 10 seconds
setInterval(updateWeatherAndDate, 10000);
