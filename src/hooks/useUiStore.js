//customhooks to manage and dispatch shares

import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isDateModalOpen
    } = useSelector( state => state.ui );

    const openDateModal = () => {
        console.log("intentando abrir el modal")
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        console.log("intentando cerrar el modal")
        dispatch( onCloseDateModal() )
    }

    return {
        //* properties
        isDateModalOpen,


        //* Methods
        openDateModal,
        closeDateModal,
    }
}