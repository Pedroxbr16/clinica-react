import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';  // Importa a localização em português do Brasil
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/agenda.css'; // Aqui você pode ajustar o CSS
import CreateEvent from './CreateEvent'; // Certifique-se de que o caminho está correto

// Configura o moment para português
moment.locale('pt-br');

const localizer = momentLocalizer(moment);

const Agenda = () => {
  // Define o estado para armazenar os eventos
  const [events, setEvents] = useState([]); // Inicializa o estado com um array vazio

  // Função para adicionar um novo evento
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]); // Adiciona o novo evento ao estado
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week', 'day']}
        defaultView="month"
        messages={{
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          today: 'Hoje',
          previous: 'Anterior',
          next: 'Próximo',
          showMore: total => `+ ver mais (${total})`,
        }}
      />
    </div>
  );
};

export default Agenda;
