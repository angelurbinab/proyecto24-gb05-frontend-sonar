// Reproducir contenido en alta calidad (GET method)
export const reproducirContenido = async (id) => {
    try {
        const response = await fetch(`${API_URLS.contenidos}/${id}/reproducir`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Error al reproducir el contenido:", error);
    }
};
