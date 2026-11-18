
// ===================================
// BURGER HOUSE - FUNCIONES GENERALES
// ===================================

// OBTENER PRODUCTOS DESDE JSON


async function cargarProductos() {

    try {

        const respuesta = await fetch("./data/productos.json", {
            cache: "no-store"
        });

        if (!respuesta.ok) {
            throw new Error(
                "Error HTTP: " + respuesta.status +
                " - No se encontró productos.json"
            );
        }

        const productos = await respuesta.json();

        if (!Array.isArray(productos)) {
            throw new Error(
                "El archivo JSON no contiene una lista de productos."
            );
        }

        console.log("Productos cargados correctamente:", productos.length);

        return productos;

    } catch (error) {

        console.error("ERROR AL CARGAR PRODUCTOS:", error);

        throw error;

    }
}


// OBTENER CARRITO

function obtenerCarrito() {

    return JSON.parse(
        localStorage.getItem("burgerCart") || "[]"
    );
}

// GUARDAR CARRITO

function guardarCarrito(carrito) {

    localStorage.setItem(
        "burgerCart",
        JSON.stringify(carrito)
    );

    actualizarContador();
}

// ACTUALIZAR CONTADOR DEL MENÚ

function actualizarContador() {

    const contador = document.getElementById("cart-count");

    if (contador) {

        const carrito = obtenerCarrito();

        let cantidad = 0;

        carrito.forEach(producto => {
            cantidad += producto.cantidad;
        });

        contador.textContent = cantidad;
    }
}

// AGREGAR PRODUCTO

async function agregarAlCarrito(id) {

    try {

        const productos = await cargarProductos();

        const producto = productos.find(p => p.id === id);

        if (!producto || producto.stock === 0) {
            alert("Este producto está agotado.");
            return;
        }

        const carrito = obtenerCarrito();

        const encontrado = carrito.find(p => p.id === id);

        if (encontrado) {

            if (encontrado.cantidad >= producto.stock) {
                alert("No hay más unidades disponibles.");
                return;
            }

            encontrado.cantidad++;

        } else {

            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1,
                stock: producto.stock
            });

        }

        guardarCarrito(carrito);

        alert("Producto agregado correctamente.");

    } catch (error) {

        console.error(error);
        alert("Ocurrió un error al agregar el producto.");

    }
}

// ACTUALIZAR CONTADOR AL ABRIR LA PÁGINA

document.addEventListener("DOMContentLoaded", () => {

    actualizarContador();

});
