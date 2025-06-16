// src/components/PmoForm/RiscosContaminacao.jsx
import React from 'react';
import CheckboxGroup from './CheckboxGroup'; // Reutilizando nosso componente genérico

function RiscosContaminacao({ data, onDataChange }) {
  const options = [
    'Cultivos transgênicos nos arredores', 
    'Uso de insumos químicos proibidos', 
    'Contaminação por pulverização de áreas vizinhas', 
    'Contaminação dos cursos ou reservatórios de água', 
    'Enxurrada', 
    'Insumos externos contaminados', 
    'Animais trazidos de fora da propriedade'
  ];

  const handleChange = (newValue) => {
    // Atualiza o objeto da subseção com a string de opções selecionadas
    onDataChange({ ...data, riscos_contaminacao_unidade_producao: newValue });
  };

  return (
    <div className="card-body">
      <h5 className="card-title">6.5. Quais os principais riscos de contaminação da unidade de produção orgânica?</h5>
      <p className="card-text"><small>O Plano de Manejo deve contemplar todos os pontos de risco de contaminação da unidade de produção. Detalhe com precisão todos os riscos existentes.</small></p>
      
      <CheckboxGroup
        options={options}
        selectedData={data?.riscos_contaminacao_unidade_producao || ''}
        onDataChange={handleChange}
        otherFieldName="riscos_contaminacao_unidade_producao_outros"
      />
    </div>
  );
}

export default RiscosContaminacao;