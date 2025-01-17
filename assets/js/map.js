// Initialiser la carte
var map = L.map('map').setView([48.8566, 2.3522], 5); // Coordonnées de Paris

// Ajouter une couche de tuiles (tiles layer)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a href="https://www.mael-cv.xyz">Mael Chebbi Vigneau</a>',
}).addTo(map);

// Fonction pour ajouter des marqueurs à partir d'un GeoJSON
function addMarkersFromGeoJSON(geojsonData) {
    L.geoJSON(geojsonData, {
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.popupContent) {
        const popupContent = `<h4>Département:${feature.properties.name}</h4><br>${feature.properties.popupContent}`;
        layer.bindPopup(popupContent);
    }
        }
    }).addTo(map);
}

// Pour charger des données GeoJSON depuis un fichier externe via un proxy
fetch(`${server}?token=${token}&key=${key}&api=stats&action=geojson`)
    .then(response => response.json())
    .then(data => {
        console.log('GeoJSON chargé avec succès:', data);
        addMarkersFromGeoJSON(data);
    })
    .catch(error => console.error('Erreur lors du chargement du GeoJSON:', error));