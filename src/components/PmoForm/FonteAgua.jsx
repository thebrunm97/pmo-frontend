// src/components/PmoForm/FonteAgua.jsx
import React from 'react';
import CheckboxGroup from './CheckboxGroup';

function FonteAgua({ data, onDataChange }) {
  const options = [
    'Mina própria ou nascente ou olho d\'água', 'Cisterna', 'Açude', 
    'Mina fora da propriedade', 'Rio ou riacho', 'Canais coletivos de irrigação', 
    'Água subterrânea - Qual?'
  ];

  const handleChange = (newValue) => {
    onDataChange({ ...data, fonte_agua: newValue });
  };

  return (
    <div className="card-body">
      <CheckboxGroup
        title="6.2. Qual a fonte de água utilizada na propriedade?"
        options={options}
        selectedData={data?.fonte_agua || ''}
        onDataChange={handleChange}
        otherField={true}
      />
    </div>
  );
}

export default FonteAgua;