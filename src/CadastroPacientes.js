import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
    nascimento: new Date(),
    email: '',
    telefone: '',
    celular: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, nascimento: date });
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
    // Aqui você pode enviar o formData para o backend
    console.log('Dados do formulário:', formData);
  };

  return (
    <div className="cadastro-pacientes">
      <h2>Cadastro de Pacientes</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ gridColumn: 'span 1' }}>
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
        </div>
        <div style={{ gridColumn: 'span 1' }}>
          <label>Foto:</label>
        <input 
          type="file" 
          name="foto" 
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
          <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Bairro:</label>
          <input type="text" name="bairro" value={formData.bairro} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Cidade:</label>
          <input type="text" name="cidade" value={formData.cidade} onChange={handleInputChange} required />
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
        <div>
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
          <label>Data de Nascimento:</label>
          <DatePicker
            selected={formData.nascimento}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
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
