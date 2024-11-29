import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerUsuarioActual, agregarPerfilUsuario, cambiarPerfilUsuario} from '../services/api';
import './PerfilesPage.css';

const PerfilesPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [nombrePerfil, setNombrePerfil] = useState('');
  const [perfiles, setPerfiles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const usuarioData = await obtenerUsuarioActual();
      setUsuario(usuarioData);
      const perfilesGuardados = JSON.parse(sessionStorage.getItem('perfiles')) || [];
      setPerfiles(perfilesGuardados);
    };

    fetchData();
  }, []);

  const handleAgregarPerfil = async (e) => {
    e.preventDefault();
    const perfilData = { nombrePerfil };
    try {
      const result = await agregarPerfilUsuario(usuario.id, perfilData);
      if (result) {
        const nuevoPerfil = { id: result.id, nombrePerfil: perfilData.nombrePerfil };
        const nuevosPerfiles = [...perfiles, nuevoPerfil];
        setPerfiles(nuevosPerfiles);
        sessionStorage.setItem('perfiles', JSON.stringify(nuevosPerfiles));
        setNombrePerfil('');
      } else {
        setError('Error al añadir el perfil');
        console.error('Error al añadir el perfil:', result);
      }
    } catch (error) {
      setError('Error al añadir el perfil');
      console.error('Error al añadir el perfil:', error);
    }
  };

  const handleCambiarPerfil = async (nombrePerfil) => {
    try {
      const result = await cambiarPerfilUsuario(nombrePerfil);
      if (result) {
        navigate('/');
      } else {
        setError('Error al cambiar el perfil');
        console.error('Error al cambiar el perfil:', result);
      }
    } catch (error) {
      setError('Error al cambiar el perfil');
      console.error('Error al cambiar el perfil:', error);
    }
  };

  return (
    <div className="perfiles-container">
      <img src="/images/Banner_superior.png" alt="Top Banner" className="banner" />
      <h2>Perfiles</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="perfiles-grid">
        {perfiles.map(perfil => (
          <div key={perfil.nombrePerfil} className="perfil-card">
            <h3>{perfil.nombrePerfil}</h3>
            <button onClick={() => handleCambiarPerfil(perfil.nombrePerfil)} className="perfil-button">Seleccionar</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleAgregarPerfil} className="perfil-form">
        <h2>Añadir Nuevo Perfil</h2>
        <div>
          <label htmlFor="nombrePerfil">Nombre del Perfil:</label>
          <input
            type="text"
            value={nombrePerfil}
            onChange={(e) => setNombrePerfil(e.target.value)}
          />
        </div>
        <button type="submit" className="perfil-button">Añadir Perfil</button>
      </form>
      <img src="/images/Banner_inferior.png" alt="Bottom Banner" className="banner" />
    </div>
  );
};

export default PerfilesPage;