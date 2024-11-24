import React from 'react';
import Register from '../components/Register';

const RegisterPage = ({ onRegister }) => {
  return (
    <div className="register-page">
      <Register onRegister={onRegister} />
    </div>
  );
};

export default RegisterPage;