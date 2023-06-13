// Permite max. 2 productos antes de proyecto final
function validarCantidad(cantidad) {
    return (
        cantidad !== "" &&  // No debe estar vacío
        !isNaN(cantidad) && // No debe ser una cadena de textos
        parseInt(cantidad) > 0 && // Debe ser un número entero mayor que: 0
        parseInt(cantidad) <= 2 // Debe ser un número entero menor o igual a: 2
    );
}

// Valida si es Precio Neto está vacío o si es un string
function validarPrecioNeto(precioNeto) {
    return precioNeto !== "" && !isNaN(precioNeto);
}

// Valida monto del descuento >= 0 y <= 100; y si es en monto o porcentaje
function validarDescuento(descuento) {
    return (
        descuento !== "" && // Valida si es distinto de vacío
        (!isNaN(descuento) ||   // Valida si no es un número
            /^(\d+(\.\d+)?|\.\d+)%?$/.test(descuento) || // Valida si el descuento termina en porcentaje n%
            /^%(\d+(\.\d+)?)$/.test(descuento)) && // Validar si el descuento comienza por porcentaje %n
        parseFloat(descuento) >= 0 && // Se asegura de que el número sea real positivo; y permite 0 descuento
        parseFloat(descuento) <= 100 // Impide que el desc. sea mayor al 100%
    );
}

// Pprocesa los montos para el cálculo del total
function calcularTotal(precioNeto, descuento) {
    const IVA = 1.19;
    // Si es descuento es en monto, realiza este cálculo
    if (!isNaN(descuento)) {
        const total = (precioNeto - descuento) * IVA;
        return total.toFixed(2); // Asegura que el total tenga 2 decimales
    } else { // Si el descuento es en porcentaje, realiza este cálculo
        const descuentoPorcentaje = parseFloat(descuento.replace("%", "")); // Para el cálculo elimina el %
        const total = (precioNeto * ((100 - descuentoPorcentaje) / 100)) * IVA; // Realiza el cálculo con porcentaje
        return total.toFixed(2);
    }
}

// Solicita los datos del o de los productos
function solicitarDatosProducto(numeroProducto) {
    const precioNeto = prompt(`Ingrese Precio Neto del Producto ${numeroProducto}`);
    if (precioNeto === null) {
        return null; // Si cancela se termina
    }
    if (!validarPrecioNeto(precioNeto)) {
        return solicitarDatosProducto(numeroProducto);
    }

    const descuento = prompt(
        `Ingrese el Descuento del Producto ${numeroProducto} en monto o porcentaje %`
    );
    if (descuento === null) {
        return {
            precioNeto: parseFloat(precioNeto),
            descuento: 0,
        };
    }
    if (!validarDescuento(descuento)) {
        return solicitarDatosProducto(numeroProducto);
    }

    if (descuento.includes("%")) {
        return {
            precioNeto: parseFloat(precioNeto),
            descuento: parseFloat(descuento.replace("%", "")),
            esPorcentaje: true,
        };
    } else {
        return {
            precioNeto: parseFloat(precioNeto),
            descuento: parseFloat(descuento),
            esPorcentaje: false,
        };
    }
}

function iniciar() {
    const cantidadProductos = prompt(
        "Ingrese la cantidad de productos (recomendamos 2 max.)"
    );
    if (cantidadProductos === null) {
        return;
    }
    if (!validarCantidad(cantidadProductos)) {
        iniciar();
        return;
    }

    for (let i = 1; i <= parseInt(cantidadProductos); i++) {
        console.log(`Datos del Producto ${i}:`);

        const datosProducto = solicitarDatosProducto(i);
        if (datosProducto === null) {
            return;
        }

        const { precioNeto, descuento, esPorcentaje } = datosProducto;

        console.log("Precio Neto:", precioNeto);
        console.log("Descuento:", descuento, esPorcentaje ? "%" : "");
        console.log("IVA: 19%"); // Hay que agregar el iva en monto
        console.log("Total:", calcularTotal(precioNeto, descuento));
        console.log("");
    }
}

// Inicia al programa
iniciar();


