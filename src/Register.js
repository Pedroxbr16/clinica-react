import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Estado para armazenar a função (Médico ou Atendente)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para registrar o usuário (simulada)
    console.log('Usuário registrado:', {
      username,
      role,
    });

    // Redireciona para a página de login após o registro
    navigate('/login');
  };

  // Função para voltar ao login
  const handleBackToLogin = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="register-container">
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            placeholder="Escolha um nome de usuário..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Escolha uma senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Função</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)} // Atualiza o estado da função
            required
          >
            <option value="">Selecione uma função...</option>
            <option value="medico">Médico</option>
            <option value="atendente">Atendente</option>
          </select>
        </div>
        <button type="submit" className="register-button">Cadastrar</button>
      </form>
      
      {/* Botão de voltar ao login */}
      <button onClick={handleBackToLogin} className="back-button">Voltar ao Login</button>
    </div>
  );
}

export default Register;
