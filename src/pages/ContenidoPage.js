import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { obtenerContenidoPorId, obtenerCalificacionesPorContenido, calificarContenido, obtenerUsuarioActual, reproducirContenido, añadirFavorito  } from '../services/api';
import './ContenidoPage.css';

const ContenidoPage = () => {
  const { id } = useParams();
  const [contenido, setContenido] = useState(null);
  const [calificaciones, setCalificaciones] = useState([]);
  const [puntuacion, setPuntuacion] = useState('');
  const [comentario, setComentario] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarioData = await obtenerUsuarioActual();
        setUsuario(usuarioData);
        const contenidoData = await obtenerContenidoPorId(id);
        setContenido(contenidoData);
        const calificacionesData = await obtenerCalificacionesPorContenido(id);
        setCalificaciones(calificacionesData);
      } catch (error) {
        console.error('Error al cargar los datos del contenido:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleCalificar = async (e) => {
    e.preventDefault();
    const fecha = new Date().toISOString().split('T')[0];
    const calificacionData = { comentario, fecha, idContenido: parseInt(id), idUsuario: usuario.id, puntuacion: parseInt(puntuacion)};
    try {
      const result = await calificarContenido(calificacionData);
      if (result) {
        setCalificaciones([...calificaciones, result]);
        setPuntuacion('');
        setComentario('');
      } else {
        console.error('Error al calificar el contenido:', result);
      }
    } catch (error) {
      console.error('Error al calificar el contenido:', error);
    }
  };

  const handleReproducir = async () => {
    try {
      const result = await reproducirContenido(id);
      if (result) {
        console.log('Contenido reproducido:', result);
      } else {
        console.error('Error al reproducir el contenido:', result);
      }
    } catch (error) {
      console.error('Error al reproducir el contenido:', error);
    }
  };

  const handleAñadirFavorito = async () => {
    const favorito_data = { peliculaId: parseInt(id) };
    try {
      const result = await añadirFavorito(favorito_data);
      if (result) {
        console.log('Contenido añadido a favoritos:', result);
      } else {
        console.error('Error al añadir a favoritos:', result);
      }
    } catch (error) {
      console.error('Error al añadir a favoritos:', error);
    }
  };

  if (!contenido) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="contenido-container">
      <img src="/images/Banner_superior.png" alt="Top Banner" className="banner" />
      <div className="contenido-detalles">
        <img src={`/images/${contenido.thumbnail}`} alt={contenido.titulo} className="thumbnail" />
        <h2>{contenido.titulo}</h2>
        <p>{contenido.descripcion}</p>
        <p><strong>Género:</strong> {contenido.género}</p>
        <p><strong>Fecha de lanzamiento:</strong> {contenido.año_lanzamiento}</p>
        <button onClick={handleReproducir} className="reproducir-button">Reproducir</button>
        <button onClick={handleAñadirFavorito} className="favorito-button">Añadir a Favoritos</button>
      </div>
      <div className="calificaciones">
        <h3>Calificaciones</h3>
        {calificaciones.length > 0 ? (
          calificaciones.map((calificacion) => (
            <div key={calificacion.id_calificacion} className="calificacion-card">
              <p><strong>Puntuación:</strong> {calificacion.puntuacion}</p>
              <p><strong>Comentario:</strong> {calificacion.comentario}</p>
            </div>
          ))
        ) : (
          <p>No hay calificaciones disponibles.</p>
        )}
      </div>
      <form onSubmit={handleCalificar} className="calificacion-form">
        <h3>Dejar una calificación</h3>
        <div>
          <label>Puntuación:</label>
          <input
            type="number"
            value={puntuacion}
            onChange={(e) => setPuntuacion(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label>Comentario:</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="calificar-button">Calificar</button>
      </form>
      <img src="/images/Banner_inferior.png" alt="Bottom Banner" className="banner" />
    </div>
  );
};

export default ContenidoPage;