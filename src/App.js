import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Login from './Login';
import ListagemPacientes from './ListagemPacientes';  
import CadastroPacientes from './CadastroPacientes';  
import Agenda from './Agenda';  
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
        <ConditionalContent
          isAuthenticated={isAuthenticated}
          handleLogin={handleLogin}
        />
      </div>
    </Router>
  );
}

// Componente para alterar a classe content com base na rota
const ConditionalContent = ({ isAuthenticated, handleLogin }) => {
  const location = useLocation(); // Hook para pegar a localização atual

  // Verifica se a rota é a da agenda
  const isAgendaRoute = location.pathname === '/agenda';

  return (
    <div className={isAgendaRoute ? 'content agenda-content' : 'content'}>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/listagemPaciente" element={isAuthenticated ? <ListagemPacientes /> : <Navigate to="/login" />} />
        <Route path="/cadastro" element={isAuthenticated ? <CadastroPacientes /> : <Navigate to="/login" />} />
        <Route path="/agenda" element={isAuthenticated ? <Agenda /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

function Home() {
  return <h1>DocTech</h1>;
}

export default App;
