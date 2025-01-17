let modalStatus = false;

function showModal(title, content, button=false) {
    // button = {text: 'text', action: 'action'}
    let modal = document.querySelector('.modal');
    
    let modalTitle = document.querySelector('.modal_title_utils');
    let modalContent = document.querySelector('.modal_content_utils');

    modalTitle.textContent = title;
    modalContent.textContent = content;
    
    if (button) {
        let modalButton = document.querySelector('.modal_button_utils');
        modalButton.textContent = button.text;
        modalButton.onclick = button.action;
    }

    modalStatus = true;
    modal.style.display = 'flex';
    
}

function showFileModal() {
    // button = {text: 'text', action: 'action'}
    let modal = document.querySelector('.modal');

    modalStatus = true;
    modal.style.display = 'flex';
    
}

function showStatsModal(title, labels, counts) {
    // button = {text: 'text', action: 'action'}
    let modal = document.querySelector('.modal');
    
    let modalTitle = document.querySelector('.modal_title_utils');
    document.querySelector('.table_title').textContent = title;
    modalTitle.textContent = title;

    const tbody = document.querySelector('tbody');
    const maxItems = Math.min(labels.length, 10);
    tbody.innerHTML = '';

    for (let i = 0; i < maxItems; i++) {
        const tr = document.createElement('tr');

        // Créer et ajouter les td
        const tdLabel = document.createElement('td');
        tdLabel.textContent = labels[i];
        tr.appendChild(tdLabel);

        const tdCount = document.createElement('td');
        tdCount.textContent = counts[i];
        tr.appendChild(tdCount);

        const tdIndex = document.createElement('td');
        tdIndex.textContent = "#" + (i + 1);
        tr.appendChild(tdIndex);

        // Ajouter le tr au tbody
        tbody.appendChild(tr);
    }

    

    modalStatus = true;
    modal.style.display = 'flex';
    
}

function hideModal() {
    let modal = document.querySelector('.modal');
    modalStatus = false;
    modal.style.display = 'none';
}


