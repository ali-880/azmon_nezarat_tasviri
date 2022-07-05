import { Avatar, Backdrop, Button, Divider, Fade, Grid, Hidden, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Modal, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { handleGetLessonForChatPage, handleGetstudentChat } from './../../../redux/action/chatPage/index';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import io from 'socket.io-client'
import moment from 'jalali-moment'
import { Store } from './../../../redux/store/index';
import { toast, ToastContainer } from 'react-toastify';
import CostumeModal from './component/modal';
import axios from 'axios';
import { configUrl } from '../../../Costume/Url';
import { handleGetTeacherChat } from 'redux/action/chatPage';
import { Helmet } from 'react-helmet';
const useStyle = makeStyles((theme) => {
    return {
        usersPaper: {
            borderRadius: 10,
            padding: 15,
            height: '85vh',
            overflowY: 'scroll'
        },
        root: {
            width: '95%',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 20,
        },
        title: {
            textAlign: 'center',
            marginBottom: 5
        },
        divider: {
            backgroundColor: 'black'
        },
        rootList: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        chatMain: {
            marginRight: 'auto',
            marginLeft: 'auto'
        },
        header: {
            width: '100%',
            padding: 10,
            backgroundColor: '#34ace0',
            borderRadius: 10
        },
        paperBody: {
            padding: 10,
            height: '60vh',
            borderRadius: 13,
            width: '100%',
            overflowY: 'scroll',
            marginTop: 10
        },
        paperBodys: {
            padding: 10,
            height: '60vh',
            borderRadius: 13,
            width: '90%',
            overflowY: 'scroll',
            marginTop: 10
        },
        footer: {
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
        },
        avatar: {
            backgroundColor: '#d1ccc0',
            color: 'black',
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
        modale: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        papere: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        fileBody: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#bdc3c7',
            borderRadius: 6,
            padding: 15
        },
        fileLink: {
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            textDecoration: 'none',
            color: 'black'
        },
        otherMessage: {
            marginLeft: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }
})
const ChatPage = (props) => {
    const socket = useRef(useMemo(() => {
        // https://testfornodealireza.ir/
        // http://localhost:4000/socket
        return io.connect('https://alirezadaneshgahsku.ir/socket', { transports: ['websocket'] })
    }, []))
    const [message, setMessage] = useState('')
    const [messageChatTeacher, setMessageChatTeacher] = useState('')
    const [UserTeacherSelect, setUser] = useState('')
    const [teacherModel, setTeacherModel] = useState(false)
    const [File, setFile] = useState('')
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const classes = useStyle()
    useEffect(() => {
        dispatch(handleGetLessonForChatPage(props.match.params.id, props.history.replace))
        socket.current.emit('joinToChat', { id: props.match.params.id, student: Store.getState().User._id })
        socket.current.on('setOnline', async (data) => {
            const new_data = [...Store.getState().UserChatPage];
            const findIndex = new_data.findIndex((item) => item._id === data)
            if(findIndex!==-1){
                const user = new_data[findIndex];
                user.online = true;
                new_data[findIndex] = user;
                await dispatch({ type: 'usersOnline', payload: [...new_data] });
            }
        })

        socket.current.on('handleSendMessageForTeacher', (data) => {
            Store.dispatch({ type: 'handleSendMessageForTeacher', payload: [...Store.getState().chatWithTeacher, data] })
        })
        socket.current.on('handleDeleteTeacherChat', async (data) => {
            const msg = [...Store.getState().chatWithTeacher];
            const new_data = msg.filter((item) => item._id !== data);
            await Store.dispatch({ type: 'handleDeleteTeacherChat', payload: [...new_data] })
        })
        socket.current.on('setOfline', async (data) => {
            const new_data = [...Store.getState().UserChatPage];
            const findIndex = new_data.findIndex((item) => item._id === data)
            const user = new_data[findIndex];
            user.online = false;
            new_data[findIndex] = user;
            await dispatch({ type: 'usersOfline', payload: [...new_data] });
        })
        socket.current.on('handleTextMessage', (data) => {
            Store.dispatch({ type: 'newMsg', payload: [...Store.getState().msgChatPage, data] })
        })
        socket.current.on('handleDelete', async (data) => {
            const msg = [...Store.getState().msgChatPage];
            const new_data = msg.filter((item) => item._id !== data);
            await Store.dispatch({ type: 'DeleteMsg', payload: [...new_data] })
        })
        return () => {
            socket.current.emit('offline', { id: props.match.params.id, user: Store.getState().User._id })
            socket.current.disconnect()
        }
    }, [dispatch,props.history.replace,props.match.params.id])
   
    
    const users = useSelector(state => state.UserChatPage)
    const msg = useSelector(state => state.msgChatPage)
    const lesson = useSelector(state => state.LssonsChatPage)
    const teacher = useSelector(state => state.Teacher)
    const user = useSelector(state => state.User)
    const chatWithTeacher = useSelector(state => state.chatWithTeacher)
    const handleSendMessageForTeacher = (user_select) => {
        if (messageChatTeacher !== '') {
            const New_message = {
                sender: user._id,
                name: user.name,
                type: 'text',
                text: messageChatTeacher,
                image: user.image,
                time: moment().locale('fa').format('hh:mm:ss__YYYY/MM/D')
            }
            socket.current.emit('handleSendMessageForTeacher', { student: user_select, message: New_message, lesson: lesson._id })
            setMessageChatTeacher('')

        } else {
            toast.warning('پیام خالی فرستاده نمی شود', { position: 'top-right' })
        }
    }
    const handleTextMessage = () => {
        if (message !== '') {
            const New_message = {
                sender: user._id,
                name: user.name,
                type: 'text',
                text: message,
                image: user.image,
                time: moment().locale('fa').format('hh:mm:ss__YYYY/MM/D')
            }
            socket.current.emit('handleTextMessage', { message: New_message, id: props.match.params.id })
            setMessage('')

        } else {
            toast.warning('پیام خالی فرستاده نمی شود', { position: 'top-right' })
        }
    }
    const handleDelete = (data) => {
        socket.current.emit('handleDelete', { lesson: props.match.params.id, msg_id: data })
    }
    const handleDeleteTeacherChat = (data, user_sel) => {
        socket.current.emit('handleDeleteTeacherChat', { lesson: lesson._id, user: user_sel, msg_id: data })
    }
    const handleSendFile = async () => {
        if (File) {
            try {
                const data = new FormData();
                data.append('file', File);
                const result = await axios.post(`${configUrl.url}user/file`, data, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                const message_data = {
                    sender: user._id,
                    name: user.name,
                    type: 'file',
                    text: result.data.text,
                    image: user.image,
                    time: moment().locale('fa').format('hh:mm:ss__YYYY/MM/D'),
                    fileName: result.data.fileName
                }
                socket.current.emit('handleSendFile', { lesson: lesson._id, message: message_data })
                setOpen(false)
            } catch (e) {
                toast.error('مشکلی پیش امده است عزیز دل چند لحضه ی دیگر دوباره تلاش کنید')
                setOpen(false)
            }
        } else {
            toast.warning('باید فایلی را برای ارسال انتخاب کنید', { position: 'top-right' })
        }
    }
    return (
        <div>
            <Grid container direction='row' spacing={5} className={classes.root}>
                <Helmet>
                    <title>{lesson.name}</title>
                </Helmet>
                <Hidden smDown>
                    <Grid item lg={3} xl={3} md={4}>
                        <Paper elevation={3} className={classes.usersPaper}>
                            <Typography variant='h6' className={classes.title}>کلاس : {lesson.name}</Typography>
                            <Typography variant='subtitle2' style={{ marginBottom: 10 }}>استاد درس :{teacher.name}</Typography>
                            <Divider className={classes.divider} />
                            <List className={classes.rootList}>
                                {users.map((item) => (
                                    <div key={item._id}>
                                    {
                                        item.role === "user" && user.role==='teacher' ? (
                                            <Button variant='outlined' style={{width:'100%',marginTop:5}} onClick={()=>{
                                                setTeacherModel(true)
                                                dispatch(handleGetstudentChat(lesson._id,item._id))
                                                setUser(item._id)
                                                socket.current.emit('joinChatWithTeacher', { user: item._id, lesson: lesson._id })
                                                }} >
                                                <div key={item._id} style={item.role === 'teacher' ? { backgroundColor: '#95a5a6' } : null}>
                                                    <ListItem key={item._id} alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src={`${configUrl.img}user/${item.image}`} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={item.name + '  ' + item.lastName}
                                                            secondary={
                                                                    <Typography
                                                                        variant="subtitle2"
                                                                        style={{ display: 'inline' }}
                                                                    >
                                                                        {item.role === 'teacher' ? 'استاد درس' : 'دانشجو'}
                                                                    </Typography>
                                                            }
                                                        />
                                                        <small style={{ marginTop: 15, color: '#95a5a6',marginRight:40 }}>{item.online === true ? 'آنلاین' : null}</small>
                                                    </ListItem>
                                                </div>
                                            </Button>
                                        ) : (
                                            <div key={item._id} style={item.role === 'teacher' ? { backgroundColor: '#95a5a6' } : null}>
                                                <ListItem key={item._id} alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar alt="Remy Sharp" src={`${configUrl.img}user/${item.image}`} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={item.name + '  ' + item.lastName}
                                                        secondary={
                                                            
                                                                <Typography
                                                                    variant="subtitle2"
                                                                    style={{ display: 'inline' }}
                                                                >
                                                                    {item.role === 'teacher' ? 'استاد درس' : 'دانشجو'}
                                                                </Typography>
                                                        }
                                                    />
                                                    <small style={{ marginTop: 15, color: '#95a5a6' }}>{item.online === true ? 'انلاین' : null}</small>
                                                </ListItem>
                                                <Divider />
                                            </div>
                                        )
                                    }
                                    </div>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Hidden>
                <Grid item lg={9} sm={12} xs={12} md={8} xl={9} className={classes.chatMain}>
                    <div className={classes.header}>
                        <Typography variant='h6'>{lesson.name}</Typography>
                        <Typography variant='subtitle2' style={{ fontFamily: 'BYekan', marginTop: 5 }}>تعداد دانشجویان کلاس : {users.length} نفر</Typography >
                    </div>
                    {user.role === 'teacher' ? null : (
                        <Button onClick={() => {
                            setTeacherModel(true)
                            setUser(user._id)
                            socket.current.emit('joinChatWithTeacher', { user: user._id, lesson: lesson._id })
                            dispatch(handleGetTeacherChat(lesson._id))
                        }} style={{ marginTop: 10 }} variant='contained' color='primary'>مشاهده ی چت خصوصی با استاد</Button>
                    )}
                    <div className={classes.body}>
                        <Paper elevation={3} className={classes.paperBody}>
                            {msg.map((item) => (
                                <div key={item._id}>
                                    {item.sender === user._id ? item.type === 'file' ? (
                                        <div className={classes.file}>
                                            <div className={classes.fileBody}>
                                                <a target='_blank' rel="noopener noreferrer" href={`${configUrl.img}/file/${item.text}`} className={classes.fileLink}>
                                                    <ArrowDownwardIcon />
                                                    <Typography style={{ marginRight: 10 }} variant='subtitle1'>{item.fileName}</Typography>
                                                </a>
                                                <IconButton onClick={() => { handleDelete(item._id) }} style={{ marginRight: 15 }}>
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
                                                <IconButton onClick={() => { handleDelete(item._id) }} style={{ marginRight: 15 }}>
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
                                                    <a target='_blank' href={`${configUrl.img}/file/${item.text}`} className={classes.fileLink}>
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
                    </div>
                    <div className={classes.footer}>
                        <TextField value={message} onChange={(event) => { setMessage(event.target.value) }} variant='outlined' label='پیام ....' style={{ backgroundColor: 'white', width: '80%' }} />
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button onClick={handleTextMessage} style={{ marginRight: 10 }}><Avatar className={classes.avatar}><SendIcon /></Avatar></Button>
                            <Button onClick={() => { setOpen(true) }} style={{ marginRight: 10 }}><Avatar className={classes.avatar}><AttachFileIcon /></Avatar></Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <CostumeModal open={open} setOpen={setOpen}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Typography variant='h6' style={{ textAlign: 'center', marginBottom: 20 }}>
                            انتخاب فایل
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <InputLabel style={{ fontFamily: 'BYekan', marginBottom: 20 }}>فایل خود را انتخاب کنید</InputLabel>
                            <TextField onChange={(event) => { setFile(event.target.files[0]) }} style={{ marginBottom: 20 }} variant='outlined' type='file' />
                            <Button onClick={handleSendFile} variant='contained' color='primary'>ارسال فایل</Button>
                        </div>
                    </div>
                </Fade>
            </CostumeModal>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modale}
                open={teacherModel}
                onClose={() => { setTeacherModel(false) }}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
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
                                                <IconButton onClick={() => { handleDeleteTeacherChat(item._id, UserTeacherSelect) }} style={{ marginRight: 15 }}>
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
                                                <IconButton onClick={() => { handleDeleteTeacherChat(item._id, UserTeacherSelect) }} style={{ marginRight: 15 }}>
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
                        <Button onClick={() => { handleSendMessageForTeacher(UserTeacherSelect) }} variant='contained' color='primary' style={{ marginTop: 20, marginRight: 20 }}>ارسال</Button>
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    );
}

export default withRouter(ChatPage);