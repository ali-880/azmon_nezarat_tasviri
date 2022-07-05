import React from 'react';
import { ToastContainer } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
const useStyle=makeStyles((theme)=>{
    return{
        root:{
            [theme.breakpoints.down('sm')]: {
                width:'80%'
            },
            [theme.breakpoints.only('md')]: {
                width:'60%'
            },
            width:'40%'
        },
    }
})
const ToastPage = () => {
    const classes=useStyle();
    return ( 
        <ToastContainer
            className={classes.root}
        />
    );
}
 
export default ToastPage;