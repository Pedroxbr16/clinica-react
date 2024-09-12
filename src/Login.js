import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      localStorage.setItem('isAuthenticated', 'true');
      onLogin();
      navigate('/');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  // Alterna a visibilidade da senha
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>DocTech</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            placeholder="Insira seu usuário..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Senha</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={toggleShowPassword}>
              <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i> {/* Ícones de olho */}
            </span>
          </div>
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>

      <button onClick={handleRegister} className="register-button">
        Cadastra-se
      </button>
    </div>
  );
}

export default Login;
