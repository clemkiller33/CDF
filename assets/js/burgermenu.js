const menuBurger = document.querySelector('#menuBurger');
const menuItems = document.querySelectorAll('.item_mobil');
let menuIsOpen = true;

function bgmenu() {    
    console.log(menuIsOpen);
    if (menuIsOpen === true) {
        menuBurger.classList.add('active');
        
        menuItems.forEach(item => {
            if(item.querySelector('#menuBurger')) return;
            item.style.display = 'flex';
        });

    } else {
        menuBurger.classList.remove('active');

        menuItems.forEach(item => {
            if(item.querySelector('#menuBurger')) return;
            item.style.display = 'none';
        });
    }
    menuIsOpen = !menuIsOpen; 
}
