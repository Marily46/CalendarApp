import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, Navbar } from "../";
import { addHours } from 'date-fns';
import { localizer, getMessagesUS } from '../../helpers';
import { useState } from 'react';
import { useUiStore } from '../../hooks';

const events = [{
  title: 'Cumpleaños de la mascota',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours( new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Milagros'
  }
}]

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#0f2b46db',
      borderRadius: '0px',
      color: 'white'
    }
    return {
      style
    };
  }

  const onDoubleClick = ( event ) => {
    //console.log({ doubleClick: event });
    openDateModal();
  }

  const onSelect = ( event ) => {
    console.log({ click: event });
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);
    setLastView( event )
  }

  return (
    <>
      <Navbar />

      <Calendar
      culture='es' 
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessagesUS() }
        eventPropGetter={ eventStyleGetter }
        components={ {
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />

    </>
  )
}
