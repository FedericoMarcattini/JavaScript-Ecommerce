/*** MODAL ***/

const abrirModal = document.querySelector('.header-carrito');
const modal = document.querySelector('.modal');
const cerrarModal = document.querySelector('.modal-cerrar');

abrirModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('modal--mostrar');
});

cerrarModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--mostrar');
});

modal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--mostrar');
});