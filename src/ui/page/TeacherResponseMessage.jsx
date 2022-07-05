import React from 'react';
import { useEffect, useRef, useMemo, useState } from 'react';
import io from 'socket.io-client'
import { Store } from 'redux/store';
import { withRouter } from 'react-router-dom';
import moment from 'jalali-moment';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Typography, Avatar, Button, Container, Paper, Divider, TextField } from '@material-ui/core';
import { handleGetSingleExam } from './../../redux/action/exam/index';
import { Redirect } from 'react-router';
import Timer from './../component/Timer';
import ModalExams from './../Teacher/component/ModalCostumExams';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Alert from '@material-ui/lab/Alert';
const useStyle = makeStyles((item) => {
    return {
        otherMessage: {
            marginLeft: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
    }
})
const TeacherResponseMessages = (props) => {
    const socket = useRef(useMemo(() => {
        // https://testfornodealireza.ir/
        // http://localhost:4000/socket
        return io.connect('https://alirezadaneshgahsku.ir/socket', { transports: ['websocket'] })
    }, []))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(handleGetSingleExam(props.match.params.exam_id))
    }, [props.match.params.exam_id])

    const exam = useSelector(state => state.Exam)
    const course = useSelector(state => state.LssonsChatPage)
    const time = useSelector(state => state.Time)
    const user = useSelector(state => state.User)
    const Questions = useSelector(state => state.Questions)
    const audio = useMemo(() => new Audio(process.env.PUBLIC_URL + '/img/RingtoneGram.IR_1615879916_17810.mp3'), []);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        playing ? audio.play() : audio.pause();

        audio.addEventListener('ended', () => setPlaying(false));

    }, [playing]);
    useEffect(() => {
        socket.current.emit('joinTeacherCahtWithStudent', { exam: props.match.params.exam_id })
        if (localStorage.getItem(`message${props.match.params.exam_id}`)) {
            let response = JSON.parse(localStorage.getItem(`message${props.match.params.exam_id}`))
            dispatch({ type: 'handleGetTeacherMessageFromStudent', payload: [...response] })
        }
        socket.current.on('handleGetTeacherMessageFromStudent', async (data) => {
            if (data.sender !== user._id) {
                localStorage.setItem(`message${Store.getState().Exam._id}`, JSON.stringify([data, ...Store.getState().TeacherMessage]))
                Store.dispatch({ type: 'handleGetTeacherMessageFromStudent', payload: [data, ...Store.getState().TeacherMessage] })
            }
        })
    }, [])

    useEffect(() => {
        socket.current.on('musicForSms', (data) => {
            if (data !== user._id) {
                setPlaying(true)
            }
        })

    }, [])
    const massages = useSelector(state => state.TeacherMessage)
    const [model, SetModel] = useState(false)
    const [userSelect, SetUser] = useState('')
    const [text, setText] = useState('')
    const [flag, setFlag] = useState(false)
    setTimeout(() => {
        setFlag(true)
    }, 1000);
    const classes = useStyle()
    const handleMessageToUser = (userSel) => {
        if (Text !== '') {
            const New_message = {
                sender: user._id,
                name: `${user.name} ${user.lastName}`,
                type: 'text',
                text: text,
                image: user.image,
                time: moment().locale('fa').format('hh:mm:ss__YYYY/MM/D')
            }
            socket.current.emit('handleSendMessageForTeacherExamSection', { student: userSelect, message: New_message, lesson: course._id, exam: exam._id })
            setText('')
            toast.success('پاسخ شما با موفقیت برای دانشجو ارسال شود')
        } else {
            toast.warning('پیام خالی فرستاده نمی شود', { position: 'top-right' })
        }
    }
    return (
        <>
            {Number(moment().locale('fa').format('YYYYMMDDHHmm')) > Number(`${time.year}${time.month}${time.day}${time.end}`) || Number(moment().locale('fa').format('YYYYMMDDHHmm')) < Number(`${time.year}${time.month}${time.day}${time.hour}${time.min}`)
                ? (
                    <Redirect to='/' />
                ) : (
                    <Container>
                        <Paper style={{ backgroundColor: '#3498db', padding: 20, borderRadius: 20, marginTop: 15 }}>
                            <Typography variant='h6' style={{ textAlign: 'center' }}>{`پیام ها ی دریافتی در زمان آزمون ${exam.name} توسط دانشجویان`}</Typography>
                        </Paper>
                        {flag ? (
                            <div style={{ marginTop: 20, marginBottom: 10 }}>
                                <Timer end={exam.end} />
                            </div>
                        ) : null}
                        <Typography variant='h5' style={{ marginTop: 15, marginBottom: 10 }}>سوالات آزمون</Typography>
                        {Questions.map((item, index) => (
                            <Typography key={item._id} style={{ marginRight: 30, marginTop: 10 }}>
                                {`${index + 1} _ ${item.text} _ نمره ی سوال (${item.score})`}
                            </Typography>
                        ))}
                        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                        {massages.length ? (
                            <>
                                {massages.map((item) => (
                                    <div style={{ width: '100%', backgroundColor: 'white', marginTop: 10, marginBottom: 15, padding: 15, border: '1px solid black' }} key={item._id}>
                                        <Typography variant='subtitle1'>{item.name}</Typography>
                                        <Typography style={{ marginRight: 15, marginTop: 10, marginBottom: 10 }} variant='h6'>{item.text}</Typography>
                                        <Button variant='contained' color='primary' onClick={() => {
                                            SetModel(true)
                                            SetUser(item.sender)
                                            setText('')
                                        }}>پاسخ</Button>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <Alert severity='info' style={{backgroundColor:'#74b9ff'}}>شما هنوز هیچ پیامی از سمت دانشجویان خود دریافت نکرده اید</Alert>
                        )}
                        <ModalExams open={model} handleClose={() => { SetModel(false) }}>
                            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                                <Typography variant='h6'>
                                    پاسخ به پیام دانشجو
                                </Typography>
                                <TextField style={{ width: 480, marginTop: 20, marginBottom: 20 }} variant='outlined' label='متن پیام' onChange={(event) => { setText(event.target.value) }} />
                                <Button variant='contained' color='primary' onClick={() => {
                                    handleMessageToUser(userSelect, text)
                                    setText('')
                                    SetModel(false)
                                }}>ارسال پیام</Button>
                            </div>
                        </ModalExams>
                    </Container>
                )}
            <ToastContainer />
        </>
    );
}
export default withRouter(TeacherResponseMessages);
