import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Login from './Login';
import ListagemPacientes from './ListagemPacientes';  // Importando o componente de listagem
import CadastroPacientes from './CadastroPacientes';  // Importando o componente de cadastro
import Agenda from './Agenda';  // Importando o componente da agenda
import './css/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica o status de autenticação quando o componente é montado
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true'); // Define o status de autenticação
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Remove o status de autenticação
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/listagemPaciente" element={isAuthenticated ? <ListagemPacientes /> : <Navigate to="/login" />} />
            <Route path="/cadastro" element={isAuthenticated ? <CadastroPacientes /> : <Navigate to="/login" />} />
            <Route path="/agenda" element={isAuthenticated ? <Agenda /> : <Navigate to="/login" />} />
            {/* Outras rotas podem ser adicionadas aqui */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

//content no css
function Home() {
  return <h1>DocTech</h1>;
}

export default App;
