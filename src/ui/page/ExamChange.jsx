import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Markup } from 'interweave'
import { Typography, TextField, Button, makeStyles, Avatar, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { handleGetUserResponse } from './../../redux/action/teacher/index';
import { TableHead, Table, TableCell } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import CostumeModal from './chatPage/component/modal';
import { configUrl } from './../../Costume/Url';
import { handleGetOneExamForAddQues } from 'redux/action/exam';
import { Store } from './../../redux/store/index';
import lodash from 'lodash'
import Alert from '@material-ui/lab/Alert';
const useStyle = makeStyles((theme) => {
    return {
        input: {
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
                marginTop: 20
            },
            [theme.breakpoints.up('md')]: {
                display: 'flex',
                flexDirection: 'row',
                marginTop: 20
            },
        },
        textFeild: {
            [theme.breakpoints.down('sm')]: {
                marginLeft: 30,
                width: '80%',
                marginBottom: 20
            },

            [theme.breakpoints.only('md')]: {
                marginLeft: 60,
                width: '60%'
            },
            [theme.breakpoints.up('lg')]: {
                marginLeft: 60,
                width: '30%'
            },
        },
        btn: {
            [theme.breakpoints.down('sm')]: {
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            marginLeft: 10
        },
        table: {
            [theme.breakpoints.down('sm')]: {
                width: '90%',
                marginLeft: 10,
                marginTop: 30
            },
            [theme.breakpoints.up('lg')]: {
                width: '40%',
                marginLeft: 70,
                marginTop: 30
            },
            [theme.breakpoints.only('md')]: {
                width: '50%',
                marginLeft: 70,
                marginTop: 30
            },
        }
    }
})
const ExamChange = (props) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!Store.getState().Response.length) {
            dispatch({ type: 'EmptyResponse', payload: [] })
        }
        dispatch(handleGetOneExamForAddQues(props.match.params.exam_id, props.history.goBack))
    }, [dispatch, props.match.params.exam_id])
    const questions = useSelector(state => state.Questions)
    const responses = useSelector(state => state.Response)
    const Exam = useSelector(state => state.Exam)
    const Photo = useSelector(state => state.Photo)
    const UserSelect = useSelector(state => state.UserSelect)
    const [studentNumber, setStudentNumber] = useState()
    const [ResultUser, setResult] = useState()
    let i = 1

    const classes = useStyle()
    return (
        <>
            <Typography variant='h5' color='primary' style={{ textAlign: 'center', marginBottom: 10, marginTop: 15, marginRight: 25 }}>
                امتحان : {Exam.name}
            </Typography>
            <Typography variant='h6' color='primary' style={{ marginTop: 10, marginRight: 25 }}>
                سوالات امتحان
            </Typography>
            <div style={{ marginRight: 60, marginLeft: 60, marginTop: 10, border: '1px solid black', padding: 10 }}>
                {questions.map((item) => (
                    <Typography key={item._id} style={{ marginTop: 10 }}>
                        {`${i++} - ${item.text} (${item.type === 'file' ? "فایل" : item.type === 'text' ? "متنی" : "چهار گزینه ای"}) (${item.score} نمره)`}
                    </Typography>
                ))}
            </div>
            <Typography variant='h6' color='primary' style={{ marginTop: 30, marginRight: 25 }}>
                پاسخ ها ی ثبت شده توسط دانشجویان
            </Typography>
            <div className={classes.input}>
                <TextField value={studentNumber} onChange={(event) => { setStudentNumber(event.target.value) }} variant='outlined' label='شماره دانشجویی' className={classes.textFeild} />
                <Button onClick={() => {
                    if(Photo.length){
                        dispatch({type:'removePhoto',payload:[]})
                    }
                    if(responses.length){
                        dispatch({ type: 'EmptyResponse', payload: [] })
                    }
                        dispatch({type:'removeUserSelect',payload:{}})
                    
                    dispatch(handleGetUserResponse(studentNumber, props.match.params.exam_id))
                    setStudentNumber('')
                }}
                    variant='contained' color='primary' className={classes.btn}>مشاهده پاسخ ها ی دانشجو</Button>
            </div>
            <Divider style={{ marginTop: 30, backgroundColor: 'black', height: 2 }} />
            {lodash(UserSelect).isEmpty() ? null : (
                <div>
                    <Typography style={{ marginTop: 10, marginRight: 20, marginBottom: 10 }} variant='h5'>{UserSelect.name} {UserSelect.lastName}</Typography>
                </div>
            )}
            {!responses.length ? lodash(UserSelect).isEmpty() ? (
                <Alert style={{marginTop:10,width:'80%',marginRight:20}} variant='filled' color='warning'>برای نمایش پاسخ های ثبت شده باید شماره ی دانشجوی مورد نطر خود را در قسمت بالا ثبت کنید</Alert>
            ) : (
                <Alert style={{marginTop:10}} variant='filled' color='warning' >این دانشجو هنوز پاسخی برای سوالات امتحان ثبت نکرده است</Alert>
            ) : (
                <div style={{ display: 'block' }}>
                    {Photo.map((item) => (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Avatar style={{ width: 100, height: 100, marginRight: 20 }} src={`${configUrl.img}examUserImage/${Exam._id}/${item}`} />
                        </div>
                    ))}
                </div>
            )}
            {!responses.length ? null : (
                <>
                    <p style={{ marginRight: 20 }}>عکس ثبت شده کاربر در سامانه</p>
                    <div style={{ display: 'block' }}>
                        <Avatar style={{ height: 75, width: 75, marginTop: 20, marginRight: 100 }} src={`${configUrl.img}user/${UserSelect.image}`} />
                    </div>
                </>
            )}
            {responses.length ? (
                <Table className={classes.table}>
                    <TableHead style={{ backgroundColor: 'orange' }}>
                        <TableRow>
                            <TableCell>شماره ی سوال</TableCell>
                            <TableCell>نوع سوال</TableCell>
                            <TableCell>پاسخ ثبت شده</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {responses.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{`سوال  ${item.q_id}`}</TableCell>
                                <TableCell>{item.type === 'text' ? (<p>متنی</p>) : item.type === 'test' ? (<p>تستی</p>) : (<p>فایل</p>)}</TableCell>
                                <TableCell>
                                    <div>
                                        {item.type === 'test' ? (<p>{item.result}</p>) : item.type === 'text' ?
                                            (<Button variant='contained' color='secondary' onClick={() => {
                                                setResult(item.result)
                                                setOpen(true)
                                            }}>مشاهده ی پاسخ</Button>)
                                            :
                                            (<a download target="_blank" rel="noopener noreferrer" href={`${configUrl.img}exam/${Exam._id}/${item.result}`}><Button variant='contained' color='secondary'>دانلود فایل</Button></a>)}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : null}
            <ToastContainer />
            <CostumeModal open={open} setOpen={setOpen}>
                <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', padding: 10, paddingRight: 20, paddingLeft: 20, paddingBottom: 20, width: '400px', border: '2px so;id black' }}>
                    <Typography variant='h5'>
                        پاسخ ثبت شده توسط کاربر
                    </Typography>

                    <Markup content={ResultUser} />
                </div>
            </CostumeModal>
            <ToastContainer />
        </>
    );
}

export default withRouter(ExamChange);