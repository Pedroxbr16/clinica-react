import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';  // Importa a localização em português do Brasil
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/agenda.css'; // Aqui você pode ajustar o CSS

// Configura o moment para português
moment.locale('pt-br');

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events] = useState([
  
    // Adicione mais eventos aqui
  ]);

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

export default CalendarComponent;
