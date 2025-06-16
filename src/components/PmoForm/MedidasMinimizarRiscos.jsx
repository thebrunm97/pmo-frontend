// src/components/PmoForm/MedidasMinimizarRiscos.jsx
import React from 'react';

function MedidasMinimizarRiscos({ data, onDataChange }) {
  const handleChange = (e) => {
    onDataChange({ ...data, medidas_minimizar_riscos_contaminacao: e.target.value });
  };

  return (
    <div className="card-body">
      <h5 className="card-title">6.6 Como pretende diminuir ou eliminar os riscos de contaminação da sua propriedade?</h5>
      <p className="card-text"><small>Descreva as medidas que são aplicadas para minimizar os riscos.</small></p>
      <div className="form-group">
        <textarea 
          name="medidas_minimizar_riscos_contaminacao" 
          value={data?.medidas_minimizar_riscos_contaminacao || ''}
          onChange={handleChange} 
          className="form-control" 
          rows="4" 
          required
        ></textarea>
      </div>
    </div>
  );
}

export default MedidasMinimizarRiscos;