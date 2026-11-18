
// ===================================
// BURGER HOUSE - DASHBOARD
// ===================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        // RECUPERAR PRODUCTOS

        const productos = await cargarProductos();

        // CALCULAR INDICADORES

        const total = productos.length;

        const categorias = [
            ...new Set(productos.map(p => p.categoria))
        ];

        const disponibles = productos.filter(
            p => p.stock > 0
        ).length;

        const agotados = productos.filter(
            p => p.stock === 0
        ).length;

        const bajos = productos.filter(
            p => p.stock > 0 && p.stock <= 5
        );

        const valor = productos.reduce(
            (suma, p) => suma + p.precio * p.stock,
            0
        );

        // FECHA Y HORA

        document.getElementById("updated-at").textContent =
            "Actualización: " + new Date().toLocaleString("es-BO");

        // TARJETAS KPI

        const indicadores = [

            ["Total de productos", total],

            ["Cantidad de categorías", categorias.length],

            ["Valor del inventario", "Bs " + valor.toFixed(2)],

            ["Productos disponibles", disponibles],

            ["Productos agotados", agotados],

            ["Productos con bajo stock", bajos.length]

        ];

        const kpis = document.getElementById("kpi-container");

        kpis.innerHTML = indicadores.map(item => `

            <div class="stat-card">

                <small>${item[0]}</small>

                <strong>${item[1]}</strong>

            </div>

        `).join("");

        // GRÁFICO DE CATEGORÍAS

        const graficoCategoria =
            document.getElementById("category-chart");

        graficoCategoria.innerHTML = categorias.map(c => {

            const cantidad = productos.filter(
                p => p.categoria === c
            ).length;

            const porcentaje = cantidad / total * 100;

            return `

                <div class="bar-row">

                    <span>${c}</span>

                    <div class="bar-track">

                        <div
                            class="bar-fill"
                            style="width:${porcentaje}%"
                        ></div>

                    </div>

                    <b>${cantidad}</b>

                </div>

            `;

        }).join("");

        // GRÁFICO DE STOCK

        const distribucion = [

            ["Disponibles", disponibles],

            ["Agotados", agotados],

            ["Stock bajo", bajos.length]

        ];

        document.getElementById("stock-chart").innerHTML =
            distribucion.map(item => {

                const porcentaje = item[1] / total * 100;

                return `

                    <div class="bar-row">

                        <span>${item[0]}</span>

                        <div class="bar-track">

                            <div
                                class="bar-fill"
                                style="width:${porcentaje}%"
                            ></div>

                        </div>

                        <b>${item[1]}</b>

                    </div>

                `;

            }).join("");

        // TABLA DE PRODUCTOS CON BAJO STOCK

        const tabla = document.getElementById("low-stock-table");

        tabla.innerHTML = bajos.length > 0
            ? bajos.map(p => `

                <tr>

                    <td>${p.nombre}</td>

                    <td>${p.categoria}</td>

                    <td>${p.stock}</td>

                    <td>Reponer pronto</td>

                </tr>

            `).join("")
            : "<tr><td colspan='4'>No hay productos con bajo stock.</td></tr>";

  } catch (error) {

    console.error("ERROR DEL DASHBOARD:", error);

    document.getElementById("kpi-container").innerHTML = `
        <p style="color:red;">
            No se pudieron cargar las estadísticas.
            Error: ${error.message}
        </p>
    `;

}

});
