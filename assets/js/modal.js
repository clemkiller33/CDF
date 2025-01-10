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

function hideModal() {
    let modal = document.querySelector('.modal');
    modalStatus = false;
    modal.style.display = 'none';
}