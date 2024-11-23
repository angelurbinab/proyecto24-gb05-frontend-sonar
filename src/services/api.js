// Obtener usuario actual (GET method)
export const obtenerUsuarioActual = async () => {
    try {
        const response = await fetch(`${API_URLS.usuarios}/datos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
};

// Añadir método de pago (POST method)
export const agregarMetodoPago = async (metodoPagoData) => {
    try {
        const response = await fetch(`${API_URLS.usuarios}/metodos-pago`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(metodoPagoData)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Error al añadir el método de pago:", error);
    }
};
