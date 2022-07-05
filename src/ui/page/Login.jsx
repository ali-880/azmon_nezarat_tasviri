import { Backdrop, Button, Fade, makeStyles, Modal, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AppbarPage from './../component/Appbar';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from './../../redux/action/user/index';
import { toast, ToastContainer } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import Lodding from 'components/loading';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { configUrl } from './../../Costume/Url';
import ToastPage from 'ui/utils/ToastCostum';
const validator = yup.object({
    password: yup.string().min(6, 'تعداد کاراکتر برای رمز عبور باید بیشتر از شش  تا باشد').max(20, 'تعداد کاراکتر بیش تر از حد مجاز است').required('وارد کردن این فیلد الزامی است'),
    studentNumber: yup.string().min(9, 'شماره دانشجویی باید دارای 9 کاراکتر باشد').max(9, 'شماره دانشجویی باید دارای 9 کاراکتر باشد').required('وارد کردن این فیلد الزامی است'),
})
const validatorPassword = yup.object({
    studentNumber: yup.string().min(6, 'تعداد کاراکتر برای رمز عبور باید بیشتر از شش  تا باشد').max(20, 'تعداد کاراکتر بیش تر از حد مجاز است').required('وارد کردن این فیلد الزامی است'),
    email: yup.string().email('در این قسمت باید یک ایمیل معتبر وارد کنید').required('وارد کردن این فیلد الزامی است')
})
const useStyle = makeStyles((theme) => {
    return {
        root: {
            width: '35%',
            [theme.breakpoints.down('xs')]: {
                width: '80%'
            },
            [theme.breakpoints.only('sm')]: {
                width: '60%'
            },
            [theme.breakpoints.only('md')]: {
                width: '50%'
            },
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 70
        },
        txt: {
            fontWeight: 'bold'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        small: {
            fontSize: 14,
            color: '#546e7a',
            fontFamily: 'BYekan',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 30
        },
        input: {
            marginTop: 30
        },
        btn: {
            padding: 10,
            fontSize: 18,
            marginTop: 25
        }
    }
})
const Login = (props) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const load = useSelector(state => state.Lodding)
    return (
        <div>
            <Helmet>
                <title>صفحه ی ورود</title>
            </Helmet>
            {load ? (
                <Lodding />
            ) : (
                <div>
                    <AppbarPage />
                    <div className={classes.root}>
                        <Typography variant='h5'>ورود به سامانه آزمون انلاین با نظارت تصویری</Typography>
                        <p className={classes.small}>لطفا کیبورد را بر روی زبان انگلیسی قرار دهید زیرا مقادیر فارسی با اطلاعات سامانه تطابقت ندارد</p>
                        <Formik
                            validationSchema={validator}
                            initialValues={{ studentNumber: '', password: '' }}
                            onSubmit={(values) => {
                                dispatch(handleLogin(values, props.history.replace))
                            }}
                        >
                            {({ handleChange, values, errors, handleBlur, touched, handleSubmit }) => (
                                <div className={classes.form}>
                                    <TextField onChange={handleChange('studentNumber')} onBlur={handleBlur('studentNumber')} value={values.studentNumber} className={classes.input} variant='outlined' label='نام کاربری' />
                                    {errors.studentNumber && touched.studentNumber ? (<i style={{ fontSize:14,fontFamily: 'BYekan', color: '#ff3f34', fontStyle: 'italic' }}>{errors.studentNumber}</i>) : null}
                                    <TextField  onBlur={handleBlur('password')} onChange={handleChange('password')} value={values.password} className={classes.input} variant='outlined' label='رمز عبور' />
                                    {errors.password && touched.password ? (<i style={{fontSize:14, fontFamily: 'BYekan', color: '#ff3f34' }}>{errors.password}</i>) : null}
                                    <Button onClick={handleSubmit} className={classes.btn} variant='contained' color='primary'>ورود کاربر</Button>
                                </div>
                            )}
                        </Formik>
                        <Button onClick={() => { setOpen(true) }} variant='outlined' color='primary' style={{ marginTop: 20, width: '30%', fontSize: 17 }}>
                            بازیابی رمز عبور
                        </Button>
                    </div>
                    <Modal
                        className={classes.modal}
                        open={open}
                        onClose={() => { setOpen(false) }}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <h3 id="spring-modal-title">بازیابی رمز عبور</h3>
                                <p id="spring-modal-description">برای بازیابی رمز عبور ، لطفا ایمیل و نام کاربری خود را در قسمت زیر وارد کنید</p>
                                <Formik
                                    initialValues={{email:'',studentNumber:''}}
                                    validationSchema={validatorPassword}
                                    onSubmit={async(values)=>{
                                        try{
                                            await dispatch({type:'setLoddingTrue'})
                                            await axios.post(`${configUrl.url}forgetPassword`,values);
                                            await dispatch({type:'closeLodding'})
                                            toast.success('رمز عبور جدید برای ایمیل وارد شده توسط شما ارسال شود',{position:'top-right',style:{width:350}})
                                            setOpen(false)
                                        }catch(e){
                                            await dispatch({type:'closeLodding'})
                                            setOpen(false)
                                            console.log(e)
                                            toast.error('دانشجویی با این نام کاربری در سامانه ثبت نشده است در صورت اطمینان از درستی نام کاربری خود با مسئول سیستم تماس بگیرید ',{position:'top-right',style:{width:470,height:110}})
                                        }
                                    }}
                                >
                                    {({handleChange,handleSubmit,values,errors,handleBlur,touched}) => (
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <TextField style={{marginTop:15,marginBottom:5}} value={values.studentNumber} onBlur={handleBlur('studentNumber')} onChange={handleChange('studentNumber')} variant='outlined' label='نام کاربری' />
                                            {errors.studentNumber && touched.studentNumber ? (<i style={{ fontSize:13,fontFamily: 'BYekan', color: '#ff3f34', fontStyle: 'italic' }}>{errors.studentNumber}</i>) : null}
                                            <TextField style={{marginTop:15,marginBottom:5}} onBlur={handleBlur('email')} value={values.email} onChange={handleChange('email')} variant='outlined' label='ایمیل' />
                                            {errors.email && touched.email ? (<i style={{ fontSize:13,fontFamily: 'BYekan', color: '#ff3f34', fontStyle: 'italic' }}>{errors.email}</i>) : null}
                                            <Button style={{marginTop:20}} onClick={handleSubmit} variant='contained' color='primary'>
                                                ارسال
                                            </Button>
                                        </div>
                                    )}
                                </Formik>
                            </div>
                        </Fade>
                    </Modal>
                    <ToastPage/>
                </div>
            )}
        </div>
    );
}

export default withRouter(Login);