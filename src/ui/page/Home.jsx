import { Button, Container, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import AppbarPage from './../component/Appbar';
import Card from './../../components/Card/Card';
import CardHeader from './../../components/Card/CardHeader';
import CardBody from './../../components/Card/CardBody';
import { useDispatch, useSelector } from 'react-redux';
import { handleUserGetLessons } from 'redux/action/user';
import { Store } from './../../redux/store/index';
import { ToastContainer } from 'react-toastify';
import { NavLink, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { handleUserGetExams } from './../../redux/action/exam/index';
import moment from 'jalali-moment';
const useStyle = makeStyles((theme) => {
    return {
        toastStyle: {
            [theme.breakpoints.down('sm')]: {
                width: '90%',
            },
            [theme.breakpoints.only('md')]: {
                width: '50%',
            },
            width: '40%'
        },
        txt: {
            marginBottom: 10
        },
        divImg: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 35,
            marginBottom: 60
        },
        img: {
            width: '100%',
            height: 500
        }
    }
})
const Home = (props) => {
    const user = useSelector(state => state.User)
    const classes = useStyle()
    const dispatch = useDispatch();
    useEffect(() => {
        if (!Store.getState().Course.length && Store.getState().User.role!=='admin') {
            dispatch(handleUserGetLessons(props.history.replace))
        }
        if (!Store.getState().Exams.length & Store.getState().User.role!=='admin') {
            dispatch(handleUserGetExams(props.history.replace))
        }
    }, [props.history.replace])
    const courses = useSelector(state => state.Course)
    const exams = useSelector(state => state.Exams)
    let i = 1
    let j = 1
    return (
        <div>
            <Helmet>
                <title>???????? ?? ????????</title>
            </Helmet>
            <AppbarPage />
            <Container>
                <Card style={{ marginTop: 50, marginBottom: 50 }}>
                    <CardHeader color='primary'>
                        <Typography variant='h5' className={classes.txt}>???????? ????????  ?????? ???? ?????? ????????</Typography>
                        <Typography variant='subtitle1'>?????? ???? ???????????? ???????? ???????? ?????? ???? ???? ???????? ?????? ???????????? ???????? ?? ???? ???????? ?? ???? ???? ???????? ???? ?????? ???????? ???? ???????? ?????????? ???????? ????????</Typography>
                    </CardHeader>
                    <CardBody style={{ overflowX: 'scroll' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>????????</TableCell>
                                    <TableCell align='center'>?????? ??????</TableCell>
                                    <TableCell align='center'>?????????? ??????</TableCell>
                                    <TableCell align='center'>???????? ???? ????????</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell align='center'>{i++}</TableCell>
                                        <TableCell align='center'>{item.name}</TableCell>
                                        <TableCell align='center'>{item.teacher.name}</TableCell>
                                        <TableCell align='center'><NavLink to={`/chatPage/${item._id}`}><Button variant='contained' color='primary'>???????? ???? ????????</Button></NavLink></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader color='primary'>
                        <Typography variant='h5' className={classes.txt}>???????? ???????????????? ?????? ???? ?????? ?????? ????????</Typography>
                        <Typography variant='subtitle1'>?????? ???? ???????????? ???? ?????? ???????? ???????????? ???? ?? ?????? ???? ???? ?????????? ?? ???????? ?????????????? ???????????? ????????</Typography>
                    </CardHeader>
                    <CardBody style={{ overflowX: 'scroll' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>????????</TableCell>
                                    <TableCell align='center'>????????????</TableCell>
                                    <TableCell align='center'>?????????? ????????</TableCell>
                                    <TableCell align='center'>???????? ????????</TableCell>
                                    <TableCell align='center'>???????? ?????????? ??????????</TableCell>
                                    <TableCell align='center'>??????</TableCell>
                                    <TableCell align='center'>???????? ???? ????????????</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exams.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell align='center'>{j++}</TableCell>
                                        <TableCell align='center'>{item.name}</TableCell>
                                        <TableCell align='center'>{`${item.StartTime.year}/${item.StartTime.month}/${item.StartTime.day}`}</TableCell>
                                        <TableCell align='center'>{`????????  : ${item.StartTime.hour}/${item.StartTime.min}`}</TableCell>

                                        <TableCell align='center'>{`${Math.floor(item.end / 100)}:${Math.floor(item.end % 100)}`}</TableCell>
                                        <TableCell align='center'>{item.course.name}</TableCell>
                                        <TableCell align='center'>
                                            {Number(`${item.StartTime.year}${item.StartTime.month}${item.StartTime.day}${item.StartTime.hour}${item.StartTime.min}`) <= Number(moment().locale('fa').format('YYYYMMDDHHmm')) && Number(moment().locale('fa').format('YYYYMMDDHHmm')) < Number(`${item.StartTime.year}${item.StartTime.month}${item.StartTime.day}${item.end}`) ? (
                                                <>
                                                    {
                                                        user.role === 'teacher' ? (
                                                            <NavLink to={`/teacher/exam/${item._id}`}>
                                                                <Button variant='contained' color='primary'>????????</Button>
                                                            </NavLink>
                                                        ) : user.role === 'user' ? (
                                                            <NavLink to={`/user/checkPicture/${item._id}`}>
                                                                <Button variant='contained' color='primary'>????????</Button>
                                                            </NavLink>
                                                        ) : null
                                                    }
                                                </>
                                            ) : Number(moment().locale('fa').format('YYYYMMDDHHmm')) >= Number(`${item.StartTime.year}${item.StartTime.month}${item.StartTime.day}${item.end}`) ? (
                                                <Button disabled variant='contained' color='primary'>?????????? ??????????</Button>
                                            ) : Number(moment().locale('fa').format('YYYYMMDDHHmm')) <= Number(`${item.StartTime.year}${item.StartTime.month}${item.StartTime.day}${item.StartTime.hour}${item.StartTime.min}`) ? (
                                                <Button disabled variant='contained' color='primary'>???????? ???????????? ?????? ???????????? ??????</Button>
                                            ) : null
                                            }

                                        </TableCell>
                                    </TableRow>
                                )

                                )}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </Container>
            <ToastContainer className={classes.toastStyle} />
        </div>
    );
}

export default withRouter(Home);

