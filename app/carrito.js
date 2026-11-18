
// ===================================
// BURGER HOUSE - CARRITO
// ===================================

document.addEventListener("DOMContentLoaded", () => {

    mostrarCarrito();

    const botonVaciar = document.getElementById("clear-cart");

    if (botonVaciar) {

        botonVaciar.addEventListener("click", () => {

            guardarCarrito([]);

            mostrarCarrito();

        });

    }

});

// MOSTRAR PRODUCTOS DEL CARRITO

function mostrarCarrito() {

    const contenedor =
        document.getElementById("cart-container");

    if (!contenedor) return;

    const carrito = obtenerCarrito();

    const total = document.getElementById("cart-total");

    // COMPROBAR SI ESTÁ VACÍO

    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div class="empty">

                <h2>Tu carrito está vacío 🛒</h2>

                <p>Agrega tus hamburguesas favoritas.</p>

                <a href="productos.html" class="btn">
                    Ver productos
                </a>

            </div>

        `;

        total.textContent = "";

        return;

    }

    // MOSTRAR PRODUCTOS

    contenedor.innerHTML = carrito.map(p => `

        <div class="cart-row">

            <div>

                <strong>${p.nombre}</strong>

                <p>Bs ${p.precio.toFixed(2)}</p>

            </div>

            <div class="qty">

                <button onclick="cambiarCantidad(${p.id}, -1)">
                    -
                </button>

                <b>${p.cantidad}</b>

                <button onclick="cambiarCantidad(${p.id}, 1)">
                    +
                </button>

            </div>

            <strong>
                Bs ${(p.precio * p.cantidad).toFixed(2)}
            </strong>

            <button
                class="remove"
                onclick="quitarProducto(${p.id})"
            >
                X
            </button>

        </div>

    `).join("");

    // CALCULAR TOTAL

    const suma = carrito.reduce(
        (acumulado, p) => acumulado + p.precio * p.cantidad,
        0
    );

    total.textContent = "TOTAL: Bs " + suma.toFixed(2);

}

// AUMENTAR O DISMINUIR CANTIDAD

function cambiarCantidad(id, cambio) {

    const carrito = obtenerCarrito();

    const producto = carrito.find(p => p.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad > producto.stock) {

        producto.cantidad = producto.stock;

        alert("No hay más unidades disponibles.");

    }

    if (producto.cantidad <= 0) {

        quitarProducto(id);

        return;

    }

    guardarCarrito(carrito);

    mostrarCarrito();

}

// ELIMINAR PRODUCTO

function quitarProducto(id) {

    let carrito = obtenerCarrito();

    carrito = carrito.filter(p => p.id !== id);

    guardarCarrito(carrito);

    mostrarCarrito();

}
