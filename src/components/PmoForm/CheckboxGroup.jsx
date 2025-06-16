// src/components/PmoForm/CheckboxGroup.jsx
import React from 'react';

// Componente genérico para grupos de checkboxes
function CheckboxGroup({ title, options, selectedData, onDataChange, otherField = false }) {
  
  // Divide a string de dados em um array para verificar facilmente o que está selecionado
  const selectedOptions = selectedData ? selectedData.split('; ') : [];
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let newSelectedOptions = [...selectedOptions];

    if (checked) {
      if (!newSelectedOptions.includes(value)) {
        newSelectedOptions.push(value);
      }
    } else {
      newSelectedOptions = newSelectedOptions.filter(option => option !== value);
    }
    
    // Junta o array de volta em uma string para salvar
    onDataChange(newSelectedOptions.join('; '));
  };

  return (
    <div className="form-group mb-4">
      <label className="form-label"><strong>{title}</strong></label>
      <div className="row">
        {options.map((option, index) => (
          <div className="col-md-6" key={index}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`${title}-${index}`}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={`${title}-${index}`}>
                {option}
              </label>
            </div>
          </div>
        ))}
      </div>
      {/* Se houver um campo "Outros", ele será renderizado aqui */}
      {otherField && (
        <div className="mt-2">
          <label className="form-label small">Outros - citar:</label>
          {/* Este input requer uma lógica de state separada ou um manejo mais complexo,
              por simplicidade, podemos usar um textarea simples por enquanto. */}
          <textarea className="form-control" rows="2"></textarea>
        </div>
      )}
    </div>
  );
}

export default CheckboxGroup;