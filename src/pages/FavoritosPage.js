import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerFavoritos, obtenerContenidoPorId } from '../services/api';
import './FavoritosPage.css';

const FavoritosPage = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoritosData = await obtenerFavoritos();
        const favoritosConDetalles = await Promise.all(
          favoritosData.map(async (favorito) => {
            const contenido = await obtenerContenidoPorId(favorito.idPelicula);
            return { ...favorito, ...contenido };
          })
        );
        setFavoritos(favoritosConDetalles);
      } catch (error) {
        console.error('Error al obtener los favoritos:', error);
        setError('Error al obtener los favoritos');
      }
    };

    fetchData();
  }, []);

  const handleContenidoClick = (id) => {
    navigate(`/contenido/${id}`);
  };

  return (
    <div className="favoritos-container">
      <img src="/images/Banner_superior.png" alt="Top Banner" className="banner" />
      <h2>Favoritos</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="favoritos-grid">
        {favoritos.map((favorito) => (
          <div key={favorito.idPelicula} className="favorito-card" onClick={() => handleContenidoClick(favorito.idPelicula)}>
            <img src={`/images/${favorito.thumbnail}`} alt={favorito.titulo} className="favorito-thumbnail" />
            <h3>{favorito.titulo}</h3>
          </div>
        ))}
      </div>
      <img src="/images/Banner_inferior.png" alt="Bottom Banner" className="banner" />
    </div>
  );
};

export default FavoritosPage;