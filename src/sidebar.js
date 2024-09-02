import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  // Estados separados para cada lista
  const [showPatientsList, setShowPatientsList] = useState(false);
  const [showAppointmentsList, setShowAppointmentsList] = useState(false);

  const togglePatientsList = () => {
    setShowPatientsList(!showPatientsList);
  };

  const toggleAppointmentsList = () => {
    setShowAppointmentsList(!showAppointmentsList);
  };

  return (
    <div className="sidebar">
      <h2><a href="#home" >
            Home
          </a></h2>
      <ul>
        <li>
          <a href="#pacientes" onClick={togglePatientsList}>
            Pacientes
          </a>
          {showPatientsList && (
            <ul className="nested-list">
              <li><a href="#listagem">Listagem</a></li>
              <li><a href="#cadastro">Cadastro</a></li>
              <li><a href="#historico">Histórico</a></li>
            </ul>
          )}
        </li>
        <li>
          <a href="#agendamentos" onClick={toggleAppointmentsList}>
            Agendamentos
          </a>
          {showAppointmentsList && (
            <ul className="nested-list">
              <li><a href="#agenda">Mostrar Agenda</a></li>
              <li><a href="#CriarAgenda">Criar Agendamento</a></li>
              <li><a href="#AlterarAgenda">Alterar Agendamento</a></li>
              <li><a href="#ExcluirAgenda">Excluir Agendamento</a></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
