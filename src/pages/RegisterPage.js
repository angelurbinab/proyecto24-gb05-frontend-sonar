import React from 'react';
import PropTypes from 'prop-types';
import Register from '../components/Register';

const RegisterPage = ({ onRegister }) => {
  return (
    <div className="register-page">
      <Register onRegister={onRegister} />
    </div>
  );
};

RegisterPage.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterPage;