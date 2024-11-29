
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginUsuario } from '../services/api';
import './Login.css';

const Login = ({ onLogin }) => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginResult = await loginUsuario(correoElectronico, contrasena);
    if (loginResult.status === 200) {
      onLogin();
      navigate('/');
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
      <div className="login-container">
        <img src="/images/Banner_superior.png" alt="Top Banner" className="banner"/>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error-message">{error}</p>}
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
          <button type="submit" className="login-button">Iniciar Sesión</button>
          <button type="button" className="register-button"
                  onClick={() => window.location.href = '/register'}>Registrarse
          </button>
        </form>
        <img src="/images/Banner_inferior.png" alt="Bottom Banner" className="banner"/>
      </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;