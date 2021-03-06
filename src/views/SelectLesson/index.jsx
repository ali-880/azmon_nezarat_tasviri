import { Backdrop, Button, Divider, Fade, makeStyles, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import Card from './../../components/Card/Card';
import CardHeader from './../../components/Card/CardHeader';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import CardBody from './../../components/Card/CardBody';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { handleStudentGetLessons, handleDeleteStudentCourse } from './../../redux/action/student/index';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { handleGetLessonForUser } from 'redux/action/student';
import { Helmet } from 'react-helmet';
const useStyle = makeStyles((theme) => {
    return {
        ...styles,
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(0, 4, 3),
          },
        root: {
            marginRight: 'auto',
            marginLeft: 'auto',
            width: '75%',
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            }
        },
        cardBody: {
            padding: 15,
            marginTop: 20,
        },
        form: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20
        },
        btn: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        conTable: {
            padding: 10,
            marginTop: 20
        },
        btn1: {
            fontSize: 17,
            padding: 10
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }
})
const validator = yup.object({
    studentNumber:yup.string().min(9,'?????????? ???????????????? ???????? ?????????? 9 ?????????????? ????????').max(9,'?????????? ???????????????? ???????? ?????????? 9 ?????????????? ????????').required('???????? ???????? ?????? ???????? ???????????? ??????'),
})
const valide = yup.object({
    code: yup.string().min(6, '???? ???? ?????? ?????????? ?????? ?????????????? ???? ????????').max(6, '???? ???? ?????? ?????????? ?????? ?????????????? ???? ????????').required('???????? ???????? ?????? ???????? ???????????? ??????'),
})
const SelectLesson = () => {
    const courses = useSelector(state => state.StudentCourses)
    const classes = useStyle()
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [student,setstudent]=useState('');
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <div>
            <Helmet>
                <title>???????????? ????????</title>
            </Helmet>
            <div className={classes.root}>
                <Card>
                    <CardHeader color='primary'>
                        <h4 className={classes.cardTitleWhite}>???????????? ????????</h4>
                        <p className={classes.cardCategoryWhite}>
                            ?????? ???? ???????????? ???? ???????? ???????? ?????????? ???????????????? ?????????????? ???????? ?????? ?????? ???????? ???????? ???? ???? ???????????? ???????? ?? ???? ???????? ???????? ???????? ???? ?????? ???? ?????????? ????????
                        </p>
                    </CardHeader>
                    <CardBody className={classes.cardBody}>
                        <Formik
                            initialValues={{ studentNumber: '' }}
                            onSubmit={(values) => {
                                dispatch(handleStudentGetLessons(values.studentNumber))
                                setstudent(values.studentNumber)
                            }}
                            validationSchema={validator}
                        >
                            {({ handleSubmit, handleChange, errors, handleBlur, touched }) => (
                                <>
                                    <div className={classes.form}>
                                        <Typography variant='subtitle1'>?????????? ???????????????? : </Typography>
                                        <TextField onBlur={handleBlur('studentNumber')} onChange={handleChange('studentNumber')} variant='outlined' style={{ flexGrow: 0.9 }} placeholder='?????????? ???????????????? ?????? ???? ???????? ????????' />
                                    </div>
                                    {errors.studentNumber && touched.studentNumber ? (<i style={{ fontFamily: 'BYekan', color: '#e74c3c', fontStyle: 'italic' }}>{errors.studentNumber}</i>) : null}
                                    <div className={classes.btn}>
                                        <Button onClick={handleSubmit} style={{ width: '50%' }} variant='contained' color='primary'>?????????? ????????</Button>
                                    </div>
                                </>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </div>
            <Divider style={{ backgroundColor: 'black', marginBottom: 10 }} />
            <Button onClick={handleOpen} className={classes.btn1} variant='contained' color='primary'>???????????? ?????? ???????? ????????????</Button>
            {courses.length ? (
                <div>
                    <Paper className={classes.conTable}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>???? ?????? </TableCell>
                                    <TableCell align='center'>?????? ??????</TableCell>
                                    <TableCell align='center'>?????????? ??????</TableCell>
                                    <TableCell align='center'>??????</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell align='center'>{item.name}</TableCell>
                                        <TableCell align='center'>{item.code}</TableCell>
                                        <TableCell align='center'>{item.teacher.name}</TableCell>
                                        <TableCell align='center'><Button onClick={()=>{dispatch(handleDeleteStudentCourse(student,item.code))}} variant='contained' color='primary'>?????? ??????</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            ) : null}
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 1000,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h3 id="spring-modal-title" style={{textAlign:'center'}}>?????????? ??????</h3>
                        <p id="spring-modal-description">???? ???????? ???????? ???? ?????? , ?????? ???????? ???????????? ???? ???? ???????? ???????? ???????????? ?????????? ????????</p>
                        <Formik
                            initialValues={{code:''}}
                            onSubmit={(values)=>{
                                const data={...values,studentNumber:student}
                                dispatch(handleGetLessonForUser(data))
                                handleClose()
                            }}
                            validationSchema={valide}
                        >
                            {({errors,handleChange,handleBlur,handleSubmit,touched})=>(
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    <TextField onChange={handleChange('code')} onBlur={handleBlur('code')} style={{width:'60%',marginRight:'auto',marginLeft:'auto'}} variant='outlined' label='???? ??????.......'/>
                                    {errors.code && touched.code ? (<i style={{ fontFamily: 'BYekan', color: '#e74c3c', fontStyle: 'italic' }}>{errors.code}</i>) : null}
                                    <Button onClick={handleSubmit} style={{marginTop:20}} variant='contained' color='primary'>???????????? ??????</Button>
                                </div>
                            )}
                        </Formik>
                    </div>
                </Fade>
            </Modal>
            <ToastContainer />
        </div>
    );
}
export default SelectLesson;