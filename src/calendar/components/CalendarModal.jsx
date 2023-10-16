import { addHours } from 'date-fns';
import React, { useMemo, useState } from 'react'
import ReactModal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUiStore } from '../../hooks';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  ReactModal.setAppElement('#root');

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();
  console.log("Valor de isDateModalOpen:", isDateModalOpen);
  const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
      title: 'Marily',
      notes: 'Herrera',
      start: new Date(),
      end: addHours( new Date(), 2),
    });

    const titleClass = useMemo(() => {
      if ( !formSubmitted ) return '';

      return ( formValues.title.length > 0 )
        ? ''
        : 'is-invalid';
    }, [formValues.title, formSubmitted])

    const onInputChanged = ({ target }) => {
      setFormValues({
        ...formValues,
        [target.name]: target.value
      })
    }

    const onDateChanged = ( event, changing ) => {
      setFormValues({
        ...formValues,
        [changing]: event
      })
    }

    const onCloseModal = () => {
        console.log('cerrando modal');
        closeDateModal()
    }

  return (
    <ReactModal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
        >

          <h1> Nuevo evento </h1>
          <hr />
          <form className="container">

              <div className="form-group mb-2">
                  <label>Fecha y hora inicio</label>
                  <DatePicker
                    selected={ formValues.start }
                    onChange={ (event) => onDateChanged( event, 'start')}
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                  />
              </div>

              <div className="form-group mb-2">
                  <label>Fecha y hora fin</label>
                  <DatePicker
                    minDate={ formValues.start }
                    selected={ formValues.end }
                    onChange={ (event) => onDateChanged( event, 'end')}
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                  />
              </div>

              <hr />
              <div className="form-group mb-2">
                  <label>Titulo y notas</label>
                  <input 
                      type="text" 
                      className="form-control"
                      placeholder="Título del evento"
                      name="title"
                      autoComplete="off"
                      value={ formValues.title }
                      onChange={ onInputChanged }
                  />
                  <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
              </div>

              <div className="form-group mb-2">
                  <textarea 
                      type="text" 
                      className="form-control"
                      placeholder="Notas"
                      rows="5"
                      name="notes"
                      value={ formValues.notes }
                      onChange={ onInputChanged }
                  ></textarea>
                  <small id="emailHelp" className="form-text text-muted">Información adicional</small>
              </div>

              <button
                  type="submit"
                  className="btn btn-outline-primary btn-block"
              >
                  <i className="far fa-save"></i>
                  <span> Guardar</span>
              </button>

          </form>

    </ReactModal>
  )
}
