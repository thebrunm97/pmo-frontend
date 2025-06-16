import React from 'react';

function RiscoContaminacaoAgua({ data, onDataChange }) {
  // Usamos optional chaining e um valor padrão para segurança
  const temRisco = data?.ha_risco_contaminacao_agua || false;

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Se o input for o radio button, converte o valor para booleano
    if (name === 'ha_risco_contaminacao_agua') {
      const newValue = value === 'true';
      onDataChange({ 
        ...data, 
        ha_risco_contaminacao_agua: newValue,
        // Se o usuário clicar "Não", limpa o campo de texto
        qual_risco_contaminacao_agua: newValue ? data.qual_risco_contaminacao_agua : ''
      });
    } else {
      // Para o textarea
      onDataChange({ ...data, [name]: value });
    }
  };

  return (
    <div className="card-body">
      <h5 className="card-title">6.4. Há risco de contaminação para sua água?</h5>
      <p className="card-text"><small>A análise de água deverá ser realizada no mínimo em periodicidade anual e o laudo deverá ser enviado à GEC ou apresentado ao auditor na auditoria.</small></p>
      
      <div className="form-group">
        <div className="form-check form-check-inline">
          <input 
            className="form-check-input" 
            type="radio" 
            name="ha_risco_contaminacao_agua" 
            id="risco_sim" 
            value="true" 
            checked={temRisco === true} 
            onChange={handleChange} 
          />
          <label className="form-check-label" htmlFor="risco_sim">Sim</label>
        </div>
        <div className="form-check form-check-inline">
          <input 
            className="form-check-input" 
            type="radio" 
            name="ha_risco_contaminacao_agua" 
            id="risco_nao" 
            value="false" 
            checked={temRisco === false} 
            onChange={handleChange} 
          />
          <label className="form-check-label" htmlFor="risco_nao">Não</label>
        </div>
      </div>
      
      {/* O campo de texto só aparece se a resposta for "Sim" */}
      {temRisco && (
        <div className="mt-2">
          <label htmlFor="qual_risco" className="form-label small">Qual(is)?</label>
          <textarea 
            id="qual_risco"
            name="qual_risco_contaminacao_agua" 
            value={data.qual_risco_contaminacao_agua || ''} 
            onChange={handleChange} 
            className="form-control" 
            rows="3"
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default RiscoContaminacaoAgua;