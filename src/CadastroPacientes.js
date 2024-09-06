import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/CadastroPacientes.css';

function CadastroPacientes() {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    foto: null,
    cep: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cpf: '',
    nascimento: new Date(), // Data de nascimento inicializada com a data atual
    email: '',
    telefone: '',
    celular: '',
  });

  // Função para lidar com mudanças nos campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para lidar com a mudança da data de nascimento
  const handleDateChange = (date) => {
    setFormData({ ...formData, nascimento: date });
  };

  // Função para lidar com a mudança do campo de upload de arquivo (foto)
  const handleFileChange = (e) => {
    setFormData({ ...formData, foto: e.target.files[0] });
  };

  // Função para buscar informações do CEP quando o campo perde o foco
  const handleCepBlur = async () => {
    if (formData.cep.length === 9) { // Verifica se o CEP está completo
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
        console.error('Erro ao buscar o CEP:', error); // Loga erro no console se a requisição falhar
      }
    }
  };

  // Lista de estados brasileiros para o campo de seleção
  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Função chamada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregamento da página

    // Aqui você pode enviar o formData para o backend
    console.log('Dados do formulário:', formData); // Exibe os dados do formulário no console
  };

  return (
    <div className="cadastro-pacientes">
      <h2>Cadastro de Pacientes</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ gridColumn: 'span 1' }}>
          {/* Campo para o nome do paciente */}
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>
        <div style={{ gridColumn: 'span 1' }}>
          {/* Campo para upload de foto do paciente */}
          <label>Foto:</label>
          <input 
            type="file" 
            name="foto" 
            onChange={handleFileChange} 
            accept="image/png, image/jpeg, image/jpg, application/pdf" 
          />
        </div>
        <div>
          {/* Campo para o CEP com máscara */}
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
          {/* Campo para o número da residência */}
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
          {/* Campo para o bairro */}
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
          {/* Campo para a cidade */}
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
          {/* Campo para o estado com uma lista de estados brasileiros */}
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
        <div>
          {/* Campo para o CPF com máscara */}
          <label>CPF:</label>
          <InputMask
            mask="999.999.999-99"
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          {/* Campo para a data de nascimento com o DatePicker */}
          <label>Data de Nascimento:</label>
          <DatePicker
            selected={formData.nascimento}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()} // Impede seleção de datas futuras
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            required
          />
        </div>
        <div>
          {/* Campo para o email */}
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
          {/* Campo para o telefone com máscara */}
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
          {/* Campo para o celular com máscara */}
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
        {/* Botão para enviar o formulário */}
        <button type="submit">Cadastrar</button>
      </form> 
    </div>
  );
}

export default CadastroPacientes;
