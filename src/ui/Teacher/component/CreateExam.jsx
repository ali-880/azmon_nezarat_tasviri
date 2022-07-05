import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'jalali-moment';
import {
    TimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import * as yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';

import { Typography, InputLabel, FormControl, Select, MenuItem, TextField, makeStyles, Button } from '@material-ui/core';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
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
    }
})
const CreateExam = (props) => {
    const classes=useStyle()
    const courses = useSelector(state => state.TeacherLessons)
    return (
        <>
            <Typography style={{ textAlign: 'center', marginBottom: 20 }} variant='h5'>
                ایجاد امتحان جدید
            </Typography>
            <Formik
                validationSchema={validator}
                onSubmit={(values) => {
                    let HourSelect = `00`;
                    let minSelect = `00`;
                    let CorrectDay = '00'
                    if (values.day < 10) {
                        CorrectDay = `0${values.day}`
                    } else {
                        CorrectDay = values.day
                    }
                    if (props.selectedDate === "2021-07-19T12:57:00.000Z") {
                        toast.error('ساعت شروع امتحان را مشخص نکردید', { position: 'top-right' })
                    } else {
                        if (props.selectedDate.getHours() < 10) {
                            HourSelect = `0${props.selectedDate.getHours()}`
                        } else {
                            HourSelect = props.selectedDate.getHours()
                        } if (props.selectedDate.getMinutes() < 10) {
                            minSelect = `0${props.selectedDate.getMinutes()}`
                        } else {
                            minSelect = props.selectedDate.getMinutes()
                        }
                        props.SetName(values.name)
                        props.SetCourse(values.course)
                        props.setYear(values.year)
                        props.setMonth(values.month)
                        props.setDay(CorrectDay)
                        props.setHour(HourSelect)
                        props.setMin(minSelect)
                        props.setEnd(values.end)
                        props.handleOpen()
                        values.year = ''
                        values.month = ''
                        values.day = ''
                        values.hour = ''
                        values.min = ''
                        values.name = ''
                        values.end = ''
                        values.course = ''
                        props.handleDateChange('2021-07-19T12:57:00.000Z')
                    }
                }}
                initialValues={{ year: '', month: '', hour: "2021-07-19T12:57:00.000Z", day: '', course: '', name: '', end: '' }}
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
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={values.course}
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
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='01'>فروردین</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='02'>اردیبهشت</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='03'>خرداد</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='04'>تیر</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='05'>مرداد</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='06'>شهریور</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='07'>مهر</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='08'>آبان</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='09'>آذر</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='10'>دی</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='11'>بهمن</MenuItem>
                                        <MenuItem style={{ borderRadius: 10, backgroundColor: '#ecf0f1', marginBottom: 10, marginRight: 3, marginLeft: 3 }} value='12'>اسفند</MenuItem>
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
                                    <TimePicker inputVariant="outlined" variant='dialog' label='ساعت شروع امتحان' onBlur={handleBlur('hour')} value={props.selectedDate} onChange={props.handleDateChange} />
                                </MuiPickersUtilsProvider>
                                {props.selectedDate === "2021-07-19T12:57:00.000Z" && touched.hour ? (<i className={classes.error}>ساعت دقیق امتحان را باید مشخص کنید</i>) : null}
                            </div>
                        </div>
                        <InputLabel style={{ marginTop: 30, marginBottom: 20 }}>مدت زمان امتحان</InputLabel>
                        <div style={{ width: 900, display: 'flex', flexDirection: 'column' }}>
                            <TextField onBlur={handleBlur('end')} onChange={handleChange('end')} variant='outlined' style={{ width: '25%' }} label='زمان امتحان باید به دقیقه باشد' />
                            {errors.end && touched.end ? (<i className={classes.error}>{errors.end}</i>) : null}
                        </div>
                        <Button onClick={handleSubmit} variant='contained' color='primary' style={{ marginTop: 20 }}>ثبت امتحان جدید</Button>
                    </>
                )}
            </Formik>

        </>
    );
}

export default CreateExam;