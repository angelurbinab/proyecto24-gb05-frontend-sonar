import React from 'react';

const Usuario = ({ usuario }) => {
  return (
    <div>
      <h2>Usuario</h2>
      {usuario ? <pre>{JSON.stringify(usuario, null, 2)}</pre> : <p>Cargando...</p>}
    </div>
  );
};

export default Usuario;