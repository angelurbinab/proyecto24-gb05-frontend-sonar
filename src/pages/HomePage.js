import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerContenidos, obtenerUsuarioActual } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const [usuario, setUsuario] = useState(null);
  const [contenidos, setContenidos] = useState([]);
  const [genero, setGenero] = useState('');
  const [orden, setOrden] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const usuarioData = await obtenerUsuarioActual();
      setUsuario(usuarioData);

      const contenidosData = await obtenerContenidos();
      setContenidos(contenidosData);
    };

    fetchData();
  }, []);

  const handleContenidoClick = (id) => {
    navigate(`/contenido/${id}`);
  };

  const handleGeneroChange = async (e) => {
    setGenero(e.target.value);
    const contenidosData = await obtenerContenidos(e.target.value, orden);
    setContenidos(contenidosData);
  };

  const handleOrdenChange = async (e) => {
    setOrden(e.target.value);
    const contenidosData = await obtenerContenidos(genero, e.target.value);
    setContenidos(contenidosData);
  };

  const handleMostrarFavoritos = () => {
    navigate('/favoritos');
  };

  return (
    <div className="home-container">
      <div className="top-right">
      <button onClick={handleMostrarFavoritos} className="favoritos-button">Mostrar Favoritos</button>
        <button onClick={() => navigate('/perfiles')} className="change-profile-button">Cambiar Perfil</button>
        <img
          src="/images/perfil.png"
          alt="Perfil"
          className="perfil-icon"
          onClick={() => navigate('/perfil')}
        />
      </div>
      <img src="/images/Banner_superior.png" alt="Top Banner" className="banner" />
      <div className="welcome-message">
        {usuario && <h2>Hola {usuario.nombre}, ¿qué quieres ver hoy?</h2>}
      </div>

      <div className="filter-container">
        <select value={genero} onChange={handleGeneroChange} className="filter-select">
          <option value="">Todos los géneros</option>
          <option value="accion">Acción</option>
          <option value="crimen">Crimen</option>
          <option value="drama">Drama</option>
          <option value="cienciaficcion">Ciencia ficción</option>
        </select>
        <select value={orden} onChange={handleOrdenChange} className="filter-select">
          <option value="">Ordenar por</option>
          <option value="popularidad">Popularidad</option>
          <option value="fecha">Fecha de lanzamiento</option>
        </select>
      </div>

      <div className="contenidos-grid">
        {contenidos.length > 0 ? (
          contenidos.map((contenido) => (
            <div key={contenido.id_contenido} className="contenido-card"  onClick={() => handleContenidoClick(contenido.id_contenido)}>
              <img src={`/images/${contenido.thumbnail}`} alt={contenido.titulo} className="thumbnail"  />
              <h3>{contenido.titulo}</h3>
            </div>
          ))
        ) : (
          <p>No hay contenidos disponibles.</p>
        )}
      </div>
      <img src="/images/Banner_inferior.png" alt="Bottom Banner" className="banner" />
    </div>
  );
};

export default HomePage;