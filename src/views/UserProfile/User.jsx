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
import { handleGetUserForAdmin } from './../../redux/action/user/index';
import { handleDeleteUser } from 'redux/action/user';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { configUrl } from 'Costume/Url';
import { Helmet } from 'react-helmet';
const validator = yup.object({
    role: yup.string().required('وارد کردن این فیلد الزامی است'),
    group: yup.string().required('وارد کردن این فیلد الزامی است'),
    enteringYear: yup.number().required('وارد کردن این فیلد الزامی است'),
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
                width: '25%',
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
const User = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.AdminUsers)
    useEffect(() => {
        if (!Store.getState().Group.length) {
            dispatch(handleGetGroup())
        }
    }, [dispatch])
    const Group = useSelector(state => state.Group);
    const classes = useStyle()
    return (
        <div>
            <Helmet>
                <title>نمایش دانشجویان</title>
            </Helmet>
            <Formik
                initialValues={{ group: '', enteringYear: '', role: '' }}
                onSubmit={(values) => {
                    dispatch(handleGetUserForAdmin(values))
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
                            <FormControl variant="outlined" className={classes.formControl} >
                                <InputLabel id="demo-simple-select-filled-label">سال ورود</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={values.enteringYear}
                                    onChange={handleChange('enteringYear')}
                                    onBlur={handleBlur('enteringYear')}
                                >
                                    <MenuItem value={1396}>1396</MenuItem>
                                    <MenuItem value={1397}>1397</MenuItem>
                                    <MenuItem value={1398}>1398</MenuItem>
                                    <MenuItem value={1399}>1399</MenuItem>
                                </Select>
                                {errors.enteringYear && touched.enteringYear ? (<i style={{ fontFamily: 'BYekan', color: '#e74c3c', fontStyle: 'italic' }}>{errors.enteringYear}</i>) : null}
                            </FormControl>
                            <FormControl variant="outlined" className={classes.formControl} >
                                <InputLabel id="demo-simple-select-filled-label">نقش کاربر</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={values.role}
                                    onChange={handleChange('role')}
                                    onBlur={handleBlur('role')}
                                >
                                    <MenuItem value='user'>کاربر</MenuItem>
                                    <MenuItem value='teacher'>استاد</MenuItem>
                                </Select>
                                {errors.role && touched.role ? (<i style={{ fontFamily: 'BYekan', color: '#e74c3c', fontStyle: 'italic' }}>{errors.role}</i>) : null}
                            </FormControl>
                            <Button className={classes.btn} variant='contained' color='primary' onClick={handleSubmit}>نمایش اطلاعات</Button>
                        </div>
                    </>
                )}
            </Formik>
            <Divider className={classes.divider} />
            <Card >
                <CardHeader color='primary'>
                    <h4 className={classes.cardTitleWhite}>لیست دانشجویان</h4>
                    <p className={classes.cardCategoryWhite}>
                        لیست دانشجویان براساس سال ورود و گروه درسی که شما انتخاب کردید
                        </p>
                </CardHeader>
                {users.length ? (
                    <CardBody className={classes.table}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>عکس دانشجو</TableCell>
                                    <TableCell align='left'>نام</TableCell>
                                    <TableCell align='left'>نام خانوادگی</TableCell>
                                    <TableCell align='left'>شماره دانشجویی</TableCell>
                                    <TableCell align='left'>حذف</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell align='left'><img alt='user' src={`${configUrl.img}user/${item.image}`} style={{ borderRadius: 20, width: 50, height: 50 }} /></TableCell>
                                        <TableCell align='left'>{item.name}</TableCell>
                                        <TableCell align='left'>{item.lastName}</TableCell>
                                        <TableCell align='left'>{item.studentNumber}</TableCell>
                                        <TableCell align='left'><Button onClick={() => { dispatch(handleDeleteUser(item._id)) }} variant='contained' color='primary'>حذف</Button></TableCell>
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

export default User;