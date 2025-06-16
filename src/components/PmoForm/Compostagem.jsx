import React from 'react';

function Compostagem({ data, onDataChange }) {
  const handleChange = (e) => {
    // Atualiza o objeto da subseção com a nova descrição
    onDataChange({ ...data, descricao_compostagem: e.target.value });
  };

  return (
    <div className="card-body">
      <h5 className="card-title">6.8. Compostagem</h5>
      <p className="card-text"><small>Informar quais são os resíduos usados na compostagem e quanto tempo leva para estabilizar o composto orgânico. No caso de adquirir insumos externos para a compostagem, informe a fonte e se os mesmos são oriundos de sistemas orgânicos de produção ou de sistema convencional.</small></p>
      <div className="form-group">
        <textarea 
          name="descricao_compostagem" 
          value={data?.descricao_compostagem || ''}
          onChange={handleChange} 
          className="form-control" 
          rows="4"
        ></textarea>
      </div>
    </div>
  );
}

export default Compostagem;