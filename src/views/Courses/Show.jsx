import { Divider, InputLabel, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import { Formik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleGetGroup } from 'redux/action/Group';
import { Store } from 'redux/store';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Card from './../../components/Card/Card';
import CardHeader from './../../components/Card/CardHeader';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import CardBody from 'components/Card/CardBody';

import * as yup from 'yup';
import { handleAdminGetCourses } from 'redux/action/course';
import { handleDeleteCourse } from 'redux/action/course';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
const validator = yup.object({
    group: yup.string().required('وارد کردن این فیلد الزامی است'),
})
const useStyle = makeStyles((theme) => {
    return {
        ...styles,
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            }
        },
        formControl: {
            [theme.breakpoints.up('md')]: {
                marginTop: 10,
                width: '65%',
            },
            [theme.breakpoints.down('sm')]: {
                width: '80%',
                marginBottom: 15
            }
        },
        btn: {
            marginTop: 'auto',
            marginBottom: 'auto',
            [theme.breakpoints.down('sm')]: {
                width: '80%',
                marginRight: 'auto',
                marginLeft: 'auto'
            }
        },
        divider: {
            marginTop: 30,
            marginBottom: 50,
            backgroundColor: 'black'
        },
        table: {
            overflowX: 'scroll'
        }
    }
})
const ShowCourse = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (!Store.getState().Group.length) {
            dispatch(handleGetGroup())
        }
    }, [dispatch])
    const Group = useSelector(state => state.Group);
    const courses = useSelector(state => state.AdminCourses);
    const classes = useStyle()
    return (
        <div>
            <Helmet>
                <title>نمایش دروس</title>
            </Helmet>
            <Formik
                initialValues={{ group: '' }}
                onSubmit={(values) => {
                    dispatch(handleAdminGetCourses(values.group))
                }}
                validationSchema={validator}
            >
                {({ values, handleChange, handleSubmit, handleBlur, touched, errors }) => (
                    <>
                        <div className={classes.header}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-filled-label">گروه درسی</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={values.group}
                                    onChange={handleChange('group')}
                                    onBlur={handleBlur('group')}
                                >
                                    {Group.map((item) => (
                                        <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                                {errors.group && touched.group ? (<i style={{ fontFamily: 'BYekan', color: '#e74c3c', fontStyle: 'italic' }}>{errors.group}</i>) : null}
                            </FormControl>
                            <Button className={classes.btn} variant='contained' color='primary' onClick={handleSubmit}>نمایش اطلاعات</Button>
                        </div>
                    </>
                )}
            </Formik>
            <Divider className={classes.divider} />
            <Card >
                <CardHeader color='primary'>
                    <h4 className={classes.cardTitleWhite}>لیست دروس</h4>
                    <p className={classes.cardCategoryWhite}>
                        لیست دروس یراساس گروه درسی که شما انتخاب کرده اید
                        </p>
                </CardHeader>
                {courses.length ? (

                    <CardBody className={classes.table}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>نام</TableCell>
                                    <TableCell align='left'>کد درس</TableCell>
                                    <TableCell align='left'>استاد درس</TableCell>
                                    <TableCell align='left'>حذف</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell align='left'>{item.name}</TableCell>
                                        <TableCell align='left'>{item.code}</TableCell>
                                        <TableCell align='left'>{item.teacher.name}</TableCell>
                                        <TableCell align='left'><Button onClick={() => { dispatch(handleDeleteCourse(item._id)) }} variant='contained' color='primary'>حذف</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                ) : null}
            </Card>
            <ToastContainer/>
        </div>
    );
}

export default ShowCourse;