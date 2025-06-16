// src/components/PmoForm/Secao6.jsx
import React from 'react';

// Importando todos os sub-componentes da Seção 6.
// Garanta que todos esses arquivos existam na mesma pasta.
import PromocaoBiodiversidade from './PromocaoBiodiversidade';
import FonteAgua from './FonteAgua';
import ControleUsoAgua from './ControleUsoAgua';
import RiscoContaminacaoAgua from './RiscoContaminacaoAgua';
import RiscosContaminacao from './RiscosContaminacao';
import MedidasMinimizarRiscos from './MedidasMinimizarRiscos';
import ManejoResiduos from './ManejoResiduos';
import Compostagem from './Compostagem';
import TratamentoLixo from './TratamentoLixo';

// --- Componente "Container" da Seção 6 ---
function Secao6({ data, onSectionChange }) {
  
  // Função genérica para atualizar qualquer sub-seção.
  const handleSubSectionChange = (subSectionName, subSectionData) => {
    onSectionChange({
      ...data,
      [subSectionName]: subSectionData
    });
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h3>6. ASPECTOS AMBIENTAIS</h3>
      </div>

      <PromocaoBiodiversidade 
        data={data?.promocao_biodiversidade} 
        onDataChange={(newData) => handleSubSectionChange('promocao_biodiversidade', newData)} 
      />
      <hr/>

      <FonteAgua
        data={data?.fonte_agua}
        onDataChange={(newData) => handleSubSectionChange('fonte_agua', newData)}
      />
      <hr/>
      
      <ControleUsoAgua 
        data={data?.controle_uso_agua} 
        onDataChange={(newData) => handleSubSectionChange('controle_uso_agua', newData)} 
      />
      <hr/>
      
      <RiscoContaminacaoAgua 
        data={data?.risco_contaminacao_agua} 
        onDataChange={(newData) => handleSubSectionChange('risco_contaminacao_agua', newData)} 
      />
      <hr/>
      
      <RiscosContaminacao 
        data={data?.riscos_contaminacao_unidade_producao} 
        onDataChange={(newData) => handleSubSectionChange('riscos_contaminacao_unidade_producao', newData)} 
      />
      <hr/>
      
      <MedidasMinimizarRiscos 
        data={data?.medidas_minimizar_riscos_contaminacao} 
        onDataChange={(newData) => handleSubSectionChange('medidas_minimizar_riscos_contaminacao', newData)} 
      />
      <hr/>
      
      <ManejoResiduos 
        data={data?.praticas_manejo_residuos_organicos} 
        onDataChange={(newData) => handleSubSectionChange('praticas_manejo_residuos_organicos', newData)} 
      />
      <hr/>
      
      <Compostagem 
        data={data?.compostagem} 
        onDataChange={(newData) => handleSubSectionChange('compostagem', newData)} 
      />
      <hr/>
      
      <TratamentoLixo 
        data={data?.tratamento_lixo} 
        onDataChange={(newData) => handleSubSectionChange('tratamento_lixo', newData)} 
      />
      
    </div>
  );
}

export default Secao6;