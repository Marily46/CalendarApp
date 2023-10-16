export const getMessagesUS = () => {
    return {
        allDay: 'EveryDay',
        previous: '<',
        next: '>',
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        agenda: 'Agenda',
        date: 'Date',
        time: 'Time',
        event: 'Event',
        noEventsInRange: 'No events in this range',
        showMore: total => `+ View More (${total})`
    };
}