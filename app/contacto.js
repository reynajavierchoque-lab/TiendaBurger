
// ===================================
// BURGER HOUSE - CONTACTO
// ===================================

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("contact-form");

    if (!formulario) return;

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        // RECUPERAR DATOS

        const nombre =
            document.getElementById("nombre").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const celular =
            document.getElementById("celular").value.trim();

        const asunto =
            document.getElementById("asunto").value.trim();

        const mensaje =
            document.getElementById("mensaje").value.trim();

        // VALIDAR CAMPOS VACÍOS

        if (!nombre || !correo || !celular || !asunto || !mensaje) {

            alert("Debes completar todos los campos.");

            return;

        }

        // VALIDAR CORREO

        const correoValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

        if (!correoValido) {

            alert("Ingresa un correo válido.");

            return;

        }

        // VALIDAR CELULAR

        const celularValido =
            /^[0-9]{7,15}$/.test(celular);

        if (!celularValido) {

            alert("Ingresa un número de celular válido.");

            return;

        }

        // MOSTRAR CONFIRMACIÓN

        const aviso = document.getElementById("form-notice");

        aviso.style.display = "block";

        aviso.textContent =
            "¡Gracias " + nombre +
            "! Tu mensaje fue registrado correctamente.";

        formulario.reset();

    });

});
