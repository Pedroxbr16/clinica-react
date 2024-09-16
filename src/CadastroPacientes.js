import React, { useState } from 'react';
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
    documentoIdentidade: '', // Campo usado para RG ou CNH
    tipoDocumento: 'RG', // Controle para alternar entre RG e CNH
    nascimento: '',
    genero: '', // Novo campo para gênero
    email: '',
    telefone: '',
    celular: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto: e.target.files[0] });
  };

  const handleCepBlur = async () => {
    if (formData.cep.length === 9) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`);
        if (response.data) {
          setFormData({
            ...formData,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
            estado: response.data.uf,
          });
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
  };

  const toggleDocumentoIdentidade = () => {
    setFormData({
      ...formData,
      tipoDocumento: formData.tipoDocumento === 'RG' ? 'CNH' : 'RG',
      documentoIdentidade: '', // Limpa o campo quando alternar
    });
  };

  return (
    <div className="container cadastro-pacientes">
      <h2>Cadastro de Pacientes</h2>
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
    </div>
  );
}

export default CadastroPacientes;
