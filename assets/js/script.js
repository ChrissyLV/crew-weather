document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([20, 0], 2);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let unit = localStorage.getItem('unit') || 'metric';
    let windUnit = localStorage.getItem('windUnit') || 'metric';
    let language = localStorage.getItem('language') || 'en';

    // Open language modal on button click
    document.getElementById('languageButton').addEventListener('click', () => {
        $('#languageModal').modal('show');
    });

    // Save language selection
    document.querySelectorAll('#languageModal .language-option').forEach(item => {
        item.addEventListener('click', (event) => {
            language = event.target.getAttribute('data-lang');
            localStorage.setItem('language', language);
            $('#languageModal').modal('hide');
        });
    });

    document.getElementById('settingsButton').addEventListener('click', () => {
        document.getElementById('unitSelect').value = unit;
        document.getElementById('windUnitSelect').value = windUnit;
        $('#settingsModal').modal('show');
    });

    document.getElementById('saveSettings').addEventListener('click', () => {
        unit = document.getElementById('unitSelect').value;
        windUnit = document.getElementById('windUnitSelect').value;
        localStorage.setItem('unit', unit);
        localStorage.setItem('windUnit', windUnit);
        $('#settingsModal').modal('hide');
    });

    document.getElementById('getWeather').addEventListener('click', function () {
        const city = document.getElementById('city').value;
        const apiKey = 'c0091532d2936a2f6779048bf50526f0';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}&lang=${language}`;

        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.style.display = 'none';
        weatherInfo.classList.remove('alert-success', 'alert-danger');
        weatherInfo.classList.add('alert-info');
        weatherInfo.textContent = 'Loading...';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const lat = data.coord.lat;
                    const lon = data.coord.lon;
                    map.setView([lat, lon], 10);

                    const marker = L.marker([lat, lon]).addTo(map);
                    const windSpeed = windUnit === 'metric' ? data.wind.speed : (data.wind.speed * 2.237).toFixed(2);
                    const windUnitLabel = windUnit === 'metric' ? 'm/s' : 'mph';
                    marker.bindPopup(`
                    <b>${data.name}</b><br>
                    Temperature: ${data.main.temp}°${unit === 'metric' ? 'C' : 'F'}<br>
                    Weather: ${data.weather[0].description}<br>
                    Humidity: ${data.main.humidity}%<br>
                    Wind Speed: ${windSpeed} ${windUnitLabel}
                `).openPopup();

                    weatherInfo.style.display = 'block';
                    weatherInfo.classList.remove('alert-info', 'alert-danger');
                    weatherInfo.classList.add('alert-success');
                    weatherInfo.innerHTML = `
                    <strong>${data.name}</strong><br>
                    Temperature: ${data.main.temp}°${unit === 'metric' ? 'C' : 'F'}<br>
                    Weather: ${data.weather[0].description}<br>
                    Humidity: ${data.main.humidity}%<br>
                    Wind Speed: ${windSpeed} ${windUnitLabel}
                `;
                } else {
                    weatherInfo.style.display = 'block';
                    weatherInfo.classList.remove('alert-info', 'alert-success');
                    weatherInfo.classList.add('alert-danger');
                    weatherInfo.textContent = 'City not found. Please try again.';
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.style.display = 'block';
                weatherInfo.classList.remove('alert-info', 'alert-success');
                weatherInfo.classList.add('alert-danger');
                weatherInfo.textContent = 'Error fetching weather data. Please try again later.';
            });
    });

    const closeButton = document.querySelector('[data-dismiss="modal"]');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    function closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.classList.contains('show')) {
                modal.classList.remove('show');
                modal.setAttribute('aria-hidden', 'true');
                modal.setAttribute('style', 'display: none');
            }
        });
    }

    closeButton.addEventListener('click', () => {
        closeModal();
    });

    yesButton.addEventListener('click', () => {
        console.log('User clicked Yes');
        closeModal();
    });

    noButton.addEventListener('click', () => {
        console.log('User clicked No');
        closeModal();
    });

                                        // Most Searched button functionality
     document.getElementById('mostSearchedButton').addEventListener('click', () => {
        $('#mostSearchedModal').modal('show');
    });

                                    // Click event for most searched locations
    document.querySelectorAll('.searched-location').forEach(item => {
        item.addEventListener('click', (event) => {
            const city = event.target.textContent;
            document.getElementById('city').value = city;
            document.getElementById('getWeather').click();
            $('#mostSearchedModal').modal('hide');
        });
    });



