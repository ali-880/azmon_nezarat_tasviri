import { Modal, Backdrop } from '@material-ui/core';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyle=makeStyles((theme)=>{return{
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}})
const ModalExams = (props) => {
    const classes=useStyle()
    return ( 
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            {props.children}
        </Modal>
    );
}
 
export default ModalExams;