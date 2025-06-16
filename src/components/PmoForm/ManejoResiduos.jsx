// src/components/PmoForm/ManejoResiduos.jsx
import React from 'react';

function ManejoResiduos({ data, onDataChange }) {
  const options = [
    'Acumula o esterco dos animais em local específico para curtir', 'Faz compostagem', 'Coloca no biodigestor',
    'Produz biofertilizante', 'Faz vermicompostagem/húmus', 'Utiliza na alimentação de animais'
  ];

  const selectedOptions = data?.praticas_manejo_residuos_organicos?.split('; ').filter(Boolean) || [];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let newSelectedOptions = [...selectedOptions];

    if (checked) {
      if (!newSelectedOptions.includes(value)) newSelectedOptions.push(value);
    } else {
      newSelectedOptions = newSelectedOptions.filter(option => option !== value);
    }
    
    onDataChange({ ...data, praticas_manejo_residuos_organicos: newSelectedOptions.join('; ') });
  };

  return (
    <div className="card-body">
      <h5 className="card-title">6.7 Que práticas são adotadas para o manejo de resíduos orgânicos?</h5>
      
      {options.map((option, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`residuo-${index}`}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor={`residuo-${index}`}>{option}</label>
        </div>
      ))}
      <div className="mt-2">
        <label className="form-label small">Outros - Citar:</label>
        <textarea className="form-control" rows="2"></textarea>
      </div>
    </div>
  );
}

export default ManejoResiduos;