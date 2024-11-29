import React from 'react';
import PropTypes from 'prop-types';

const Usuario = ({ usuario }) => {
  return (
    <div>
      <h2>Usuario</h2>
      {usuario ? <pre>{JSON.stringify(usuario, null, 2)}</pre> : <p>Cargando...</p>}
    </div>
  );
};

Usuario.propTypes = {
  usuario: PropTypes.func.isRequired,
};

export default Usuario;