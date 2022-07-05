import axios from 'axios';
import { configUrl } from './../../../Costume/Url';
import { toast } from 'react-toastify';
export const handleGetSingleExam = (id) => {
    return async (dispatch) => {
        try {
            console.log(id)
            await dispatch({ type: 'EmptyResponse', payload: [] })
            const result = await axios.get(`${configUrl.url}exam/${id}`)
            await dispatch({ type: 'handleGetSingleExam', payload: result.data })
            await dispatch({ type: 'handleGetSingleExamLesson', payload: result.data.course })
            const rs = {
                ...result.data.StartTime,
                end: result.data.end,
                duration: result.data.duration
            }
            await dispatch({ type: 'handleGetStartTime', payload: rs })
            await dispatch({ type: 'handleSetQuestions', payload: [...result.data.Questions] })
        } catch (e) {
            console.log(e);
            toast.error('اشتباهی پیش امده است لطفا مجددا تلاش کنید', { position: 'top-right' })
        }
    }
}
export const handleSendResult = (data, index, exam_id, type) => {
    return async (dispatch, getstate) => {
        try {
            if (type === 'text' || type === 'test') {

                const res = {
                    type,
                    data,
                    index: Number(index),
                    exam_id
                }
                let result = await axios.post(`${configUrl.url}sendResult`, res, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                //come back
                toast.success(`پاسخ شما با موفقیت در سامانه ثبت شود`, { position: 'bottom-right', autoClose: 9000, style: { width: 550, height: 110, padding: 10 } })


            } else {
                const form = new FormData();
                form.append('type', type)
                form.append('index', Number(index))
                form.append('exam_id', exam_id)
                form.append('data_file', data)
                let res2 = {
                    q_id: Number(index) + 1,
                }
                let result = await axios.post(`${configUrl.url}sendResult/file`, form, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                //come back

                toast.success(`پاسخ شما با موفقیت در سامانه ثبت شود`, { position: 'bottom-right', autoClose: 9000, style: { width: 550, height: 110, padding: 10 } })
            }
        } catch (e) {
            console.log(e);
            toast.error('اشتباهی پیش امده است لطفا مجددا تلاش کنید', { position: 'top-right' })
        }
    }
}
export const handleUserGetExams = (replace) => {
    return async (dispatch, getstate) => {
        try {
            const result = await axios.get(`${configUrl.url}user/exams`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            await dispatch({ type: 'handleUserGetExams', payload: [...result.data] })
        } catch (e) {
            await dispatch({ type: 'removeUser', payload: {} })
            localStorage.removeItem('token')
            replace('/')
        }
    }
}

export const handleGetOneExamForAddQues = (exam_id, back) => {
    return async (dispatch, getstate) => {
        try {
            if (exam_id !== '0') {
                const exams = [...getstate().Exams];
                const filter = exams.findIndex((item) => item._id === exam_id);
                if (filter !== -1) {
                    const results = await axios.get(`${configUrl.url}questions/${exam_id}`, {
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    });
                    dispatch({ type: 'handleGetquestionsforExam', payload: [...results.data] })
                    dispatch({ type: 'handleGetOneExamForAddQues', payload: exams[filter] })
                    dispatch({ type: 'handleTeacherExamChangeSetTime', payload: exams[filter].StartTime })
                } else {
                    back()
                    toast.error('این امتحان در سامانه تعریف نشده است', { position: 'bottom-right' })
                }
            } else {
                toast.warning('باید از لیست امتحانات گزینه ای را انتخاب کنید')
            }
        } catch (e) {
            console.log(e);
            back()
            toast.error('اشتباهی پیش آمده است لطفا مجددا تلاش کنید', { position: 'top-right' })
        }
    }
}
export const handleDeleteQuestion = (exam, q_id) => {
    return async (dispatch, getstate) => {
        try {
            await axios.delete(`${configUrl.url}question/${exam}/${q_id}`);
            let ques = [...getstate().Questions];
            const results = ques.filter((item) => item._id !== q_id)
            await dispatch({ type: 'handleDeleteQuestion', payload: [...results] })
        } catch (error) {
            toast.error('اشتباهی پیش امده است لطفا مجددا تلاش کنید', { position: 'top-right' })

        }
    }
}
export const handleUpdateExam = (exam_id, name, course, year, month, day, hour, min, end) => {
    return async (dispatch, getstate) => {
        try {
            let data = {
                name,
                course,
                year,
                month,
                day,
                hour,
                min,
                end
            }
            let result = await axios.put(`${configUrl.url}exam/${exam_id}`, data, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            const exams = [...getstate().Exams];
            const index = exams.findIndex((item) => item._id === exam_id)
            exams[index] = result.data;
            await dispatch({ type: 'handleUpdateExams', payload: [...exams] })
            await dispatch({ type: 'handleUpdateExam', payload: result.data })
            await dispatch({ type: 'handleUpdateExamStartTime', payload: result.data.StartTime })

            toast.success('امتحان شما با موفقیت آپدیت شود', { position: 'top-right' })
        } catch (e) {
            console.log(e);
            toast.error('اشتباهی پیش امده است لطفا مجددا تلاش کنید', { position: 'top-right' })
        }
    }
}