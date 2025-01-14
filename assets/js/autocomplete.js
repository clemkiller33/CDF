const input = document.getElementById('city_zip');
const autocompleteList = document.getElementById('autocomplete-list');

input.addEventListener('input', function() {
    const query = input.value.trim();
    
    if (query.length < 2) {
        autocompleteList.innerHTML = ''; // Effacer la liste si la saisie est inférieure à 2 caractères
        return;
    }

    // Faire une requête à l'API Geonames (ou autre source)
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&type=municipality&limit=5`)
        .then(response => response.json())
        .then(data => {
            autocompleteList.innerHTML = ''; // Vider la liste avant de la remplir

            // Vérifier si des résultats sont trouvés
            if (data.features) {
                data.features.forEach(item => {
                    const city = item.properties.city;
                    const postcode = item.properties.postcode;
                    const displayValue = `${city} (${postcode})`;

                    // Créer un élément de liste d'autocomplétion
                    const option = document.createElement('div');
                    option.textContent = displayValue;
                    option.dataset.value = displayValue;
                    
                    // Ajouter un événement au clic sur une option
                    option.addEventListener('click', function() {
                        input.value = option.dataset.value;
                        autocompleteList.innerHTML = ''; // Vider la liste après sélection
                    });

                    autocompleteList.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
});

// Fermer la liste d'autocomplétion si l'utilisateur clique à l'extérieur
document.addEventListener('click', function(event) {
    if (!autocompleteList.contains(event.target) && event.target !== input) {
        autocompleteList.innerHTML = ''; // Fermer la liste
        
    }
});