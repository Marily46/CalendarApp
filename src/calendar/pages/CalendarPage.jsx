import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { localizer, getMessagesUS } from '../../helpers';
import { useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';


export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
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
    openDateModal();
  }

  const onSelect = ( event ) => {
    setActiveEvent( event );
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
      <FabAddNew />
      <FabDelete />

    </>
  )
}
