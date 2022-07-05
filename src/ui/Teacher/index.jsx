import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button, Container, Divider, Select, Fade} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetLessonsForTeacher } from './../../redux/action/teacher/index';
import { Typography, InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { handleCreateExam } from 'redux/action/teacher';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import { Formik } from 'formik';
import lodash from 'lodash'
import DateFnsUtils from '@date-io/date-fns';
import { handleGetOneExamForAddQues, handleUpdateExam } from './../../redux/action/exam/index';

import {
    TimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'jalali-moment';
import { handleUserGetExams, handleDeleteQuestion } from 'redux/action/exam';
import { Store } from 'redux/store';
import CreateExam from './component/CreateExam';
import CreateQuestion from './component/CreateQuestion';
import ListClasses from './component/ListClasses';
import ListExam from './component/ListExams';
import ModalExams from './component/ModalCostumExams';


const validator = yup.object({
    name: yup.string().required('وارد کردن این فیلد الزامی است'),
    course: yup.string().required('وارد کردن این فیلد الزامی است'),
    year: yup.string().max(4, 'تعداد ارقام انتخابی نباید پیش از چهار مقدار باشد').min(4, 'تعداد ارقام انتخابی نباید کم تر از چهار مقدار باشد').required('وارد کردن این فیلد الزامی است'),
    month: yup.string().max(2, 'تعداد ارقام انتخابی نباید پیش از دو مقدار باشد').min(2, 'تعداد ارقام انتخابی نباید کم تر از دو مقدار باشد').required('وارد کردن این فیلد الزامی است'),
    day: yup.number().typeError('لطفا مقدار عددی وارد کنید').max(31, 'هر ماه حداکثر دارای سی و یک روز می باشد').min(1, 'در وارد کردن عدد دقت بیشتری کنید').required('وارد کردن این فیلد الزامی است'),
    hour: yup.string().required('وارد کردن این فیلد الزامی است'),
    end: yup.number().typeError('لطفا مقدار عددی وارد کنید').required('وارد کردن این فیلد الزامی است'),

})


const useStyle = makeStyles((theme) => {
    return {
        monthSelect: {
            borderRadius: 10,
            backgroundColor: '#ecf0f1',
            marginBottom: 10,
            marginRight: 3,
            marginLeft: 3,
        },
        selectCourse: {
            [theme.breakpoints.down('sm')]: {
                width: '90%',
                marginBottom: 20
            },
            [theme.breakpoints.only('md')]: {
                width: '70%',
                marginBottom: 20
            },
            [theme.breakpoints.up('lg')]: {
                width: '100%',
                marginBottom: 20
            }
        },
        paper1: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        error: {
            marginLeft: 25,
            fontSize: 13,
            fontFamily: 'BYekan',
            color: '#ff3f34',
            fontStyle: 'italic'
        },
        divShow: {
            display: 'flex',
            flexDirection: 'column',
            width: '30%',
            marginBottom: 20,
            marginRight: 15,
            [theme.breakpoints.down('sm')]: {
                marginBottom: 25,
                width: '90%'
            },
            [theme.breakpoints.only('md')]: {
                display: 'flex',
                flexDirection: 'column',
                width: '45%',
                marginBottom: 20,
                marginRight: 15,
            }
        },
        tab: {
            [theme.breakpoints.only('md')]: {
                marginRight: 30,
                marginLeft: 30,
                fontSize: 15
            },
            [theme.breakpoints.down('sm')]: {
                marginRight: 2,
                marginLeft: 2,
                fontSize: 12
            },
            [theme.breakpoints.up('lg')]: {
                marginRight: 50,
                marginLeft: 50,
                fontSize: 17
            },
        },
        tabs: {
            marginRight: 'auto',
            marginLeft: 'auto',
            padding: 10
        },
        paper: {
            paddingRight: 5,
            paddingLeft: 5,
            overflowX: 'scroll',
            paddingTop: 2,
            paddingBottom: 10,
            marginTop: 30
        },
        nameInput: {
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            },
            [theme.breakpoints.only('md')]: {
                width: '60%'
            },
            width: '40%'
        },
        nameInput1: {
            width: "100%",
            marginRight: 20,
            marginLeft: 20,
            [theme.breakpoints.down('md')]: {
                width: '90%',
                marginRight: 15,
                marginLeft: 15,

            }
        },
        courseInput: {
            width: "90%",
            marginLeft: 15,
            [theme.breakpoints.up('lg')]:
            {
                width: '60%'
            }
        },
        startTime: {
            [theme.breakpoints.up('lg')]: {
                marginRight: 15,
                marginLeft: 25,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            },
            [theme.breakpoints.up('md')]: {
                marginRight: 10,
                marginLeft: 15,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            },
            [theme.breakpoints.down('sm')]: {
                marginRight: 0,
                marginLeft: 15,
                display: 'flex',
                flexDirection: 'column',
            }
        },
        createQues: {
            [theme.breakpoints.down('sm')]: {
                marginBottom: 20,
                width: "90%",
                marginLeft: 15,
            },
            [theme.breakpoints.only('md')]: {
                marginBottom: 20,
                width: "70%",
                marginLeft: 15,
            },
            marginBottom: 20,
            width: "50%",
            marginLeft: 15,
        },
        score: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 15
        },
        testInput: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 15,
            flexWrap: 'wrap',
        },
        testInput1: {
            [theme.breakpoints.down('sm')]: {
                width: "90%",
                marginLeft: 15,
                marginBottom: 10
            },
            [theme.breakpoints.only('md')]: {
                width: "70%",
                marginLeft: 15,
                marginBottom: 10
            },
            [theme.breakpoints.only('lg')]: {
                width: "45%",
                marginLeft: 15,
                marginBottom: 10
            },

        },

    }
})
const TeacherSetting = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        if (!Store.getState().TeacherLessons.length) {
            dispatch(handleGetLessonsForTeacher())
        }
        if (!Store.getState().Exams.length) {
            dispatch(handleUserGetExams())
        }
    }, [dispatch])
    const questions = useSelector(state => state.Questions)
    const [value, setValue] = useState(0)
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [examId, setExamId] = useState('0')
    const [min, setMin] = useState('')
    const [hour, setHour] = useState('')
    const [day, setDay] = useState('')

    const [end, setEnd] = useState(0)
    const [course, SetCourse] = useState('')
    const [name, SetName] = useState('')
    const [test, SetTest] = useState('')
    const [file, SetFile] = useState('')
    const [text, SetText] = useState('')
    const [Text1, SetText1] = useState('')
    const [Text2, SetText2] = useState('')
    const [Text3, SetText3] = useState('')
    const [Text4, SetText4] = useState('')
    const [render, SetRender] = useState(false)


    const exam = useSelector(state => state.Exam)
    const time = useSelector(state => state.Time)
    useEffect(() => {
        SetRender(!render)
    }, [exam, time])
    const [selectedDate, handleDateChange] = useState(`2021-07-19T${Number(time.hour)}:${Number(time.min)}:00.000Z`);
    const exams = useSelector(state => state.Exams)
    const courses = useSelector(state => state.TeacherLessons)
    let i = 1
    const classes = useStyle()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const handleOpenUpdate = () => {
        setOpenUpdate(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };
    useEffect(() => {
        if (value === 3 || value === 2) {
            if(!lodash(Store.getState().Exam).isEmpty()){
                dispatch({ type: 'EmptyExam', payload: {} })
            }
        }
    }, [value, dispatch])
    return (
        <Container style={{ marginTop: 30 }}>
            <AppBar position='static'>
                <Tabs className={classes.tabs} value={value} onChange={(event, newValue) => { setValue(newValue) }}>
                    <Tab className={classes.tab} label='لیست کلاس ها' />
                    <Tab className={classes.tab} label='مشاهده امتحانات' />
                    <Tab className={classes.tab} label='تعریف امتحان' />
                    <Tab className={classes.tab} label='ویرایش امتحانات' />
                </Tabs>
            </AppBar>
            {value === 0 ? (
                <Paper className={classes.paper}>
                    <ListClasses />
                </Paper>
            ) : value === 1 ? (
                <div index={1} value={value} style={{ marginTop: 20 }}>
                    <ListExam />
                </div>
            ) : value === 2 ? (
                <Paper style={{ border: '1px solid black', marginTop: 10, padding: 15, marginBottom: 60 }} index={2} value={value}>
                    <CreateExam text={text} test={test} SetTest={SetTest} handleDateChange={handleDateChange} selectedDate={selectedDate} SetName={SetName} SetCourse={SetCourse} setYear={setYear} setMonth={setMonth} setDay={setDay} setHour={setHour} setMin={setMin} setEnd={setEnd} handleOpen={handleOpen} handleDateChange={handleDateChange} />
                    {!lodash(exam).isEmpty() ? (
                        <CreateQuestion Text1={Text1} Text2={Text2} Text3={Text3} Text4={Text4} SetText3={SetText3} SetText4={SetText4} SetText1={SetText1} SetText2={SetText2} SetText={SetText} text={text} file={file} SetFile={SetFile} test={test} SetTest={SetTest} />
                    ) : null}
                </Paper>
            ) : value === 3 ? (
                <>
                    <Typography variant='body1' style={{ marginTop: 30, textAlign: 'center' }}>
                        اضافه کردن سوال به امتحان
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <InputLabel style={{ marginTop: 30, marginBottom: 20 }}>انتخاب امتحان برای افزودن سوال</InputLabel>
                        <FormControl variant="outlined" className={classes.courseInput}>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={examId}
                                className={classes.selectCourse}
                                onChange={(event) => { setExamId(event.target.value) }}
                            >
                                <MenuItem value='0' selected>-------------------</MenuItem>
                                {exams.map((item) => (
                                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button style={{ marginRight: 20 }} onClick={() => { dispatch(handleGetOneExamForAddQues(examId)) }} variant='contained' color='primary'>ایجاد تغیرات</Button>
                        {!lodash(exam).isEmpty() ? (
                            <>
                                <Divider style={{ marginTop: 30, marginBottom: 10, backgroundColor: 'black' }} />
                                <Typography style={{ marginBottom: 30, color: 'blue' }} variant='h5'>تغیرات زمان و نام امتحان</Typography>
                                <Formik
                                    enableReinitialize
                                    validationSchema={validator}
                                    onSubmit={(values) => {
                                        try {
                                            let HourSelect = `00`;
                                            let minSelect = `00`;
                                            let CorrectDay = '00'
                                            if (values.day < 10) {
                                                CorrectDay = `0${values.day}`
                                            } else {
                                                CorrectDay = values.day
                                            }
                                            if (selectedDate === "2021-07-19T12:57:00.000Z") {
                                                toast.error('ساعت شروع امتحان را مشخص نکردید', { position: 'top-right' })
                                            } else {
                                                if (selectedDate.getHours() < 10) {
                                                    HourSelect = `0${selectedDate.getHours()}`
                                                } else {
                                                    HourSelect = selectedDate.getHours()
                                                } if (selectedDate.getMinutes() < 10) {
                                                    minSelect = `0${selectedDate.getMinutes()}`
                                                } else {
                                                    minSelect = selectedDate.getMinutes()
                                                }
                                                SetName(values.name)
                                                SetCourse(values.course)
                                                setYear(values.year)
                                                setMonth(values.month)
                                                setDay(CorrectDay)
                                                setHour(HourSelect)
                                                setMin(minSelect)
                                                setEnd(values.end)
                                                handleOpenUpdate()
                                                values.year = ''
                                                values.month = ''
                                                values.day = ''
                                                values.hour = `2021-07-19T${time.hour}:${time.min}:00.000Z`
                                                values.name = ''
                                                values.end = ''
                                                values.course = ''
                                                handleDateChange(`2021-07-19T${time.hour}:${time.min}:00.000Z`)
                                            }
                                        } catch (e) {
                                            toast.warning('در وارد کردن ساعت و دقیقه باید دقت بیشتری داشته باشید.', { position: 'top-right' })
                                        }
                                    }}
                                    initialValues={{ year: time.year, month: time.month, hour: `2021-07-19T${time.hour}:${time.min}:00.000Z`, day: time.day, course: exam.course._id, name: exam.name, end: exam.duration }}
                                >
                                    {({ values, handleBlur, handleChange, errors, touched, handleSubmit }) => (
                                        <>
                                            <InputLabel style={{ marginBottom: 20 }}>نام امتحان : </InputLabel>
                                            <FormControl className={classes.nameInput}>
                                                <TextField value={values.name} onBlur={handleBlur('name')} onChange={handleChange('name')} className={classes.nameInput1} variant='outlined' label='نام امتحان' />
                                                {errors.name && touched.name ? (<i className={classes.error}>{errors.name}</i>) : null}
                                            </FormControl>
                                            <InputLabel style={{ marginBottom: 20, marginTop: 20 }}>انتخاب درس : </InputLabel>
                                            <FormControl variant="outlined" className={classes.courseInput}>
                                                <Select
                                                    value={values.course}
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    onChange={handleChange('course')}
                                                    onBlur={handleBlur('course')}
                                                >
                                                    {courses.map((item) => (
                                                        <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                {errors.course && touched.course ? (<i className={classes.error}>{errors.course}</i>) : null}
                                            </FormControl>

                                            <InputLabel style={{ marginTop: 30, marginBottom: 20 }}>زمان شروع آزمون</InputLabel>
                                            <div className={classes.startTime}>
                                                <div className={classes.divShow}>
                                                    <FormControl variant="outlined" >
                                                        <InputLabel id="demo-simple-select-outlined-label">سال</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={values.year}
                                                            onChange={handleChange('year')}
                                                            onBlur={handleBlur('year')}
                                                            label='سال'
                                                        >
                                                            <MenuItem value={moment().locale('fa').format('YYYY')}>{moment().locale('fa').format('YYYY')}</MenuItem>
                                                            <MenuItem value={Number(moment().locale('fa').format('YYYY')) + 1}>{Number(moment().locale('fa').format('YYYY')) + 1}</MenuItem>
                                                        </Select>
                                                        {errors.year && touched.year ? (<i className={classes.error}>{errors.year}</i>) : null}
                                                    </FormControl>
                                                </div>
                                                <div className={classes.divShow}>
                                                    <FormControl variant="outlined" >
                                                        <InputLabel id="demo-simple-select-outlined-labsel">ماه</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-labsel"
                                                            id="demo-simple-select-outlined"
                                                            value={values.month}
                                                            onChange={handleChange('month')}
                                                            onBlur={handleBlur('month')}
                                                            label='ماه'
                                                        >
                                                            <MenuItem className={classes.monthSelect} value='01'>فروردین</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='02'>اردیبهشت</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='03'>خرداد</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='04'>تیر</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='05'>مرداد</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='06'>شهریور</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='07'>مهر</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='08'>آبان</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='09'>آذر</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='10'>دی</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='11'>بهمن</MenuItem>
                                                            <MenuItem className={classes.monthSelect} value='12'>اسفند</MenuItem>
                                                        </Select>
                                                        {errors.month && touched.month ? (<i className={classes.error}>{errors.month}</i>) : null}
                                                    </FormControl>
                                                </div>
                                                <div className={classes.divShow}>
                                                    <TextField value={values.day} onBlur={handleBlur('day')} onChange={handleChange('day')} variant='outlined' label='روز' />
                                                    {errors.day && touched.day ? (<i className={classes.error}>{errors.day}</i>) : null}
                                                </div>
                                                <div className={classes.divShow}>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <TimePicker inputVariant="outlined" variant='dialog' label='ساعت شروع امتحان' onBlur={handleBlur('hour')} value={selectedDate} onChange={handleDateChange} />
                                                    </MuiPickersUtilsProvider>
                                                    {selectedDate === "2021-07-19T12:57:00.000Z" && touched.hour ? (<i className={classes.error}>ساعت دقیق امتحان را باید مشخص کنید</i>) : null}
                                                </div>

                                            </div>
                                            <InputLabel style={{ marginTop: 30, marginBottom: 20 }}>مدت زمان امتحان</InputLabel>
                                            <div style={{ width: 900, display: 'flex', flexDirection: 'column' }}>
                                                <TextField value={values.end} onBlur={handleBlur('end')} onChange={handleChange('end')} variant='outlined' style={{ width: '25%' }} label='زمان امتحان باید به دقیقه باشد' />
                                                {errors.end && touched.end ? (<i className={classes.error}>{errors.end}</i>) : null}
                                            </div>
                                            <Button onClick={handleSubmit} variant='contained' color='primary' style={{ marginTop: 20 }}>ثبت تغیرات</Button>
                                        </>
                                    )}
                                </Formik>
                                <Divider style={{ marginTop: 30, marginBottom: 10, backgroundColor: 'black' }} />
                                <div style={{ marginRight: 10, marginLeft: 10, marginTop: 10, padding: 10 }}>
                                    {questions.map((item) => (
                                        <Typography key={item._id} key={item._id} style={{ marginTop: 10 }}>
                                            {`${i++} - ${item.text} (${item.type === 'file' ? "فایل" : item.type === 'text' ? "متنی" : "چهار گزینه ای"}) (${item.score} نمره)`}<Button onClick={() => { dispatch(handleDeleteQuestion(exam._id, item._id)) }} variant='outlined' color='secondary' style={{ marginRight: 15 }}>حذف سوال</Button>
                                        </Typography>
                                    ))}
                                </div>
                                <Divider style={{ marginTop: 30, marginBottom: 10, backgroundColor: 'black' }} />
                                <CreateQuestion Text1={Text1} Text2={Text2} Text3={Text3} Text4={Text4} SetText3={SetText3} SetText4={SetText4} SetText1={SetText1} SetText2={SetText2} SetText={SetText} text={text} file={file} SetFile={SetFile} test={test} SetTest={SetTest} />
                            </>
                        ) : null}
                    </div>
                </>
            ) : null}
            <ModalExams open={open} handleClose={handleClose}>
                <Fade in={open}>
                    <div className={classes.paper1}>
                        <h4 id="spring-modal-title">آیا مایل به ایجاد امتحان جدید در سامانه هستید ؟</h4>
                        <Button variant='contained' color='primary' onClick={() => {
                            dispatch(handleCreateExam(name, course, year, month, day, hour, min, end))
                            handleClose()
                        }}>
                            بله
                        </Button>
                        <Button onClick={() => { handleClose() }} variant='contained' color='secondary' style={{ marginRight: 10, marginLeft: 10 }}>انصراف</Button>
                    </div>
                </Fade>
            </ModalExams>
            <ModalExams open={openUpdate} handleClose={handleCloseUpdate}>
                <Fade in={openUpdate}>
                    <div className={classes.paper1}>
                        <h4 id="spring-modal-title">آیا مایل به ثبت تغیرات در امتحان انتخاب شده دارید ؟</h4>
                        <Button variant='contained' color='primary' onClick={() => {
                            dispatch(handleUpdateExam(exam._id, name, course, year, month, day, hour, min, end))
                            handleCloseUpdate()
                        }}>
                            بله
                        </Button>
                        <Button onClick={() => { handleCloseUpdate() }} variant='contained' color='secondary' style={{ marginRight: 10, marginLeft: 10 }}>انصراف</Button>
                    </div>
                </Fade>
            </ModalExams>
            <ToastContainer autoClose={9000} />
        </Container>
    );
}
export default TeacherSetting;