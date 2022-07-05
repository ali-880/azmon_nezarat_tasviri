import React from 'react'
import { withRouter, useParams } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DeleteIcon from '@material-ui/icons/Delete';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client'
import { handleGetSingleExam } from './../../redux/action/exam/index';
import { Container, Paper, Typography, Button, Avatar, Popover, makeStyles, IconButton, TextField } from '@material-ui/core';
import { handleSendResult } from 'redux/action/exam';
import { toast, ToastContainer } from 'react-toastify';
import Timer from './../component/Timer';
import { Redirect } from 'react-router';
import moment from 'jalali-moment';
import { Store } from './../../redux/store/index';
import ChatIcon from '@material-ui/icons/Chat';
import { handleSetOneQuestion } from 'redux/action/user';
import { handleGetstudentChat } from 'redux/action/chatPage';
import { configUrl } from 'Costume/Url';
const useStyle = makeStyles((theme) => {
    return {
        paperBody: {
            padding: 10,
            height: '60vh',
            borderRadius: 13,
            width: '100%',
            overflowY: 'scroll',
            marginTop: 10
        },
        file: {
            wordBreak: 'break-all',
            textOverflow: 'clip',
            whiteSpace: 'normal',
            width: 'max-content',
            maxWidth: '70%',
            marginBottom: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
        },
        fileLink: {
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            textDecoration: 'none',
            color: 'black'
        },
        fileBody: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#bdc3c7',
            borderRadius: 6,
            padding: 15
        },
        otherMessage: {
            marginLeft: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        paperBodys: {
            padding: 10,
            height: '60vh',
            borderRadius: 13,
            width: '90%',
            overflowY: 'scroll',
            marginTop: 10
        },
    }
})
const Exam = (props) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const question = useSelector(state => state.Question)
    const [messageChatTeacher, setMessageChatTeacher] = useState('')
    const Questions = useSelector(state => state.Questions)
    const course = useSelector(state => state.LssonsChatPage)
    const user = useSelector(state => state.User)
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false)
    const chatWithTeacher = useSelector(state => state.chatWithTeacher)


    setTimeout(() => {
        setFlag(true)
    }, 1000);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const openPopover = Boolean(anchorEl);
    useEffect(() => {
        dispatch(handleGetSingleExam(props.match.params.exam_id))
        setTimeout(() => {
            let indexNum1 = 0
            if (!localStorage.getItem(`${Store.getState().Exam._id}`)) {
                localStorage.setItem(`${Store.getState().Exam._id}`, Number(indexNum1))
                dispatch(handleSetOneQuestion(indexNum1))
            } else {
                indexNum1 = localStorage.getItem(`${Store.getState().Exam._id}`)
                dispatch(handleSetOneQuestion(indexNum1))
            }
        }, 1000);
    }, [dispatch, props.match.params.exam_id])
    const exam = useSelector(state => state.Exam)
    const time = useSelector(state => state.Time)
    const indexLocal = localStorage.getItem(exam._id)

    const socket = useRef(useMemo(() => {
        // https://testfornodealireza.ir/
        // http://localhost:4000/socket
        return io.connect('https://alirezadaneshgahsku.ir/socket', { transports: ['websocket'] })
    }, []))
    useEffect(() => {
        socket.current.on('handleSendMessageForTeacher', (data) => {
            Store.dispatch({ type: 'handleSendMessageForTeacher', payload: [...Store.getState().chatWithTeacher, data] })
        })
        socket.current.on('handleDeleteTeacherChat', async (data) => {
            const msg = [...Store.getState().chatWithTeacher];
            const new_data = msg.filter((item) => item._id !== data);
            await Store.dispatch({ type: 'handleDeleteTeacherChat', payload: [...new_data] })
        })
    }, [])

    const handleDeleteTeacherChat = (data, user_sel) => {
        socket.current.emit('handleDeleteTeacherChat', { lesson: course._id, user: user_sel, msg_id: data })
    }

    const handleSendMessageForTeacher = (user_select) => {
        if (messageChatTeacher !== '') {
            const New_message = {
                sender: user._id,
                name: `${user.name} ${user.lastName}`,
                type: 'text',
                text: messageChatTeacher,
                image: user.image,
                time: moment().locale('fa').format('hh:mm:ss__YYYY/MM/D')
            }
            socket.current.emit('handleSendMessageForTeacherExamSection', { student: user_select, message: New_message, lesson: course._id, exam: exam._id })
            setMessageChatTeacher('')

        } else {
            toast.warning('پیام خالی فرستاده نمی شود', { position: 'top-right' })
        }
    }
    const interval = setInterval(() => {
        props.history.replace(`/user/checkPicture/${exam._id}`)
        clearInterval(interval)
    }, 15000);

    useEffect(() => {
        const searches = props.location.search
        const arrayData = searches.split('')
        console.log(arrayData);
        if (arrayData[3] == 'F') {
            let falseNumber = 0;
            if (localStorage.getItem('falseNumber')) {
                falseNumber = Number(localStorage.getItem('falseNumber'))
            }
            console.log(falseNumber);
            if (falseNumber + 1 >= 2) {
                localStorage.setItem('falseNumber', falseNumber + 1)
                props.history.replace('/')
            } else {
                localStorage.setItem('falseNumber', falseNumber + 1)
                toast.warning('عکس شما با عکس موجود در سامانه تطابقت ندارد در صورتی که عدم تطابقت تکرار شود از صفحه ی امتحان خارج می شوید ', { position: 'top-right', autoClose: 5000 })
            }
        }
    }, [props.location.search])
    return (
        <>
            {Number(moment().locale('fa').format('YYYYMMDDHHmm')) > Number(`${time.year}${time.month}${time.day}${time.end}`) || Number(moment().locale('fa').format('YYYYMMDDHHmm')) < Number(`${time.year}${time.month}${time.day}${time.hour}${time.min}`) ? (
                <Redirect to='/' />
            ) : (
                (
                    <div>
                        <Container>
                            <Paper style={{ marginTop: 15, padding: 15, backgroundColor: '#3498db' }}>
                                <Typography style={{ textAlign: 'center' }} variant='h5'>
                                    نام امتحان : {exam.name}
                                </Typography>
                                <Typography style={{ textAlign: 'center' }} variant='body1'>
                                    زمان امتحان : {30}
                                </Typography>
                            </Paper>
                            {flag ? (
                                <div style={{ marginTop: 20, marginBottom: 10 }}>
                                    <Timer end={exam.end} />
                                </div>
                            ) : null}
                            <div >
                                {question.type === 'test' ? (
                                    <Paper style={{ padding: 15, borderRadius: 8, paddingRight: 20, marginTop: 20, marginBottom: 20 }}>
                                        <Typography variant='body1' style={{ marginBottom: 15 }}>
                                            {indexLocal + 1} : {question.text}
                                        </Typography>
                                        <RadioGroup onChange={(event) => {
                                            let val = [...data];
                                            val[indexLocal] = event.target.value
                                            setData(val)
                                        }} >
                                            {question.testResults.map((item) => (
                                                <FormControlLabel key={item._id} value={item.text} control={<Radio />} label={item.text} />
                                            ))}
                                        </RadioGroup>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                                            <Button onClick={() => { dispatch(handleSendResult(data[indexLocal], Number(indexLocal), exam._id, question.type)) }} variant='contained' color='secondary'>ثبت</Button>
                                        </div>
                                    </Paper>
                                ) : question.type === 'text' ? (
                                    <Paper style={{ padding: 15, borderRadius: 8, paddingRight: 20, marginTop: 20, marginBottom: 20 }}>
                                        <Typography variant='body1' style={{ marginBottom: 15 }}>
                                            {indexLocal + 1} : {question.text}
                                        </Typography>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            onReady={editor => {
                                                editor.ui.getEditableElement().parentElement.insertBefore(
                                                    editor.ui.view.toolbar.element,
                                                    editor.ui.getEditableElement()
                                                )
                                            }}
                                            config={{
                                                contentsLangDirection: 'rtl',
                                                language: 'fa',
                                            }}
                                            onChange={(event, editor) => {
                                                const data1 = editor.getData()
                                                const val = [...data]
                                                val[indexLocal] = data1
                                                setData(val)
                                            }}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                                            <Button onClick={() => { dispatch(handleSendResult(data[indexLocal], Number(indexLocal), exam._id, question.type)) }} variant='contained' color='secondary'>ثبت</Button>
                                        </div>

                                    </Paper>
                                ) : question.type === 'file' ? (
                                    <Paper style={{ padding: 15, borderRadius: 8, paddingRight: 20, marginTop: 20, marginBottom: 20 }}>
                                        <Typography variant='body1' style={{ marginBottom: 15 }}>
                                            {indexLocal + 1} : {question.text}
                                        </Typography>
                                        <label htmlFor="upload-photo">
                                            <input
                                                style={{ display: 'none' }}
                                                id="upload-photo"
                                                name="upload-photo"
                                                onChange={(event) => {
                                                    const val = [...data];
                                                    val[indexLocal] = event.target.files[0]
                                                    setData(val)
                                                }}
                                                type="file"
                                            />
                                            <Button color="secondary" variant="contained" component="span">
                                                آپلود فایل
                                            </Button>
                                        </label>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                                            <Button onClick={() => { dispatch(handleSendResult(data[indexLocal], Number(indexLocal), exam._id, question.type)) }} variant='contained' color='secondary'>ثبت</Button>
                                        </div>
                                    </Paper>
                                ) : null}
                            </div>
                            {Number(localStorage.getItem(`${exam._id}`)) + 1 === Questions.length ?
                                (
                                    <Button onClick={() => { props.history.replace('/') }} style={{ display: 'block' }} variant='contained' color='secondary'>اتمام آزمون</Button>
                                ) : (
                                    <Button onClick={() => {
                                        localStorage.setItem(`${exam._id}`, Number(indexLocal) + 1)
                                        dispatch(handleSetOneQuestion(Number(indexLocal) + 1))
                                    }} style={{ display: 'block' }} variant='contained' color='secondary'>سوال بعدی</Button>
                                )}
                            <Button style={{ marginBottom: 60, marginTop: 20 }} onClick={() => { props.history.push('/') }} variant='contained' color='primary'>ثبت و ارسال نهایی</Button>
                        </Container>
                        <div style={{ position: 'absolute', right: '0', bottom: '0' }}>
                            {user.role == 'teacher' ? null : (
                                <Button onClick={(event) => {
                                    handleClick(event)
                                    dispatch(handleGetstudentChat(course._id, user._id))
                                    socket.current.emit('joinChatWithTeacher', { user: user._id, lesson: course._id })
                                }} style={{ padding: 10, marginRight: 20, marginBottom: 20, backgroundColor: 'silver' }}>
                                    <ChatIcon style={{ color: 'black' }} />
                                    <p style={{ marginRight: 10 }}>چت با دبیر درس</p>

                                </Button>
                            )}
                        </div>
                        <ToastContainer />
                        <Popover
                            open={openPopover}
                            anchorEl={anchorEl}
                            onClose={handleClosePopover}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <div style={{ padding: 10 }}>
                                <div style={{ backgroundColor: 'white', paddingTop: 10, width: 400 }}>
                                    <div className={classes.body}>
                                        <Paper elevation={3} className={classes.paperBodys}>
                                            {chatWithTeacher.map((item) => (
                                                <div key={item._id}>
                                                    {item.sender === user._id ? item.type === 'file' ? (
                                                        <div className={classes.file}>
                                                            <div className={classes.fileBody}>
                                                                <a target='_blank' rel="noopener noreferrer" href={`${configUrl.img}/file/${item.text}`} className={classes.fileLink}>
                                                                    <ArrowDownwardIcon />
                                                                    <Typography style={{ marginRight: 10 }} variant='subtitle1'>{item.fileName}</Typography>
                                                                </a>
                                                                <IconButton onClick={() => { handleDeleteTeacherChat(item._id, user._id) }} style={{ marginRight: 15 }}>
                                                                    <DeleteIcon fontSize='small' />
                                                                </IconButton>
                                                            </div>
                                                            <i style={{ fontStyle: 'italic', marginTop: 3 }}>{item.time}</i>
                                                        </div>
                                                    ) : (
                                                        <div className={classes.file}>
                                                            <div className={classes.fileBody}>
                                                                <Typography style={{ marginTop: 5 }} variant='subtitle1'>
                                                                    {item.text}
                                                                </Typography>
                                                                <IconButton onClick={() => { handleDeleteTeacherChat(item._id, user._id) }} style={{ marginRight: 15 }}>
                                                                    <DeleteIcon fontSize='small' />
                                                                </IconButton>
                                                            </div>
                                                            <i style={{ fontStyle: 'italic', marginTop: 3 }}>{item.time}</i>
                                                        </div>
                                                    ) : item.type === 'file' ? (
                                                        <div key={item._id} className={classes.otherMessage}>
                                                            <div style={{ width: 'max-content', marginBottom: 25 }}>
                                                                <i style={{ fontSize: 13 }}>{item.name}</i>
                                                                <div style={{ marginTop: 5, backgroundColor: '#686de0', borderRadius: 6, padding: 15 }}>
                                                                    <a target='_blank' rel="noopener noreferrer" href={`${configUrl.img}/file/${item.text}`} className={classes.fileLink}>
                                                                        <ArrowDownwardIcon />
                                                                        <Typography style={{ marginRight: 10 }} variant='subtitle1'>{item.fileName}</Typography>
                                                                    </a>
                                                                </div>
                                                                <i style={{ fontStyle: 'italic', marginLeft: 'auto', marginTop: 5 }}>{item.time}</i>
                                                            </div>
                                                            <Avatar style={{ marginRight: 15, marginTop: 30 }} src={`https://alirezadaneshgahsku.ir/user/${item.image}`} />
                                                        </div>
                                                    ) : (
                                                        <div key={item._id} className={classes.otherMessage}>
                                                            <div style={{ width: 'max-content', marginBottom: 25 }}>
                                                                <i style={{ fontSize: 13 }}>{item.name}</i>
                                                                <div style={{ marginTop: 5, backgroundColor: '#686de0', borderRadius: 6, padding: 15 }}>
                                                                    <Typography variant='subtitle1'>{item.text}</Typography>

                                                                </div>
                                                                <i style={{ fontStyle: 'italic', marginLeft: 'auto', marginTop: 5 }}>{item.time}</i>
                                                            </div>
                                                            <Avatar style={{ marginRight: 15, marginTop: 30 }} src={`https://alirezadaneshgahsku.ir/user/${item.image}`} />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </Paper>
                                        <TextField value={messageChatTeacher} onChange={(event) => { setMessageChatTeacher(event.target.value) }} style={{ width: '60%', marginRight: 10, marginTop: 10, marginBottom: 10 }} variant='outlined' label='متن خود را وارد کنید' />
                                        <Button onClick={() => { handleSendMessageForTeacher(user._id) }} variant='contained' color='primary' style={{ marginTop: 20, marginRight: 20 }}>ارسال</Button>
                                    </div>
                                </div>
                            </div>
                        </Popover>
                    </div>
                )
            )}
        </>
    );
}
export default withRouter(Exam);