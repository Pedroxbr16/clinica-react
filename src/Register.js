import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Register.css';
import InputMask from 'react-input-mask';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [crm, setCrm] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuário registrado:', {
      username,
      password,
      role,
      crm,
      nascimento,
      email,
      celular,
      cpf,
      cep,
      numero,
      bairro,
      cidade,
      estado
    });
    navigate('/login');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleCepBlur = async () => {
    if (cep.length === 9) { // Verifica se o CEP está completo
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data && !response.data.erro) {
          setBairro(response.data.bairro);
          setCidade(response.data.localidade);
          setEstado(response.data.uf);
        } else {
          alert('CEP não encontrado.');
        }
      } catch (error) {
        console.error('Falha ao buscar o CEP:', error);
        alert('Erro ao buscar o CEP.');
      }
    }
  };

  // Estados brasileiros
  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div className="register-container bg-light p-4 shadow-sm rounded">
        <h2 className="text-center mb-4">Registrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="role">Função</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Selecione uma função...</option>
              <option value="medico">Médico</option>
              <option value="atendente">Atendente</option>
            </select>
          </div>

          {role === 'atendente' && (
            <>
              <div className="form-group mb-3">
                <label htmlFor="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Escolha um nome de usuário..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Escolha uma senha..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {role === 'medico' && (
            <>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="username">Usuário</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Escolha um nome de usuário..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="crm">CRM</label>
                  <input
                    type="text"
                    id="crm"
                    className="form-control"
                    placeholder="CRM"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="nascimento">Data de Nascimento</label>
                  <input
                    type="date"
                    id="nascimento"
                    className="form-control"
                    value={nascimento}
                    onChange={(e) => setNascimento(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="celular">Celular</label>
                  <InputMask
                    mask="(99) 99999-9999"
                    type="text"
                    id="celular"
                    className="form-control"
                    placeholder="Celular"
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="cpf">CPF</label>
                  <InputMask
                    mask="999.999.999-99"
                    type="text"
                    id="cpf"
                    className="form-control"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="cep">CEP</label>
                  <InputMask
                    mask="99999-999"
                    type="text"
                    id="cep"
                    className="form-control"
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={handleCepBlur}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="numero">Número</label>
                  <input
                    type="text"
                    id="numero"
                    className="form-control"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="bairro">Bairro</label>
                  <input
                    type="text"
                    id="bairro"
                    className="form-control"
                    placeholder="Bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    className="form-control"
                    placeholder="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="estado">Estado</label>
                  <select
                    id="estado"
                    className="form-select"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                  >
                    <option value="">Selecione um Estado</option>
                    {estadosBrasileiros.map(estado => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-success w-100 mb-3">Cadastrar</button>
        </form>
        <button onClick={handleBackToLogin} className="btn btn-primary w-100">Voltar ao Login</button>
      </div>
    </div>
  );
}

export default Register;
