import React from 'react'
import { InputLabel, TextField, ButtonGroup, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addFileCounter, addTestCounter } from 'redux/action/utils';
import { minFileCounter, ResetFileCounter, addTextCounter, minTestCounter } from './../../../redux/action/utils/index';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { handleAddFileQuestion, handleAddTextQuestion } from './../../../redux/action/teacher/index';
import { minTextCounter } from 'redux/action/utils';
import { Button } from '@material-ui/core';
import { handleAddTestQuestion } from 'redux/action/teacher';
const useStyle=makeStyles((theme)=>{
    return{
        score: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 15
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
const CreateQuestion = (props) => {
    const dispatch=useDispatch()
    const classes=useStyle()
    const testCounter = useSelector(state => state.TestScore)
    const textCounter = useSelector(state => state.TextScore)
    const fileCounter = useSelector(state => state.FileScore)
    const exam = useSelector(state => state.Exam)
    return (
        <>
            <InputLabel style={{ marginBottom: 20, marginTop: 20 }}>سوال به صورت فایل : </InputLabel>
            <TextField value={props.file} onChange={(event) => {props.SetFile(event.target.value) }} className={classes.createQues} variant='outlined' label='متن سوال' />
            <div className={classes.score}>
                <InputLabel style={{ marginRight: 20, marginLeft: 20 }}>نمره ی سوال : </InputLabel>
                <ButtonGroup style={{ marginLeft: 40, marginRight: 20 }}>
                    <Button onClick={() => { dispatch(addFileCounter()) }}>+</Button>
                    <Button>{fileCounter}</Button>
                    <Button onClick={() => { dispatch(minFileCounter()) }}>-</Button>
                </ButtonGroup>
            </div>
            <Button onClick={() => {
                if (props.file == '') {
                    toast.info('وارد کردن متن سوال برای تعریف سوال جدید الزامی است')
                } else {
                    dispatch(handleAddFileQuestion(exam._id,props.file, fileCounter))
                    props.SetFile('')
                    dispatch(ResetFileCounter())
                }
            }} variant='contained' color='primary'>ایجاد سوال</Button>
            <Divider style={{ marginTop: 30, marginBottom: 10, backgroundColor: 'black' }} />
            <InputLabel style={{ marginBottom: 20, marginTop: 20 }}>سوال به صورت متن : </InputLabel>
            <TextField value={props.text} onChange={(event) => { props.SetText(event.target.value) }} className={classes.createQues} variant='outlined' label='متن سوال' />
            <div className={classes.score}>
                <InputLabel style={{ marginRight: 20, marginLeft: 20 }}>نمره ی سوال : </InputLabel>
                <ButtonGroup style={{ marginLeft: 40, marginRight: 20 }}>
                    <Button onClick={() => { dispatch(addTextCounter()) }}>+</Button>
                    <Button>{textCounter}</Button>
                    <Button onClick={() => { dispatch(minTextCounter()) }}>-</Button>
                </ButtonGroup>
            </div>
            <Button onClick={() => {
                if (props.text == '') {
                    toast.info('وارد کردن متن سوال برای تعریف سوال جدید الزامی است')
                } else {
                    dispatch(handleAddTextQuestion(exam._id, props.text, textCounter))
                    props.SetText('')
                    dispatch({ type: 'ResetTextScore' })
                }
            }} variant='contained' color='primary'>ایجاد سوال</Button>
            <Divider style={{ marginTop: 30, marginBottom: 10, backgroundColor: 'black' }} />
            <InputLabel style={{ marginBottom: 20, marginTop: 20 }}>سوال به صورت تستی : </InputLabel>
            <TextField value={props.test} onChange={(event) => { props.SetTest(event.target.value) }} className={classes.createQues} variant='outlined' label='متن سوال' />
            <div className={classes.testInput}>
                <TextField value={props.Text1} onChange={(event) => { props.SetText1(event.target.value) }} className={classes.testInput1} variant='outlined' label='پاسخ درست' />
                <TextField value={props.Text2} onChange={(event) => { props.SetText2(event.target.value) }} className={classes.testInput1} variant='outlined' label='پاسخ اشتباه' />
                <TextField value={props.Text3} onChange={(event) => { props.SetText3(event.target.value) }} className={classes.testInput1} variant='outlined' label='پاسخ اشتباه' />
                <TextField value={props.Text4} onChange={(event) => { props.SetText4(event.target.value) }} className={classes.testInput1} variant='outlined' label='پاسخ اشتباه' />
            </div>
            <div style={{ display: 'block', dispatch: 'flex', flexDirection: 'row', marginTop: 20 }}>
                <InputLabel style={{ marginRight: 20, marginLeft: 20, marginBottom: 10 }}>نمره ی سوال : </InputLabel>
                <ButtonGroup style={{ marginLeft: 40, marginRight: 20 }}>
                    <Button onClick={() => { dispatch(addTestCounter()) }}>+</Button>
                    <Button>{testCounter}</Button>
                    <Button onClick={() => { dispatch(minTestCounter()) }}>-</Button>
                </ButtonGroup>
            </div>
            <Button onClick={() => {
                if (props.test == '') {
                    toast.info('وارد کردن متن سوال برای تعریف سوال جدید الزامی است')
                } else {
                    dispatch(handleAddTestQuestion(exam._id, props.test, props.Text1, props.Text2, props.Text3, props.Text4,testCounter))
                    props.SetTest('')
                    props.SetText1('')
                    props.SetText2('')
                    props.SetText3('')
                    props.SetText4('')
                    dispatch({ type: 'REsetTestScore' })
                }
            }} style={{ marginTop: 20, }} variant='contained' color='primary'>ایحاد سوال</Button>

        </>
    );
}

export default CreateQuestion;