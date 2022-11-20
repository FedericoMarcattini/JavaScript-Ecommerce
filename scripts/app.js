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

/*** PRODUCTOS ***/

const cardsTienda = document.querySelector("#cards-tienda");
const categorias = document.querySelectorAll(".categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    cardsTienda.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("card-tienda");
        div.innerHTML = `
        <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="card-info">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <div class="producto-botones">
                <div class="producto-cantidad">
                    <span class="menos">-</span>
                    <span class="numero">01</span>
                    <span class="mas">+</span>
                </div>
                <button class="producto-agregar" id="${producto.id}" >Agregar</button>
            </div>
        `;

        cardsTienda.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

categorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        categorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);    
        } else {
            cargarProductos(productos);
        }
        
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosEnCarrito = [];

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

/*** CARRITO ***/

productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
console.log(productosEnCarrito);

// const contenedorCarritoVacio = document.querySelector("#carrito-productos");
// const contenedorCarritoProductos = document.querySelector("#carrito-productos");
// const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
// const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

//     if (productosEnCarrito) {

//         contenedorCarritoVacio.classList.add("disabled");
//         contenedorCarritoProductos.classList.remove("disabled");
//         contenedorCarritoAcciones.classList.remove("disabled");
//         contenedorCarritoVacio.classList.add("disabled");
        
//         contenedorCarritoProductos.innerHTML = "";

//         productosEnCarrito.forEach(producto => {

//             const div = document.createElement("div");
//             div.classList.add("carrito-producto");
//             div.innerHTML = `
//                 <img class="carrito-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
//                 <div class="carrito-producto-titulo">
//                     <small>Título</small>
//                     <h3>${producto.titulo}</h3>
//                 </div>
//                 <div class="carrito-producto-cantidad">
//                     <small>Cantidad</small>
//                     <p>${producto.cantidad}</p>
//                 </div>
//                 <div class="carrito-producto-precio">
//                     <small>Precio</small>
//                     <p>$${producto.precio}</p>
//                 </div>
//                 <div class="carrito-producto-subtotal">
//                     <small>Subtotal</small>
//                     <p>$${producto.precio * producto.cantidad}</p>
//                 </div>
//                 <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
//             `;

//             contenedorCarritoProductos.append(div);

//         })

//     } else {

//     } 