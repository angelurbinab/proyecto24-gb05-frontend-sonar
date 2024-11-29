
import React from 'react';
import PropTypes from 'prop-types';
import Login from '../components/Login';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="login-page">
      <Login onLogin={onLogin} />
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;