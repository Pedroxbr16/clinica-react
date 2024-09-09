import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

function Login({ onLogin }) {
  // Estados para armazenar o valor do nome de usuário e senha
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Hook para navegar programaticamente para outras rotas
  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregamento da página

    // Simulação de verificação de credenciais
    if (username && password) {
      // Armazena a autenticação no localStorage
      localStorage.setItem('isAuthenticated', 'true');
      
      // Chama a função onLogin passada como props para atualizar o estado de autenticação
      onLogin();
      
      // Redireciona para a página inicial após o login
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <h2>DocTech</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* Campo para o nome de usuário */}
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            placeholder='insira seu usuário...'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {/* Campo para a senha */}
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder='insira sua senha...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Botão para enviar o formulário */}
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
