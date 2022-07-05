import axios from "axios"
import { configUrl } from '../../../Costume/Url';
import { toast } from 'react-toastify';

export const handleAdminGetCourses = (data) => {
    return async (dispatch, getstate) => {
        try {
            const result = await axios.get(`${configUrl.url}admin/course/show/${data}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            await dispatch({ type: 'handleAdminGetCourses', payload: [...result.data] })
        } catch (e) {
            if (e.response.status === 500) {
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
export const handleDeleteCourse = (id) => {
    return async (dispatch, getstate) => {
        try {
            await axios.delete(`${configUrl.url}course/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const course = [...getstate().AdminCourses];
            const new_data = course.filter((item) => item._id !== id);
            await dispatch({ type: 'handleDeleteCourse', payload: [...new_data] })
        } catch (e) {
            if (e.response.status === 500) {
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