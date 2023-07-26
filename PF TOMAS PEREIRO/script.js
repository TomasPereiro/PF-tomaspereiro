const urlLocal = 'db.json'
let arrayDeProductos = []

fetch(urlLocal)
    .then(response => response.json())
    .then(data => {
        arrayDeProductos = data.arrayDeProductos
        crearTarjetas(arrayDeProductos, contenedor, true)
    })
    .catch(error => {
        Swal.fire({
            title: 'Error!',
            text: 'Error al cargar los datos',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    })


let carrito = []
let carritoJSON = JSON.parse(localStorage.getItem("carrito"))

if (carritoJSON) {
    carrito = carritoJSON
}

let contenedor = document.getElementById("productos")
let contenedorCarrito = document.getElementById("carrito")


//crearTarjetas(arrayDeProductos, contenedor)
function crearTarjetas(arrayDeProductos, contenedor, condicion) {
    contenedor.innerHTML = " "
    arrayDeProductos.forEach(elemento => {
        let producto = document.createElement("div")
        producto.className = condicion ? "tarjetaProducto": "tarjetaProductoEnCarrito"
        producto.innerHTML = `
        <h1>${elemento.nombre}</h1>
        <h3>$${elemento.precio}</h3>
        <h3> ${elemento.cantidad === undefined ? "" : "cantidad: " + elemento.cantidad}</h3>
        <img class= "img"  src="${elemento.img}">
        <button class="boton" id = "${elemento.id}">${condicion ? "Agregar al carrito" : "Eliminar producto"} </button>
        `
        contenedor.appendChild(producto)
        let botonAgregarAlCarrito = document.getElementById(elemento.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => {
            if (condicion) {
                addToCart(e)
            }
            else {
                quitar(e)

            }
        })
    })


}
function addToCart(e) {
    let productoAgregado = arrayDeProductos.find(elemento => elemento.id === Number(e.target.id))
    const prodAlCarrito = {
        id: productoAgregado.id,
        nombre: productoAgregado.nombre,
        precio: productoAgregado.precio,
        cantidad: 1,
        img: productoAgregado.img
    }
    const existe = carrito.some(elemento => elemento.id === prodAlCarrito.id)
    if (existe) {
        const indice = carrito.findIndex(p => p.id === prodAlCarrito.id)
        carrito[indice].cantidad++
    }
    else {
        carrito.push(prodAlCarrito)
    }
    // renderizarCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
    Toastify({
        text: "Producto agregado",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        close: true

    }).showToast();
}

function quitar(e) {
    let productoQuitado = carrito.find(elemento => elemento.id === Number(e.target.id))

    const prodAlCarrito = {
        id: productoQuitado.id,
        nombre: productoQuitado.nombre,
        precio: productoQuitado.precio,
        cantidad: productoQuitado.cantidad
    }
    const existe = carrito.some(elemento => elemento.id === prodAlCarrito.id)
    if (existe) {
        const index = carrito.findIndex((obj) => obj.id === productoQuitado.id)
        carrito.splice(index, 1)

    }
    renderizarCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
    Toastify({
        text: "Producto eliminado",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        close: true

    }).showToast();


}

function renderizarCarrito() {
    let mostrarCarrito = document.getElementById("carrito")
    mostrarCarrito.innerHTML = ''
    carrito.forEach(elemento => {
        mostrarCarrito.innerHTML += `<p>${elemento.nombre} ${elemento.precio} ${elemento.cantidad} </p>`
    })
    crearTarjetas(carrito, contenedorCarrito, false)
    //document.getElementById("carrito").style.display = "none"
}

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", filtroBuscador)

function filtroBuscador(e) {
    let arrayBuscador = arrayDeProductos.filter(producto => producto.nombre.includes(e.target.value) || producto.categoria.includes(e.target.value))
    crearTarjetas(arrayBuscador, contenedor, true)
}

function visibilizarTarjetas(flag) {
    contenedor.style.display = flag ? "inline" : "none"
}
function visibilizarCarrito(flag) {
    contenedorCarrito.style.display = flag ? "inline" : "none"
}

let botonTodos = document.getElementById("todos")
botonTodos.addEventListener("click", mostrarTodos)
function mostrarTodos(e) {
    crearTarjetas(arrayDeProductos, contenedor, true)
    visibilizarTarjetas(true)
    visibilizarCarrito(false)
}




let botonRopa = document.getElementById("ropa")
botonRopa.addEventListener("click", () => {
    filtrarPorCategoria("ropa")

})


let botonAccesorios = document.getElementById("accesorios")
botonAccesorios.addEventListener("click", () => {
    filtrarPorCategoria("accesorios")

})

let botonJoyeria = document.getElementById("joyeria")
botonJoyeria.addEventListener("click", () => {
    filtrarPorCategoria("joyeria")
})

function filtrarPorCategoria(categoria) {
    let arrayFiltrado = arrayDeProductos.filter(producto => producto.categoria === categoria)
    crearTarjetas(arrayFiltrado, contenedor)
    visibilizarTarjetas(true)
    visibilizarCarrito(false)
}







let botonVaciarCarrito = document.getElementById("vaciarCarrito")
botonVaciarCarrito.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito()
    Toastify({
        text: "Vaciaste el carrito",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}


let mostrar = false
let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", mostrarCarrito)

function mostrarCarrito() {
    if (carrito.length !== 0) {
        renderizarCarrito()



        visibilizarCarrito(true)
        visibilizarTarjetas(false)
    }
    else {
        Toastify({
            text: "El carrito esta vacio",
            className: "info",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();

    }


}

