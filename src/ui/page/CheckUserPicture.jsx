import { Button, Avatar, TextField,Checkbox } from '@material-ui/core';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import moment from 'jalali-moment';
import { Redirect } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleCheckUserImage } from 'redux/action/user';
import { handleGetSingleExam } from './../../redux/action/exam/index';
import { withRouter } from 'react-router-dom';


const CheckUserPicture = (props) => {
    const webcamRef = useRef(null);
    const user=useSelector(state=>state.User)
    const [flag, setflag] = useState(null)
    let imageSrc = 'dsa'
    const capture = React.useCallback(
        () => {
            imageSrc = webcamRef.current.getScreenshot();
            setflag(imageSrc)
            toast.info('عکس برداشت شده را در قسمت زیر مشاهده می کنید در صورت اطمینان از درستی عکس آن را برای تطابقت با عکس پروفایل خود به سمت سرور ارسال کنید', { position: 'top-right', autoClose: 9000, style: { width: 650, height: 100, fontSize: 18 } })
        },
        [webcamRef]
    );
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleGetSingleExam(props.match.params.exam_id))
    }, [])
    const exam = useSelector(state => state.Exam)
    const time = useSelector(state => state.Time)
    const [check,setCheck]=useState(false)
    return (
        <>
            {Number(moment().locale('fa').format('YYYYMMDDHHmm')) > Number(`${time.year}${time.month}${time.day}${time.end}`) || Number(moment().locale('fa').format('YYYYMMDDHHmm')) < Number(`${time.year}${time.month}${time.day}${time.hour}${time.min}`) ? (
                <Redirect to='/' />

            ) : (
                <div>
                    <div style={{ direction: 'ltr', marginTop: 15, marginLeft: 10 }}>
                        <Button variant='contained' color='secondary' style={{ direction: 'rtl', borderRadius: 100 }}>
                            بازگشت به عقب
                        </Button>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        {flag !== null ? (
                            <Avatar alt="Remy Sharp" src={flag} style={{ width: 300, height: 300, marginRight: 'auto', marginLeft: 'auto' }} />
                        ) : (<Webcam style={{ width: '35%' }} screenshotFormat="image/jpeg" ref={webcamRef} />)}
                    </div>
                    {flag !== null ? (
                        <>
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                if(check){
                                    dispatch(handleCheckUserImage(flag, exam._id, props.history.replace,true,user.image)) 
                                }else{
                                    toast.warning('لطفا تیک تایید عکس گرفته شده را فعال کنید',{position:'top-right',autoClose:'5000'})
                                }
                            }}>
                                <div style={{marginTop:10,display:'flex',flexDirection:'row',justifyContent:'center', marginBottom: 10 }}>
                                    <Checkbox color="success" onChange={()=>{setCheck(true)}}/>
                                    <i style={{fontSize:15,fontStyle:'italic',marginTop:10}}>عکس گرقته شده مورد تایید شما می باشد</i>
                                </div>
                                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                                    <Button onClick={() => { setflag(null) }} 
                                        style={{ borderRadius: 20, width: '30%', marginTop: 10, fontSize: 20, padding: 10 }} variant='contained' color='secondary'>
                                        گرفتن عکس مجدد
                                    </Button>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Button onClick={() => {
                                        if(check){
                                            dispatch(handleCheckUserImage(flag, exam._id, props.history.replace,false,user.image)) 
                                        }else{
                                            toast.warning('لطفا تیک تایید عکس گرفته شده را فعال کنید',{position:'top-right',autoClose:'5000'})
                                        }
                                    }} style={{ borderRadius: 20, width: '30%', marginTop: 10, fontSize: 20, padding: 10 }} variant='contained' color='primary'>
                                        تطابقت عکس
                                    </Button>
                                </div>
                                <Button hidden type='submit'/>
                            </form>
                        </>
                    ) :
                        <div style={{ textAlign: 'center' }}>
                            <Button onClick={capture} style={{ marginTop: 10, borderRadius: 20, width: '30%', fontSize: 20, padding: 10 }} variant='contained' color='secondary'>
                                گرفتن عکس
                            </Button>
                        </div>
                    }
                    <ToastContainer />
                </div>
            )}
        </>
    );
}

export default withRouter(CheckUserPicture);
