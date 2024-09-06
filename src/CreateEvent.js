import React, { useState } from 'react';
import './css/CreateEvent.css';

const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para criar o evento (enviar para o backend ou atualizar o estado global)
    console.log('Evento criado:', event);
  };

  return (
    <div className="create-event-container">
      <h2>Criar Novo Evento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Início:</label>
          <input
            type="datetime-local"
            name="start"
            value={event.start.toISOString().slice(0, -1)}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Fim:</label>
          <input
            type="datetime-local"
            name="end"
            value={event.end.toISOString().slice(0, -1)}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Criar Evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;
