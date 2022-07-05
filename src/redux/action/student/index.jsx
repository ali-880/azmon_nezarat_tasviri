import axios from "axios"
import { configUrl } from '../../../Costume/Url';
import { toast } from 'react-toastify';

export const handleStudentGetLessons = (id) => {
    return async (dispatch, getstate) => {
        try {
            const result = await axios.get(`${configUrl.url}student/lessons/${id}`,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            await dispatch({ type: 'handleStudentGetLessons', payload: [...result.data.courses] });
            toast.success(`شما می توانید لیست دروس ${result.data.name} را مشاهده کنید و در صورت نیاز درسی را برای او انتخاب  یا از لیست دروسش حذف کنید`, { position: 'top-right', style: { width: 400, padding: 25 } })
        } catch (e) {
            if (e.response.status === 404 || e.response.status === 400) {
                toast.error('کاربری با این شماره دانشجویی یافت نشود', { position: 'top-right', style: { width: 350, padding: 25 } })
            } if (e.response.status === 500) {
                toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
            } else if (e.response.status === 403) {
                toast.warning('با اطلاعات هویتی شما این عمل مجاز نمی باشد', { position: 'top-right' })
            } else if (e.response.status === 401) {
                toast.warning('برای انجام این درخواست لطفا ابتدا در سامانه ثبت نام کنید', { position: 'top-right' })
            }else if(e.response.status===405){
                localStorage.removeItem('token')
            }
        }
    }
}
export const handleGetLessonForUser = (data) => {
    return async (dispatch, getstate) => {
        try {
            const result = await axios.post(`${configUrl.url}student/lessons`, data,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            await dispatch({ type: 'handleGetLessonForUser', payload: [result.data, ...getstate().StudentCourses] })
            toast.success(`درس شما با موفقیت به لیست دانشجو اضافه شود`, { position: 'top-right', style: { width: 400, padding: 25 } })
        } catch (e) {
            console.log(e)
            if (e.response.status === 500) {
                toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
            } else if (e.response.status === 404) {
                toast.error('درسی با این کد درسی یافت نشود', { position: 'top-right', style: { width: 350, padding: 25 } })
            }else if (e.response.status === 403) {
                toast.warning('با اطلاعات هویتی شما این عمل مجاز نمی باشد', { position: 'top-right' })
            } else if (e.response.status === 401) {
                toast.warning('برای انجام این درخواست لطفا ابتدا در سامانه ثبت نام کنید', { position: 'top-right' })
            }else if(e.response.status===405){
                localStorage.removeItem('token')
            }
        }
    }
}
export const handleDeleteStudentCourse = (user, course) => {
    return async (dispatch, getstate) => {
        try {
            await axios.delete(`${configUrl.url}student/course/${user}/${course}`,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const course_new = [...getstate().StudentCourses];
            const new_data = course_new.filter((item) => item.code !== course);
            await dispatch({ type: 'handleDeleteStudentCourse', payload: [...new_data] })
            toast.success(`درس مورد نظر شما با موفقیت از سامانه حذف شود`, { position: 'top-right', style: { width: 400, padding: 25 } })
        }
        catch (e) {
            if (e.response.status === 500) {
                toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
            } else if (e.response.status === 404) {
                toast.error('درسی با این کد درسی یافت نشود', { position: 'top-right', style: { width: 350, padding: 25 } })
            }else if (e.response.status === 403) {
                toast.warning('با اطلاعات هویتی شما این عمل مجاز نمی باشد', { position: 'top-right' })
            } else if (e.response.status === 401) {
                toast.warning('برای انجام این درخواست لطفا ابتدا در سامانه ثبت نام کنید', { position: 'top-right' })
            }else if(e.response.status===405){
                localStorage.removeItem('token')
            }
        }
    }
}
