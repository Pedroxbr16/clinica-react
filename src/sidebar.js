import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [showPatientsList, setShowPatientsList] = useState(false);

  const togglePatientsList = () => {
    setShowPatientsList(!showPatientsList);
  };

  return (
    <div className="sidebar">
      <h2>Home</h2>
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
        <li><a href="#agendamentos">Agendamentos</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
