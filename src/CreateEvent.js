import React, { useState, useEffect } from 'react';
import './css/CreateEvent.css';

const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    patient: '', // Adicionando o campo de paciente
  });

  const [patients, setPatients] = useState([]); // Armazena os pacientes buscados
  const [searchTerm, setSearchTerm] = useState(''); // Armazena o termo de busca do paciente

  // Função para buscar os pacientes da API
  // useEffect(() => {
  //   if (searchTerm) {
  //     fetch(`/api/patients?search=${searchTerm}`) // Altere conforme sua API
  //       .then((response) => response.json())
  //       .then((data) => setPatients(data))
  //       .catch((error) => console.error('Erro ao buscar pacientes:', error));
  //   }
  // }, [searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handlePatientChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectPatient = (patient) => {
    setEvent({ ...event, patient });
    setSearchTerm(patient.name); // Atualiza o campo de pesquisa com o nome do paciente
    setPatients([]); // Esconde as sugestões após selecionar
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evento criado:', event);
    // Lógica para enviar o evento para o backend
  };

  return (
    <div className="create-event-container">
      <h2>Criar Novo Evento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título: </label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Início: </label>
          <input
            type="datetime-local"
            name="start"
            value={event.start.toISOString().slice(0, -1)}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Fim: </label>
          <input
            type="datetime-local"
            name="end"
            value={event.end.toISOString().slice(0, -1)}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Paciente: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handlePatientChange}
            placeholder="Buscar paciente..."
          />
          {patients.length > 0 && (
            <ul className="patients-list">
              {patients.map((patient) => (
                <li key={patient.id} onClick={() => handleSelectPatient(patient)}>
                  {patient.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
};

export default CreateEvent;
