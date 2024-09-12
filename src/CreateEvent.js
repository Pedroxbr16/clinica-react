import React, { useState } from 'react';
import './css/CreateEvent.css';

const CreateEvent = ({ types = [] }) => {
  const [event, setEvent] = useState({
    title: '',
    start: new Date().toISOString().slice(0, 16), // Formato para datetime-local
    end: new Date().toISOString().slice(0, 16),   // Formato para datetime-local
    patient: '',
    doctor: '',
    type: '', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evento criado:', event);
    // Lógica para enviar o evento para o backend
  };

  return (
    <div className="create-event-container">
      <h2>Nova Consulta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título: </label>
          <input
            type="text"
            name="title"
            placeholder='Adicione um título a consulta...'
            value={event.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Início: </label>
          <input
            type="datetime-local"
            name="start"
            value={event.start}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Fim: </label>
          <input
            type="datetime-local"
            name="end"
            value={event.end}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Paciente: </label>
          <input
            type="text"
            name="patient"
            placeholder='Buscar paciente...'
            value={event.patient}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Médico: </label>
          <input
            type="text"
            name="doctor"
            placeholder='Buscar médico...'
            value={event.doctor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo de Consulta: </label>
          <select
            name="type"
            value={event.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione um Tipo de Consulta</option>
            {types.length > 0 ? (
              types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))
            ) : (
              <option value="">Nenhum tipo disponível</option>
            )}
          </select>
        </div>
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
};

export default CreateEvent;
