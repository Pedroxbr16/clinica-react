import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
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
    nascimento: new Date().toISOString().slice(0, 16), // Formato datetime-local
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
    <div className="cadastro-pacientes">
      <h2>Cadastro de Pacientes</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ gridColumn: 'span 1' }}>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="file-input">
          <label>Foto:</label>
          <input 
            type="file" 
            name="foto" 
            id="foto" 
            onChange={handleFileChange} 
            accept="image/png, image/jpeg, image/jpg, application/pdf" 
          />       
        </div>
     
        <div>
          <label>CEP:</label>
          <InputMask
            mask="99999-999"
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleInputChange}
            onBlur={handleCepBlur}
            required
          />
        </div>

        <div>
          <label>Número:</label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Bairro:</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Estado:</label>
          <select
            name="estado"
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

        {/* CPF */}
        <div>
          <label>CPF:</label>
          <InputMask
            mask="999.999.999-99"
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            required={!formData.cnpj} // Requerido se CNPJ não for preenchido
          />
        </div>

        {/* CNPJ */}
        <div>
          <label>CNPJ:</label>
          <InputMask
            mask="99.999.999/9999-99"
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleInputChange}
            required={!formData.cpf} // Requerido se CPF não for preenchido
          />
        </div>

        {/* Alternar entre RG e CNH */}
        <div>
          <label>{formData.tipoDocumento === 'RG' ? 'RG:' : 'CNH:'}</label>
          <InputMask
            mask={formData.tipoDocumento === 'RG' ? '99.999.999-9' : '999999999'}
            type="text"
            name="documentoIdentidade"
            value={formData.documentoIdentidade}
            onChange={handleInputChange}
            required
          />
          <button type="button" onClick={toggleDocumentoIdentidade}>
            Alternar para {formData.tipoDocumento === 'RG' ? 'CNH' : 'RG'}
          </button>
        </div>

        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="nascimento"
            value={formData.nascimento}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Campo de Gênero */}
        <div>
          <label>Gênero:</label>
          <select
            name="genero"
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

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Telefone:</label>
          <InputMask
            mask="(99) 9999-9999"
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Celular:</label>
          <InputMask
            mask="(99) 99999-9999"
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroPacientes;
