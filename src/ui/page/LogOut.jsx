import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
const LogOut = (props) => {
    const dispatch=useDispatch()
    useEffect(()=>{
        localStorage.removeItem('token')
        dispatch({type:'removeUser',payload:{}})
        props.history.replace('/')
    },[props.history.replace])
    return null
}
 
export default withRouter(LogOut);