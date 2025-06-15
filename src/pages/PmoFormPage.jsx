// src/pages/PmoFormPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import Secao1 from '../components/PmoForm/Secao1';
import { initialFormData } from '../utils/formData';

function PmoFormPage() {
  // Hooks do React Router para navegar e pegar parâmetros da URL
  const navigate = useNavigate();
  const { pmoId } = useParams(); // Pega o ID da URL. Será 'undefined' se for a página de 'novo'

  // Determina se estamos no modo de edição
  const isEditMode = Boolean(pmoId);

  // Estados do componente
  const [nomeIdentificador, setNomeIdentificador] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Efeito que busca os dados do PMO SE estivermos em modo de edição
  useEffect(() => {
    if (isEditMode) {
      const fetchPmoData = async () => {
        setIsLoading(true);
        try {
          const response = await api.get(`/v1/pmos/${pmoId}/`);
          const { nome_identificador, form_data } = response.data;
          
          // Preenche o formulário com os dados recebidos da API
          setNomeIdentificador(nome_identificador);
          setFormData(form_data);

        } catch (err) {
          setError('Não foi possível carregar os dados deste PMO para edição.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPmoData();
    }
  }, [pmoId, isEditMode]); // Roda sempre que o ID na URL mudar

  // Função para lidar com a submissão do formulário
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Prepara o payload com os dados do formulário
    const payload = {
      nome_identificador: nomeIdentificador,
      form_data: formData,
    };

    try {
      if (isEditMode) {
        // MODO EDIÇÃO: Envia uma requisição PATCH para atualizar
        await api.patch(`/v1/pmos/${pmoId}/`, payload);
      } else {
        // MODO CRIAÇÃO: Envia uma requisição POST para criar
        // Adiciona os campos que só são necessários na criação
        payload.status = 'RASCUNHO';
        payload.version = 1;
        await api.post('/v1/pmos/', payload);
      }
      
      navigate('/'); // Navega de volta para o dashboard após o sucesso

    } catch (err) {
      const errorData = err.response?.data ? JSON.stringify(err.response.data, null, 2) : err.message;
      setError(`Erro ao salvar o PMO: ${errorData}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode) {
    return <h2>Carregando dados para edição...</h2>;
  }

  return (
    <div>
      {/* O título da página agora é dinâmico */}
      <h2>{isEditMode ? 'Editar Plano de Manejo' : 'Novo Plano de Manejo Orgânico'}</h2>
      
      <form onSubmit={handleFormSubmit} className="pmo-form">
        <div className="card mb-3">
          <div className="card-body">
            <label htmlFor="nome_identificador" className="form-label"><strong>Nome de Identificação do Plano</strong></label>
            <input
              id="nome_identificador"
              type="text"
              className="form-control"
              value={nomeIdentificador}
              onChange={(e) => setNomeIdentificador(e.target.value)}
              placeholder="Ex: Fazenda Boa Esperança - 2025"
              required
            />
          </div>
        </div>

        <Secao1
          data={formData.secao_1_descricao_propriedade}
          onSectionChange={(newData) =>
            setFormData((prev) => ({ ...prev, secao_1_descricao_propriedade: newData }))
          }
        />
        
        {/* Futuramente, os outros componentes de seção entrarão aqui */}

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="mt-3 form-actions">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Rascunho Inicial')}
          </button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default PmoFormPage;