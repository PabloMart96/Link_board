import PropTypes from 'prop-types';
import PopUp from "reactjs-popup";
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/PopUp.css';

export const DeletePopUp = ({ onConfirm }) => {
  return (
    <PopUp
      trigger={
        <IconButton aria-label="Eliminar Publicación">
          <DeleteIcon />
        </IconButton>
      }
      modal
      closeOnDocumentClick
    >
      {(close) => (
        <div className='modal'>
          <h3>Confirmación</h3>
          <p>¿Estás seguro de que quieres eliminar esta publicación?</p>
          <button onClick={() => { onConfirm(); close(); }}>Eliminar</button>
          <button onClick={close}>Cancelar</button>
        </div>
      )}
    </PopUp>
  )
}


DeletePopUp.propTypes = {
  onConfirm: PropTypes.func,
}