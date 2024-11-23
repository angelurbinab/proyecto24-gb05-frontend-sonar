
// Obtener todos los contenidos (GET method)
export const obtenerContenidos = async (genero = '', orden = '') => {
    try {
        const url = new URL(API_URLS.contenidos);
        if (genero) url.searchParams.append('genero', genero);
        if (orden) url.searchParams.append('orden', orden);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Error al obtener los contenidos:", error);
    }
};