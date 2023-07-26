const urlLocal = 'db.json'
let arrayDeProductos = []

fetch(urlLocal)
    .then(response => response.json())
    .then(data => {
        arrayDeProductos = data.arrayDeProductos
        crearTarjetas(arrayDeProductos, contenedor)
    })
    .catch(error => alert("error al abrir la app"))


let carrito = []
let carritoJSON = JSON.parse(localStorage.getItem("carrito"))

if (carritoJSON) {
    carrito = carritoJSON
}

let contenedor = document.getElementById("productos")


//crearTarjetas(arrayDeProductos, contenedor)
function crearTarjetas(arrayDeProductos, contenedor) {
    contenedor.innerHTML = " "
    arrayDeProductos.forEach(elemento => {
        let producto = document.createElement("div")
        producto.className = "tarjetaProducto"
        producto.innerHTML = `
        <h4>${elemento.nombre}</h4>
        <h4>${elemento.precio}</h4>
        <button id = "${elemento.id}">Agregar al carrito</button>
        `
        contenedor.appendChild(producto)
        let botonAgregarAlCarrito = document.getElementById(elemento.id)
        botonAgregarAlCarrito.addEventListener("click", addToCart)

    })


}
function addToCart(e) {
    let productoAgregado = arrayDeProductos.find(elemento => elemento.id === Number(e.target.id))

    const prodAlCarrito = {
        id: productoAgregado.id,
        nombre: productoAgregado.nombre,
        precio: productoAgregado.precio,
        cantidad: 1
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
    console.log(carrito)
}


function renderizarCarrito() {
    let mostrarCarrito = document.getElementById("carrito")
    mostrarCarrito.innerHTML = ''
    carrito.forEach(elemento => {
        mostrarCarrito.innerHTML += `<p>${elemento.nombre} ${elemento.precio} ${elemento.cantidad}</p>`
    })
    //document.getElementById("carrito").style.display = "none"
}

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", filtroBuscador)

function filtroBuscador(e) {
    let arrayBuscador = arrayDeProductos.filter(producto => producto.nombre.includes(e.target.value) || producto.categoria.includes(e.target.value))
    crearTarjetas(arrayBuscador, contenedor)
}



let botonTodos = document.getElementById("todos")
botonTodos.addEventListener("click", mostrarTodos)
function mostrarTodos(e) {
    crearTarjetas(arrayDeProductos, contenedor)
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
}







let botonVaciarCarrito = document.getElementById("vaciarCarrito")
botonVaciarCarrito.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    carrito = []
    renderizarCarrito()
    console.log(carrito)
}


let mostrar = false
let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", mostrarCarrito)

function mostrarCarrito() {
    renderizarCarrito()
  mostrar = !mostrar;

    document.getElementById("carrito").style.display = mostrar ? "inline" : "none";


}

