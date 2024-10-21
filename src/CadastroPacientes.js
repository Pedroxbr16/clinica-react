import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CadastroPacientes.css';

function CadastroPacientes() {
  const [formData, setFormData] = useState({
    nome: '',
    foto: null,
    cep: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cpf: '',
    cnpj: '',
    documentoIdentidade: '',
    tipoDocumento: 'RG',
    nascimento: '',
    genero: '',
    email: '',
    telefone: '',
    celular: '',
  });

  const [historico, setHistorico] = useState([]);
  const [novoHistorico, setNovoHistorico] = useState('');
  const [activeTab, setActiveTab] = useState('cadastro');
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleFileChange = useCallback((e) => {
    setFormData(prevState => ({
      ...prevState,
      foto: e.target.files[0],
    }));
  }, []);

  const handleCepBlur = useCallback(async () => {
    const cleanedCep = formData.cep.replace(/\D/g, '');
    if (cleanedCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        if (response.data) {
          setFormData(prevState => ({
            ...prevState,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
            estado: response.data.uf,
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  }, [formData.cep]);

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.cpf && !formData.cnpj) {
      setSubmitStatus('Erro: CPF ou CNPJ deve ser informado.');
      return;
    }
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/pacientes', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Sucesso:', response.data);
      setSubmitStatus('Cadastro realizado com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setSubmitStatus('Erro ao cadastrar. Por favor, tente novamente.');
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      foto: null,
      cep: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cpf: '',
      cnpj: '',
      documentoIdentidade: '',
      tipoDocumento: 'RG',
      nascimento: '',
      genero: '',
      email: '',
      telefone: '',
      celular: '',
    });
    document.querySelector("input[type='file']").value = null;
  };

  const toggleDocumentoIdentidade = () => {
    setFormData(prevState => ({
      ...prevState,
      tipoDocumento: prevState.tipoDocumento === 'RG' ? 'CNH' : 'RG',
      documentoIdentidade: '',
    }));
  };

  // Gerenciar histórico
  const handleAddHistorico = () => {
    if (novoHistorico.trim() !== '') {
      setHistorico(prevState => [...prevState, novoHistorico]);
      setNovoHistorico(''); 
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Mudar o título da página com base na aba ativa
  useEffect(() => {
    if (activeTab === 'cadastro') {
      document.title = 'Cadastro de Pacientes';
    } else if (activeTab === 'historico') {
      document.title = 'Histórico de Pacientes';
    }
  }, [activeTab]); // O título muda quando a aba ativa é alterada

  return (
    <div className="container cadastro-pacientes">
      <h2>{activeTab === 'cadastro' ? 'Cadastro de Pacientes' : 'Histórico de Pacientes'}</h2>

      {submitStatus && (
        <div className={`alert ${submitStatus.includes('sucesso') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {submitStatus}
        </div>
      )}

      {/* Navegação por abas */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'cadastro' ? 'active' : ''}`} onClick={() => handleTabChange('cadastro')}>Cadastro</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'historico' ? 'active' : ''}`} onClick={() => handleTabChange('historico')}>Histórico</button>
        </li>
      </ul>

      {/* Conteúdo das abas */}
      {activeTab === 'cadastro' && (
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label>Foto:</label>
            <input 
              type="file" 
              name="foto" 
              className="form-control"
              onChange={handleFileChange} 
              accept="image/png, image/jpeg, image/jpg, application/pdf" 
            />
          </div>

          <div className="col-md-4">
            <label>CEP:</label>
            <InputMask
              mask="99999-999"
              type="text"
              name="cep"
              className="form-control"
              value={formData.cep}
              onChange={handleInputChange}
              onBlur={handleCepBlur}
              required
            />
          </div>

          <div className="col-md-4">
            <label>Número:</label>
            <input
              type="text"
              name="numero"
              className="form-control"
              value={formData.numero}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label>Bairro:</label>
            <input
              type="text"
              name="bairro"
              className="form-control"
              value={formData.bairro}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label>Cidade:</label>
            <input
              type="text"
              name="cidade"
              className="form-control"
              value={formData.cidade}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label>Estado:</label>
            <select
              name="estado"
              className="form-select"
              value={formData.estado}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione um Estado</option>
              {estadosBrasileiros.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label>CPF:</label>
            <InputMask
              mask="999.999.999-99"
              type="text"
              name="cpf"
              className="form-control"
              value={formData.cpf}
              onChange={handleInputChange}
              required={!formData.cnpj} 
            />
          </div>

          <div className="col-md-6">
            <label>CNPJ:</label>
            <InputMask
              mask="99.999.999/9999-99"
              type="text"
              name="cnpj"
              className="form-control"
              value={formData.cnpj}
              onChange={handleInputChange}
              required={!formData.cpf}
            />
          </div>

          <div className="col-md-6">
            <label>{formData.tipoDocumento === 'RG' ? 'RG:' : 'CNH:'}</label>
            <InputMask
              mask={formData.tipoDocumento === 'RG' ? '99.999.999-9' : '999999999'}
              type="text"
              name="documentoIdentidade"
              className="form-control"
              value={formData.documentoIdentidade}
              onChange={handleInputChange}
              required
            />
            <button type="button" className="toggle-doc-btn" onClick={toggleDocumentoIdentidade}>
              Alternar para {formData.tipoDocumento === 'RG' ? 'CNH' : 'RG'}
            </button>
          </div>

          <div className="col-md-6">
            <label>Data de Nascimento:</label>
            <input
              type="date"
              name="nascimento"
              className="form-control"
              value={formData.nascimento}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label>Gênero:</label>
            <select
              name="genero"
              className="form-select"
              value={formData.genero}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione um Gênero</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="col-md-6">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label>Telefone:</label>
            <InputMask
              mask="(99) 9999-9999"
              type="text"
              name="telefone"
              className="form-control"
              value={formData.telefone}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6">
            <label>Celular:</label>
            <InputMask
              mask="(99) 99999-9999"
              type="text"
              name="celular"
              className="form-control"
              value={formData.celular}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
          </div>
        </form>
      )}

      {activeTab === 'historico' && (
        <div className="historico-tab">
          <h3>Histórico do Paciente</h3>
          <ul className="list-group mb-3">
            {historico.length === 0 ? (
              <li className="list-group-item">Nenhum histórico adicionado ainda.</li>
            ) : (
              historico.map((item, index) => (
                <li key={index} className="list-group-item">
                  {item}
                </li>
              ))
            )}
          </ul>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Adicionar novo histórico"
              value={novoHistorico}
              onChange={(e) => setNovoHistorico(e.target.value)}
            />
            <button className="btn btn-primary" type="button" onClick={handleAddHistorico}>
              Adicionar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroPacientes;
