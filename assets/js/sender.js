// Met en variables les éléments du formulaire
let title = document.querySelector('#title');
let dater = document.querySelector('#date');
let description = document.querySelector('#description');
let categories = document.querySelector('#selector');
let localisation = document.querySelector('#location');
let city_zip = document.querySelector('#city_zip');
let files = document.getElementById('files');
let button = document.querySelector('#send');

// Ajoute un événement au clic sur le bouton
button.addEventListener("click", function() {
    alert('click');
    // Récupère les valeurs des champs du formulaire
    let titleValue = title.value;
    let dateValue = dater.value;
    let descriptionValue = description.value;
    let categoriesValue = Array.from(categories.selectedOptions).map(option => option.value);
    let locationValue = localisation.value;
    let city_zipValue = city_zip.value;
    let filesValue = files.files;  // Récupère les fichiers

    // Vérifie si les champs sont vides
    if (titleValue === '' || dateValue === '' || descriptionValue === '' || categoriesValue.length === 0 || locationValue === '' || city_zipValue === '') {
        alert('Veuillez remplir tous les champs du formulaire');
        return;
    }

    // Crée un objet FormData pour envoyer les données
    let formData = new FormData();
    formData.append('title', titleValue);
    formData.append('date', dateValue);
    formData.append('description', descriptionValue);
    formData.append('categories', categoriesValue.join(','));
    formData.append('location', locationValue);
    formData.append('city_zip', city_zipValue);

    // Ajoute les fichiers au FormData (pour chaque fichier)
    for (let i = 0; i < filesValue.length; i++) {
        formData.append('files[]', filesValue[i]);
    }

    // Effectue une requête POST à l'API
    fetch(`${server}?token=${token}&key=${key}&api=add&action=post`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Vérifie si la requête est réussie
        console.log(data);
        if (data.out) {
            alert('Signalement envoyé avec succès');
        } else {
            alert('Erreur lors de l\'envoi du signalement');
        }
    })
    .catch(error => {
        console.error('Erreur de requête:', error);
    });
});