import React from 'react'
import GridContainer from './../../components/Grid/GridContainer';
import GridItem from './../../components/Grid/GridItem';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { Button, InputLabel, TextField } from '@material-ui/core';
import * as yup from 'yup';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import { handleGetGroup } from './../../redux/action/Group/index';
import { Store } from './../../redux/store/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { configUrl } from 'Costume/Url';
import Lodding from './../../components/loading/index';
import { Helmet } from 'react-helmet';

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardAvatar: {
        backgroundColor: '#9b59b6',
        padding: 10,
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};
const useStyles = makeStyles(styles);
const validator = yup.object({
    teacher: yup.string().min(9, 'کد استاد باید دارای نه کاراکتر باشد').max(9, 'کد استاد باید دارای نه کاراکتر باشد').required('وارد کردن این فیلد الزامی است'),
    name: yup.string().min(3, 'تعداد کاراکتر ورودی باید بیشتر از سه تا باشد').required('وارد کردن این فیلد الزامی است'),
    code: yup.string().min(6, 'کد هر درس دارای شیش کاراکتر می باشد').max(6, 'کد هر درس دارای شیش کاراکتر می باشد').required('وارد کردن این فیلد الزامی است'),
    group: yup.string().required('وارد کردن این فیلد الزامی است'),

})
const CreateCourse = () => {
    const Group = useSelector(state => state.Group);
    const dispatch = useDispatch()
    useEffect(() => {
        if (!Store.getState().Group.length) {
            dispatch(handleGetGroup())
        }
    }, [dispatch])
    const classes = useStyles();
    const load = useSelector(state => state.Lodding)
    return (
        <div>
            <Helmet>
                <title>
                    ایجاد درس
                </title>
            </Helmet>
            {load ? (
                <Lodding />
            ) : (
                <div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={8}>
                            <Formik
                                initialValues={{ name: '', group: '', teacher: '', code: '' }}
                                onSubmit={async (values) => {
                                    try {
                                        await dispatch({type:'setLoddingTrue'})
                                        await axios.post(`${configUrl.url}course`, values, {
                                            headers: {
                                                'Authorization': localStorage.getItem('token')
                                            }
                                        })
                                        await dispatch({type:'closeLodding'})
                                        toast.success('درس مورد نظر شما با موفقیت در سامانه ثبت شود', { position: 'top-right' ,autoClose:5000})
                                    } catch (e) {
                                        await dispatch({type:'closeLodding'})
                                        if (e.response.status === 500) {
                                            toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
                                        } else if (e.response.status === 403) {
                                            toast.warning('با اطلاعات هویتی شما این عمل مجاز نمی باشد', { position: 'top-right' })
                                        } else if (e.response.status === 401) {
                                            toast.warning('برای انجام این درخواست لطفا ابتدا در سامانه ثبت نام کنید', { position: 'top-right' })
                                        } else if (e.response.status === 400) {
                                            toast.error('برای هر درس باید کد استاد را در بخش استاد وارد کنید و نمی توانید یک دانشجو قرار دهید')
                                        } else if (e.response.status === 404) {
                                            toast.error('استادی با این مشخصات در سامانه ثبت نشده است', { position: 'top-right' })
                                        } else if (e.response.status === 409) {
                                            toast.error('قبلا از این کد برای درس دیگری استفاده شده است و کد درس باید یکتا باشد', { position: 'top-right', style: { width: 450, padding: 20 } })
                                        }
                                    }
                                }}
                                validationSchema={validator}
                            >
                                {({ values, handleBlur, errors, handleChange, handleSubmit, touched }) => (
                                    <form>
                                        <Card>
                                            <CardHeader color="primary">
                                                <h4 className={classes.cardTitleWhite} style={{ fontFamily: 'BYekan' }}>تعریف درس  در سامانه</h4>
                                                <p className={classes.cardCategoryWhite} style={{ fontFamily: 'BYekan' }}>شما می توانید درس مورد نظر خود را در این قسمت تعریف کنید</p>
                                            </CardHeader>
                                            <CardBody>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={12} md={10} style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <TextField
                                                            onBlur={handleBlur('name')}
                                                            value={values.name}
                                                            onChange={handleChange('name')}
                                                            label="نام"
                                                            name='name'
                                                            id="company-disabled"
                                                            variant='outlined'
                                                            style={{ width: '95%', marginRight: 'auto', marginLeft: 'auto', marginTop: 25 }}
                                                        />
                                                        {errors.name && touched.name ? (<i style={{ fontFamily: 'BYekan', color: '#e74c3c', fontStyle: 'italic' }}>{errors.name}</i>) : null}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={10} style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <TextField
                                                            onBlur={handleBlur('teacher')}
                                                            value={values.teacher}
                                                            onChange={handleChange('teacher')}
                                                            variant='outlined'
                                                            style={{ width: '95%', marginRight: 'auto', marginLeft: 'auto', marginTop: 25 }}
                                                            label='کد استاد درس'
                                                            id="teacher"
                                                            name='teacher'
                                                        />
                                                        {errors.teacher && touched.teacher ? (<i style={{ fontFamily: 'BYekan', color: '#e74c3c', fontStyle: 'italic' }}>{errors.teacher}</i>) : null}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={10} style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <FormControl variant="outlined" className={classes.formControl} style={{ width: '95%', marginTop: 25, marginRight: 'auto', marginLeft: 'auto' }}>
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
                                                        </FormControl>
                                                        {errors.group && touched.group ? (<i style={{ fontFamily: 'BYekan', color: '#e74c3c', fontStyle: 'italic' }}>{errors.group}</i>) : null}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={12} md={10} style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <TextField
                                                            onBlur={handleBlur('code')}
                                                            value={values.code}
                                                            onChange={handleChange('code')}
                                                            variant='outlined'
                                                            style={{ width: '95%', marginRight: 'auto', marginLeft: 'auto', marginTop: 25 }}
                                                            label='کد درس'
                                                            id="code"
                                                            name='code'
                                                        />
                                                        {errors.code && touched.code ? (<i style={{ fontFamily: 'BYekan', color: '#e74c3c', fontStyle: 'italic' }}>{errors.code}</i>) : null}
                                                    </GridItem>
                                                </GridContainer>
                                            </CardBody>
                                            <CardFooter>
                                                <Button color='secondary' variant='contained' onClick={handleSubmit}>تعریف درس</Button>
                                            </CardFooter>
                                        </Card>
                                    </form>
                                )}
                            </Formik>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card profile>
                                <CardAvatar profile className={classes.cardAvatar}>
                                    <img src={process.env.PUBLIC_URL + '/img/WebBanner1.png'} alt="..." />
                                </CardAvatar>
                                <CardBody profile>
                                    <h4 className={classes.cardTitle}>تعریف درس در سامانه</h4>
                                    <p className={classes.description} style={{ fontSize: 16 }}>
                                        دقت داشته باید که کد هر درس یک کد شش رقمی و یکتا می باشد که هنگام انتخاب واحد برای دانشجو باید در قسمت درس وارد کنید
                            </p>
                                    <p>
                                        در قسمت استاد درس باید کد نه رقمی استاد مورد نظرتان را وارد کنید
                            </p>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                    <ToastContainer />
                </div>
            )}

        </div>
    );
}
export default CreateCourse;