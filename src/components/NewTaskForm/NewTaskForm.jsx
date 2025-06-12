import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import './NewTaskForm.css';

function NewTask() {
  // Estados para cada campo do formulário
  const [formData, setFormData] = useState({
    tipoAtividade: '',
    tipoParticipacao: '',
    titulo: '',
    realizadaUFC: '',
    nomeInstituicao: '',
    pais: 'Brasil',
    cnpj: '',
    dataInicio: '',
    dataFim: '',
    cargaHorariaTotal: '',
    horasCredito: '',
    tipoUtilizacaoHoras: '',
    declaracao: null,
  });
  
  // --- CORRECTED STATE ---
  // 1. Initialize state for each dropdown with an empty array [].
  const [activityTypes, setActivityTypes] = useState([]);
  const [participationTypes, setParticipationTypes] = useState([]);
  const [fileName, setFileName] = useState('');

  // --- CORRECTED FETCH FUNCTIONS ---
  // 2. Make fetch functions return the formatted data array.
  const fetch_activity_types = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/Tipo_Atividade');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Format data into a { value, label } structure
      const options = data.map(item => ({
        value: item.nome.toLowerCase().replace(/_/g, '-'),
        label: item.nome.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
      }));
      return options; // <-- Return the data
    } catch (error) {
      console.error("Failed to fetch activity types:", error);
      return []; // Return empty array on error
    }
  };
/*em andamento
  const fetch_participation_types = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/Tipo_Participacao');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const options = data.map(item => ({
        value: item.nome.toLowerCase().replace(/_/g, '-'),
        label: item.nome.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
      }));
      return options; // <-- Return the data
    } catch (error) {
      console.error("Failed to fetch participation types:", error);
      return []; // Return empty array on error
    }
  };
*/

  useEffect(() => {
    const loadOptions = async () => {
      const fetchedActivityTypes = await fetch_activity_types();
      setActivityTypes(fetchedActivityTypes);

      const fetchedParticipationTypes = await fetch_participation_types();
      setParticipationTypes(fetchedParticipationTypes);
    };

    loadOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData(prevState => ({
        ...prevState,
        declaracao: e.target.files[0]
      }));
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do Formulário Submetido:", formData);
    alert('Atividade submetida com sucesso!');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Submissão de Nova Atividade</h2>
      <p className="form-subtitle">Preencha os dados da atividade para solicitar creditação das horas. Campos marcados com * são obrigatórios.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="tipoAtividade">Tipo de Atividade *</label>
            <select id="tipoAtividade" name="tipoAtividade" value={formData.tipoAtividade} onChange={handleChange} required>
              <option value="" disabled>Selecione o tipo</option>
              {/* --- 4. Map over the correct state variable --- */}
              {activityTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tipoParticipacao">Tipo de Participação *</label>
            <select id="tipoParticipacao" name="tipoParticipacao" value={formData.tipoParticipacao} onChange={handleChange} required>
              <option value="" disabled>Selecione a participação</option>
              {/* --- Map over the second state variable --- */}
              {participationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* ... (rest of your form remains the same) ... */}

          <div className="form-group full-width">
            <label htmlFor="titulo">Título da Atividade *</label>
            <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Digite o título da atividade" required />
          </div>

          <div className="form-group full-width">
            <label htmlFor="realizadaUFC">Realizada na UFC? *</label>
            <select id="realizadaUFC" name="realizadaUFC" value={formData.realizadaUFC} onChange={handleChange} required>
              <option value="" disabled>Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="nomeInstituicao">Nome da Instituição *</label>
            <input type="text" id="nomeInstituicao" name="nomeInstituicao" value={formData.nomeInstituicao} onChange={handleChange} placeholder="Digite o nome da instituição" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="pais">País</label>
            <select id="pais" name="pais" value={formData.pais} onChange={handleChange}>
              <option value="Brasil">Brasil</option>
              <option value="EUA">Estados Unidos</option>
              <option value="Portugal">Portugal</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="cnpj">CNPJ da Instituição</label>
            <input type="text" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" />
          </div>

          <div className="form-group">
            <label htmlFor="dataInicio">Data de Início *</label>
            <input type="date" id="dataInicio" name="dataInicio" value={formData.dataInicio} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="dataFim">Data de Fim *</label>
            <input type="date" id="dataFim" name="dataFim" value={formData.dataFim} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="cargaHorariaTotal">Carga Horária Total (horas) *</label>
            <input type="number" id="cargaHorariaTotal" name="cargaHorariaTotal" value={formData.cargaHorariaTotal} onChange={handleChange} placeholder="Ex: 60" required />
          </div>

          <div className="form-group">
            <label htmlFor="horasCredito">Horas para Crédito *</label>
            <input type="number" id="horasCredito" name="horasCredito" value={formData.horasCredito} onChange={handleChange} placeholder="Ex: 40" required />
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="tipoUtilizacaoHoras">Tipo de Utilização das Horas *</label>
            <select id="tipoUtilizacaoHoras" name="tipoUtilizacaoHoras" value={formData.tipoUtilizacaoHoras} onChange={handleChange} required>
              <option value="" disabled>Selecione como as horas serão utilizadas</option>
              <option value="complementar">Atividade Complementar</option>
              <option value="estagio">Estágio</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Declaração de Participação *</label>
            <label htmlFor="declaracao" className="file-upload-area">
              <input type="file" id="declaracao" name="declaracao" onChange={handleFileChange} required accept=".pdf,.doc,.docx,.jpg,.png"/>
              <FaUpload className="upload-icon" />
              <span className="file-upload-text">{fileName || 'Selecionar Arquivo'}</span>
              <span className="file-upload-info">PDF, DOC, DOCX, JPG, PNG (máx. 10MB)</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button">Cancelar</button>
          <button type="submit" className="submit-button">Submeter Solicitação</button>
        </div>
      </form>
    </div>
  );
}

export default NewTask;