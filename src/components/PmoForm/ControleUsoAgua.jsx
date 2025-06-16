// src/components/PmoForm/ControleUsoAgua.jsx
import React from 'react';

function ControleUsoAgua({ data, onDataChange }) {
  const handleChange = (e) => {
    onDataChange({ ...data, controle_uso_agua: e.target.value });
  };

  return (
    <div className="card-body">
      <h5 className="card-title">6.3 Como controla o uso da água na produção?</h5>
      <div className="form-group">
        <textarea 
          name="controle_uso_agua" 
          value={data?.controle_uso_agua || ''}
          onChange={handleChange} 
          className="form-control" 
          rows="3" 
          required
        ></textarea>
      </div>
    </div>
  );
}

export default ControleUsoAgua;