import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registrarUsuario } from '../services/api';
import './Register.css';

const Register = ({ onRegister }) => {
  const [nombreUsuario, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioData = { nombreUsuario, apellido, correoElectronico, contrasena, fechaNacimiento };
    try {
      const registerResult = await registrarUsuario(usuarioData);
      if (registerResult || registerResult.status === 201) {
        onRegister();
        navigate('/login');
      } else {
        setError('Error en el registro');
        console.error('Error al registrar el usuario:', registerResult);
      }
    } catch (error) {
      setError('Error en el registro');
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
      <div className="register-container">
        <img src="/images/Banner_superior.png" alt="Top Banner" className="banner"/>
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Registrarse</h2>
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
          <div>
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
            <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">Registrarse</button>
        </form>
        <img src="/images/Banner_inferior.png" alt="Bottom Banner" className="banner"/>
      </div>
  );
};

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default Register;