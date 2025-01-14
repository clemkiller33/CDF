document.getElementById('selector').addEventListener('change', function() {
    const selectedOptions = Array.from(this.selectedOptions).map(option => option.text);
    const disabledOption = this.querySelector('option[disabled]');
    if (selectedOptions.length > 0) {
        disabledOption.textContent = "Catégorie(s) : " + selectedOptions.join(', ');
    } else {
        disabledOption.textContent = 'Selectionnez une ou plusieurs catégories';
    }
});