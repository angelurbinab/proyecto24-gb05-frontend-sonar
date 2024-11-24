
import React, { useEffect, useState } from 'react';
import { obtenerContenidos } from '../services/api';

const Contenidos = () => {
  const [contenidos, setContenidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const contenidosData = await obtenerContenidos();
      setContenidos(contenidosData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Contenidos</h2>
      <div className="contenidos-grid">
        {contenidos.map((contenido) => (
          <div key={contenido.id} className="contenido-card">
            <h3>{contenido.titulo}</h3>
            <p>{contenido.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contenidos;