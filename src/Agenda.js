import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';  
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/agenda.css'; 
import CreateEvent from './CreateEvent'; 


moment.locale('pt-br');

const localizer = momentLocalizer(moment);

const Agenda = () => {
  // Define o estado para armazenar os eventos
  const [events, setEvents] = useState([]);


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
