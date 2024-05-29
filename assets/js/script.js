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

    