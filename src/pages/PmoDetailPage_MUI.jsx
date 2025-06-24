// src/pages/PmoDetailPage_MUI.jsx (Sintaxe Corrigida)

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import {
  Box, Button, CircularProgress, Grid, Typography, List, ListItem,
  ListItemText, Divider, Chip, Link, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ========================================================
// ||       CORREÇÃO NA TAG DE FECHAMENTO DO BOX         ||
// ========================================================
const DetailItem = ({ label, value, sx }) => (
  <Box sx={sx}>
    <Typography variant="caption" color="text.secondary" component="div">
      {label}
    </Typography>
    <Typography variant="body1" component="div">
      {value || 'Não informado'}
    </Typography>
  </Box> 
);
// ========================================================

const DetailTable = ({ title, items, columns }) => (
  <Box mt={2}>
    <Typography variant="subtitle1" gutterBottom>{title}</Typography>
    {items && items.length > 0 ? (
      <List dense>
        {items.map((item, index) => (
          <ListItem key={index} divider={index < items.length - 1}>
            <ListItemText
              primary={item[columns[0].key] || 'Item sem nome'}
              secondary={
                columns.slice(1).map(col => `${col.header}: ${item[col.key] || 'N/A'}`).join(' | ')
              }
            />
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography variant="body2" color="text.secondary">Nenhum item cadastrado.</Typography>
    )}
  </Box>
);

function PmoDetailPageMUI() {
  const { pmoId } = useParams();
  const navigate = useNavigate();
  const [pmo, setPmo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPmo = async () => {
      setIsLoading(true);
      try {
        const { data, error: fetchError } = await supabase.from('pmos').select('*').eq('id', pmoId).single();
        if (fetchError) throw fetchError;
        setPmo(data);
      } catch (err) {
        setError('Não foi possível carregar os detalhes deste PMO.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPmo();
  }, [pmoId]);

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center" sx={{ my: 5 }}>{error}</Typography>;
  if (!pmo) return <Typography align="center" sx={{ my: 5 }}>Plano de Manejo não encontrado.</Typography>;
  
  const d = pmo.form_data || {};

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h1">{pmo.nome_identificador}</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>Voltar ao Painel</Button>
          <Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate(`/pmo/${pmoId}/editar`)}>Editar</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Informações Gerais</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
             <Grid size={{ xs: 12, sm: 6 }}><DetailItem label="Status" value={<Chip label={pmo.status || 'RASCUNHO'} color="primary" size="small" />} /></Grid>
             <Grid size={{ xs: 12, sm: 6 }}><DetailItem label="Criado em" value={new Date(pmo.created_at).toLocaleString('pt-BR')} /></Grid>
             <Grid size={{ xs: 12, sm: 6 }}><DetailItem label="Produtor" value={d.secao_1_descricao_propriedade?.dados_cadastrais?.nome_produtor} /></Grid>
             <Grid size={{ xs: 12, sm: 6 }}><DetailItem label="CPF" value={d.secao_1_descricao_propriedade?.dados_cadastrais?.cpf} /></Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Áreas da Propriedade (ha)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 4 }}><DetailItem label="Área Orgânica" value={d.secao_1_descricao_propriedade?.area_propriedade?.area_producao_organica_hectares} /></Grid>
              <Grid size={{ xs: 6, sm: 4 }}><DetailItem label="Área em Conversão" value={d.secao_1_descricao_propriedade?.area_propriedade?.area_producao_em_conversao_hectares} /></Grid>
              <Grid size={{ xs: 6, sm: 4 }}><DetailItem label="Área Não-Orgânica" value={d.secao_1_descricao_propriedade?.area_propriedade?.area_producao_nao_organica_hectares} /></Grid>
              <Grid size={{ xs: 12 }}><Divider sx={{ my: 1 }} /></Grid>
              <Grid size={{ xs: 12 }}><DetailItem label="Área Total" value={d.secao_1_descricao_propriedade?.area_propriedade?.area_total_propriedade_hectares} sx={{ typography: 'h6' }} /></Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Atividades Produtivas Orgânicas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}><DetailTable title="Produção Vegetal" items={d.secao_2_atividades_produtivas_organicas?.producao_primaria_vegetal?.produtos_primaria_vegetal} columns={[{ key: 'produto', header: 'Produto' }, { key: 'producao_esperada_ano', header: 'Produção Esperada/Ano' }]} /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><DetailTable title="Produção Animal" items={d.secao_2_atividades_produtivas_organicas?.producao_primaria_animal?.animais_primaria_animal} columns={[{ key: 'especie', header: 'Espécie' }, { key: 'n_de_animais', header: 'Nº de Animais' }]} /></Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Anexos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {(d.secao_18_anexos?.lista_anexos || []).map((anexo, index) => (
                <ListItem key={index} divider={index < (d.secao_18_anexos.lista_anexos.length - 1)}>
                  <ListItemText primary={anexo.nome_documento} secondary={<Link href={anexo.url_arquivo} target="_blank" rel="noopener noreferrer" underline="hover">{anexo.url_arquivo}</Link>} />
                </ListItem>
              ))}
              {(!d.secao_18_anexos?.lista_anexos || d.secao_18_anexos.lista_anexos.length === 0) && (
                <Typography variant="body2" color="text.secondary">Nenhum anexo encontrado.</Typography>
              )}
            </List>
          </AccordionDetails>
        </Accordion>

      </Box>
    </Box>
  );
}

export default PmoDetailPageMUI;