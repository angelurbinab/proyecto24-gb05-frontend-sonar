import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerUsuarioActual, modificarUsuario, eliminarUsuario, agregarMetodoPago } from '../services/api';
import './PerfilPage.css';

const PerfilPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [nombreUsuario, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipoTarjeta, setTipoTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const usuarioData = await obtenerUsuarioActual();
      setUsuario(usuarioData);
      setNombre(usuarioData.nombre);
      setApellido(usuarioData.apellido);
      setCorreoElectronico(usuarioData.correoElectronico);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioData = { nombreUsuario, apellido, correoElectronico, contrasena };
    try {
      const result = await modificarUsuario(usuario.id, usuarioData);
      if (result) {
        setUsuario(result);
        navigate('/'); // Redirigir a la página principal
      } else {
        setError('Error al modificar el usuario');
        console.error('Error al modificar el usuario:', result);
      }
    } catch (error) {
      setError('Error al modificar el usuario');
      console.error('Error al modificar el usuario:', error);
    }
  };

  const handleEliminarUsuario = async () => {
    try {
      const result = await eliminarUsuario(usuario.id);
      if (result) {
        navigate('/login'); // Redirigir a la página de inicio de sesión
      } else {
        setError('Error al eliminar el usuario');
        console.error('Error al eliminar el usuario:', result);
      }
    } catch (error) {
      setError('Error al eliminar el usuario');
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleAgregarMetodoPago = async (e) => {
    e.preventDefault();
    const metodoPagoData = {cvv, fechaExpiracion, numeroTarjeta, tipoTarjeta };
    try {
      const result = await agregarMetodoPago(metodoPagoData);
      if (result) {
        navigate('/'); // Redirigir a la página principal
      } else {
        setError('Error al añadir el método de pago');
        console.error('Error al añadir el método de pago:', result);
      }
    } catch (error) {
      setError('Error al añadir el método de pago');
      console.error('Error al añadir el método de pago:', error);
    }
  };

  return (
    <div className="perfil-container">
      <img src="/images/Banner_superior.png" alt="Top Banner" className="banner" />
      <form onSubmit={handleSubmit} className="perfil-form">
        <h2>Perfil</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label htmlFor="nombreUsuario">Nombre:</label>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="correoElectronico">Correo Electrónico:</label>
          <input
            type="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <button type="submit" className="perfil-button">Guardar Cambios</button>
      </form>
      <button onClick={handleEliminarUsuario} className="eliminar-button">Eliminar Usuario</button>
      <form onSubmit={handleAgregarMetodoPago} className="metodo-pago-form">
        <h2>Añadir Método de Pago</h2>
        <div>
          <label htmlFor="tipoTarjeta">Tipo de Tarjeta:</label>
          <select value={tipoTarjeta} onChange={(e) => setTipoTarjeta(e.target.value)}>
            <option value="...">Elegir tipo de tarjeta</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="American Express">American Express</option>
            <option value="Discover">Discover</option>
          </select>
        </div>
        <div>
          <label htmlFor="numeroTarjeta">Número de Tarjeta:</label>
          <input
            type="text"
            value={numeroTarjeta}
            onChange={(e) => setNumeroTarjeta(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fechaExpiracion">Fecha de Expiración:</label>
          <input
            type="date"
            value={fechaExpiracion}
            onChange={(e) => setFechaExpiracion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
        <button type="submit" className="perfil-button">Añadir Método de Pago</button>
      </form>
      <img src="/images/Banner_inferior.png" alt="Bottom Banner" className="banner" />
    </div>
  );
};

export default PerfilPage;