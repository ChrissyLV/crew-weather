document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([20, 0], 2);  

                                                                                 // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
