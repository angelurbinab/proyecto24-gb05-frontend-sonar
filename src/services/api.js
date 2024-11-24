import API_URLS from '../config';

const handleResponse = async (response) => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error en la solicitud');
        }
        return data;
    } else {
        const text = await response.text();
        if (!response.ok) {
            throw new Error(text || 'Error en la solicitud');
        }
        return text;
    }
};
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

// Registrar un nuevo usuario (POST method)
export const registrarUsuario = async (usuarioData) => {
    try {
        const response = await fetch(`${API_URLS.usuarios}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
    }
};
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

// Función para iniciar sesión (POST method)
export const loginUsuario = async (correoElectronico, contrasena) => {
    try {
        const response = await fetch(`${API_URLS.usuarios}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correoElectronico, contrasena })
        });
        const data = await handleResponse(response);
        return { status: response.status, data };
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return { status: 500, error };
    }
};
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

// Calificar contenido (POST method)
export const calificarContenido = async (calificacionData) => {
    try {
        const response = await fetch(`${API_URLS.calificaciones}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(calificacionData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await handleResponse(response);
    } catch (error) {
        console.error("Error al calificar el contenido:", error);
    }
};