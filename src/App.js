import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Login from './Login';
import Register from './Register'; // Importando o componente de registro
import ListagemPacientes from './ListagemPacientes';
import CadastroPacientes from './CadastroPacientes';
import Agenda from './Agenda';
import CreateEvent from './CreateEvent'; 
import Config from './ConfigADM';
import './css/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            {/* Rota de Login */}
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
            
            {/* Rota de Cadastro (Register) */}
            <Route path="/register" element={<Register />} /> 

            {/* Outras rotas protegidas */}
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/listagemPaciente" element={isAuthenticated ? <ListagemPacientes /> : <Navigate to="/login" />} />
            <Route path="/cadastro" element={isAuthenticated ? <CadastroPacientes /> : <Navigate to="/login" />} />
            <Route path="/agenda" element={isAuthenticated ? <Agenda /> : <Navigate to="/login" />} />
            <Route path="/create-event" element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />} />
            <Route path="/config" element={isAuthenticated ? <Config /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>DocTech</h1>;
}

export default App;
