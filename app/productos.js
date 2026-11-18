
// ===================================
// BURGER HOUSE - PRODUCTOS
// ===================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        const productos = await cargarProductos();

        // PRODUCTOS DESTACADOS EN INICIO

        const destacados = document.getElementById("featured-products");

        if (destacados) {

            const lista = productos
                .filter(p => p.stock > 0)
                .slice(0, 3);

            destacados.innerHTML = lista.map(tarjeta).join("");
        }

        // CATÁLOGO COMPLETO

        const contenedor = document.getElementById("products-container");

        if (!contenedor) return;

        const buscar = document.getElementById("search-product");
        const categoria = document.getElementById("category-filter");
        const ordenar = document.getElementById("sort-price");
        const stock = document.getElementById("stock-filter");

        // CARGAR CATEGORÍAS AUTOMÁTICAMENTE

        const categorias = [...new Set(
            productos.map(p => p.categoria)
        )];

        categorias.forEach(c => {

            categoria.innerHTML += `
                <option value="${c}">${c}</option>
            `;

        });

        // FUNCIÓN PARA MOSTRAR Y FILTRAR

        function mostrarProductos() {

            let lista = [...productos];

            // BÚSQUEDA

            const texto = buscar.value.toLowerCase();

            lista = lista.filter(p =>
                p.nombre.toLowerCase().includes(texto)
            );

            // FILTRO POR CATEGORÍA

            if (categoria.value !== "Todos") {

                lista = lista.filter(p =>
                    p.categoria === categoria.value
                );

            }

            // FILTRO DE STOCK

            if (stock.value === "disponible") {

                lista = lista.filter(p => p.stock > 0);

            }

            if (stock.value === "agotado") {

                lista = lista.filter(p => p.stock === 0);

            }

            // ORDENAR PRECIOS

            if (ordenar.value === "asc") {

                lista.sort((a, b) => a.precio - b.precio);

            }

            if (ordenar.value === "desc") {

                lista.sort((a, b) => b.precio - a.precio);

            }

            // MOSTRAR RESULTADOS

            contenedor.innerHTML = lista.length > 0
                ? lista.map(tarjeta).join("")
                : "<p>No se encontraron productos.</p>";

            document.getElementById("result-count").textContent =
                "Productos encontrados: " + lista.length;

        }

        buscar.addEventListener("input", mostrarProductos);
        categoria.addEventListener("change", mostrarProductos);
        ordenar.addEventListener("change", mostrarProductos);
        stock.addEventListener("change", mostrarProductos);

        mostrarProductos();

    } catch (error) {

        console.error(error);

        const contenedor =
            document.getElementById("products-container") ||
            document.getElementById("featured-products");

        if (contenedor) {
            contenedor.innerHTML =
                "<p>Error al cargar los productos. Comprueba Live Server.</p>";
        }

    }

});

// ===================================
// CREAR TARJETA DE CADA PRODUCTO
// ===================================

function tarjeta(p) {

    let estado = "Disponible: " + p.stock;
    let clase = "";

    if (p.stock === 0) {

        estado = "Agotado";
        clase = "out";

    } else if (p.stock <= 5) {

        estado = "Stock bajo: " + p.stock;
        clase = "low";

    }

    return `

        <article class="product-card">

            <img
                src="${p.imagen}"
                alt="${p.nombre}"
                onerror="this.src='https://placehold.co/700x450?text=Burger+House'"
            >

            <div class="product-info">

                <small>${p.categoria}</small>

                <h3>${p.nombre}</h3>

                <p>${p.descripcion}</p>

                <div class="product-meta">

                    <span class="price">
                        Bs ${p.precio.toFixed(2)}
                    </span>

                    <span class="stock ${clase}">
                        ${estado}
                    </span>

                </div>

                
<button
    class="btn"
    onclick="mostrarDetalle(${p.id})"
>
    Ver detalles
</button>

<button
    class="btn"
    onclick="agregarAlCarrito(${p.id})"
    ${p.stock === 0 ? "disabled" : ""}
>
    Agregar al carrito 🛒
</button>


            </div>

        </article>

    `;

}

// ===================================
// MOSTRAR DETALLES DEL PRODUCTO
// ===================================

function mostrarDetalle(id) {

    cargarProductos().then(productos => {

        const p = productos.find(producto => producto.id === id);

        if (!p) return;

        alert(
            "PRODUCTO: " + p.nombre +
            "\nDESCRIPCIÓN: " + p.descripcion +
            "\nPRECIO: Bs " + p.precio +
            "\nCATEGORÍA: " + p.categoria +
            "\nSTOCK: " + p.stock
        );

    });

}

