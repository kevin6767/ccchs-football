import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RosterAddorUpdate } from '../roster-add-or-update/roster-add-or-update';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const TransitionsModal = ({open, handleClose, updatedPlayer, handleUpdate, setUpdatedPlayer, handleUpdateSubmit, update}) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <RosterAddorUpdate update={update} handleUpdateSubmit={handleUpdateSubmit} handleClose={handleClose} updatedPlayer={updatedPlayer} handleUpdate={handleUpdate} setUpdatedPlayer={setUpdatedPlayer} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
