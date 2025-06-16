// src/components/PmoForm/PromocaoBiodiversidade.jsx
import React from 'react';

// Reutilizamos o CheckboxGroup que você já tem
import CheckboxGroup from './CheckboxGroup';

function PromocaoBiodiversidade({ data, onDataChange }) {
  const options = [
    'Culturas consorciadas', 'Sistemas agroflorestais', 'Rotação de culturas', 'Plantio em nível',
    'Recuperação/enriquecimento de APPs', 'Plantio direto', 'Corredor ecológico ou cordão vegetativo permanente', 'Preservação da mata ciliar',
    'Manejo do mato e alternância de capinas', 'Cercamento de nascentes', 'Ausência de fogo', 'Terraceamento',
    'Adubação verde', 'Mantém nascente de água própria', 'Adubos orgânicos', 'Realiza manejo das águas residuais',
    'Diversificação da produção', 'Evita o desperdício de água', 'Plantio de flores e outros cultivos', 'Orienta vizinhos',
    'Cultivo em aleias/faixas', 'Quebra ventos', 'Cobertura do solo'
  ];

  const handleChange = (newValue) => {
    onDataChange({ ...data, medidas_promocao_biodiversidade: newValue });
  };

  return (
    <div className="card-body">
      <CheckboxGroup
        title="6.1. Como irá promover a biodiversidade da propriedade e a conservação da água e do solo?"
        options={options}
        selectedData={data?.medidas_promocao_biodiversidade || ''}
        onDataChange={handleChange}
        otherField={true}
      />
    </div>
  );
}

export default PromocaoBiodiversidade;