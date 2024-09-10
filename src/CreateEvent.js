import React, { useState, useEffect } from 'react';
import './css/CreateEvent.css';

const CreateEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    patient: '',
    doctor: '',
    type: '', // Adicionando o campo para o tipo de consulta
  });

  const [patients, setPatients] = useState([]);
  const [searchTermPatient, setSearchTermPatient] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [searchTermDoctor, setSearchTermDoctor] = useState('');
  const [types, setTypes] = useState(['Consulta Geral', 'Exame', 'Retorno']); // Opções para o tipo de consulta

  // Função para buscar os pacientes da API
  // useEffect(() => {
  //   if (searchTermPatient) {
  //     fetch(`/api/patients?search=${searchTermPatient}`)
  //       .then((response) => response.json())
  //       .then((data) => setPatients(data))
  //       .catch((error) => console.error('Erro ao buscar pacientes:', error));
  //   }
  // }, [searchTermPatient]);

  // Função para buscar os médicos da API
  // useEffect(() => {
  //   if (searchTermDoctor) {
  //     fetch(`/api/doctors?search=${searchTermDoctor}`)
  //       .then((response) => response.json())
  //       .then((data) => setDoctors(data))
  //       .catch((error) => console.error('Erro ao buscar médicos:', error));
  //   }
  // }, [searchTermDoctor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handlePatientChange = (e) => {
    setSearchTermPatient(e.target.value);
  };

  const handleDoctorChange = (e) => {
    setSearchTermDoctor(e.target.value);
  };

  const handleSelectPatient = (patient) => {
    setEvent({ ...event, patient: patient.name });
    setSearchTermPatient(patient.name);
    setPatients([]);
  };

  const handleSelectDoctor = (doctor) => {
    setEvent({ ...event, doctor: doctor.name });
    setSearchTermDoctor(doctor.name);
    setDoctors([]);
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
            value={event.title}
            placeholder='Adicione um título...'
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="date-group">
          <div className="form-group">
            <label>Início: </label>
            <input
              type="datetime-local"
              name="start"
              value={event.start.toISOString().slice(0, -1)}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fim: </label>
            <input
              type="datetime-local"
              name="end"
              value={event.end.toISOString().slice(0, -1)}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Paciente: </label>
          <input
            type="text"
            value={searchTermPatient}
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
        <div className="form-group">
          <label>Médico: </label>
          <input
            type="text"
            value={searchTermDoctor}
            onChange={handleDoctorChange}
            placeholder="Buscar médico..."
          />
          {doctors.length > 0 && (
            <ul className="doctors-list">
              {doctors.map((doctor) => (
                <li key={doctor.id} onClick={() => handleSelectDoctor(doctor)}>
                  {doctor.name}
                </li>
              ))}
            </ul>
          )}
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
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
};

export default CreateEvent;
