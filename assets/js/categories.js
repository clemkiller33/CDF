// Effectuer la requête HTTP GET pour récupérer le JSON
fetch(`${server}?token=${token}&key=${key}&api=add&action=categorie`)
.then(response => response.json())
.then(data => {
    console.log(data);
    // Vérifier si la requête est réussie
    if (data.out) {
        const select = document.getElementById('selector');
        const categories = data.data;

        // Parcourir les catégories et ajouter chaque option au select
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.value;
            option.textContent = category.label;
            select.appendChild(option);
        });
    } else {
        console.error('Erreur dans les données retournées');
    }
})
.catch(error => {
    console.error('Erreur de requête:', error);
});