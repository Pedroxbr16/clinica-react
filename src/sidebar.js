import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import './css/Sidebar.css';

function Sidebar({ onLogout }) {
  const [showPatientsList, setShowPatientsList] = useState(false);
  const [showAppointmentsList, setShowAppointmentsList] = useState(false);
  const [showAdminList, setShowAdminList] = useState(false); // Estado para o menu de Administração
  const navigate = useNavigate();

  const togglePatientsList = () => {
    setShowPatientsList(!showPatientsList);
  };

  const toggleAppointmentsList = () => {
    setShowAppointmentsList(!showAppointmentsList);
  };

  const toggleAdminList = () => {
    setShowAdminList(!showAdminList);
  };

  const handleLogoutClick = () => {
    onLogout(); // Chama a função de logout do App
    navigate('/login'); // Redireciona para a tela de login
  };

  return (
    <div className="sidebar">
      <h2><Link to="/">Home</Link></h2>
      <ul>
        <li>
          <a href="#pacientes" onClick={togglePatientsList}>
            <FontAwesomeIcon icon={faUser} style={{ color: '#007bff' }} /> Pacientes
          </a>
          {showPatientsList && (
            <ul className="nested-list">
              <li><Link to="/listagemPaciente">Listagem</Link></li>
              <li><Link to="/cadastro">Cadastro</Link></li>
            </ul>
          )}
        </li>
        <li>
          <a href="#agendamentos" onClick={toggleAppointmentsList}>
            <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#28a745' }} /> Agendamentos
          </a>
          {showAppointmentsList && (
            <ul className="nested-list">
              <li><Link to="/agenda">Mostrar Agenda</Link></li>
              <li><Link to="/create-event">Criar Agendamento</Link></li>
            </ul>
          )}
        </li>
        <li>
          <a href="#administracao" onClick={toggleAdminList}>
            <FontAwesomeIcon icon={faCog} style={{ color: '#A9A9A9' }}/> Administração
          </a>
          {showAdminList && (
            <ul className="nested-list">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/config">Configurações</Link></li>
            </ul>
          )}
        </li>
      </ul>
      <div className="sidebar-footer">
        <button 
          onClick={handleLogoutClick} 
          className="logout-button">
          Deslogar
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
