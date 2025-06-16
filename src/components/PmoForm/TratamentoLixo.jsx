import React from 'react';

function TratamentoLixo({ data, onDataChange }) {
  const handleChange = (e) => {
    // Atualiza o objeto da subseção com o novo tratamento do lixo
    onDataChange({ ...data, tratamento_lixo: e.target.value });
  };

  return (
    <div className="card-body">
      <h5 className="card-title">6.9. Como é tratado/manejado o lixo na propriedade?</h5>
      <div className="form-group">
        <textarea 
          name="tratamento_lixo" 
          value={data?.tratamento_lixo || ''}
          onChange={handleChange} 
          className="form-control" 
          rows="3" 
          required
        ></textarea>
      </div>
    </div>
  );
}

export default TratamentoLixo;