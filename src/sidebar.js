import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar() {
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
      <h2><a href="#home">Home</a></h2>
      <ul>
        <li>
          <a href="#pacientes" onClick={togglePatientsList}>
            <FontAwesomeIcon icon={faUser} /> Pacientes
          </a>
          {showPatientsList && (
            <ul className="nested-list">
              <li><a href="#listagem">Listagem</a></li>
              <li><a href="#cadastro">Cadastro</a></li>
            </ul>
          )}
        </li>
        <li>
          <a href="#agendamentos" onClick={toggleAppointmentsList}>
            <FontAwesomeIcon icon={faCalendarAlt} /> Agendamentos
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
