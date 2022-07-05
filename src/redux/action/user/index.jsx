import axios from "axios"
import { configUrl } from "Costume/Url";
import { replace } from "lodash";
import { toast } from 'react-toastify';

export const handleGetUserForAdmin = (data) => {
    return async (dispatch, getstate) => {
        try {
            const result = await axios.post(`${configUrl.url}admin/user/show`, data, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            await dispatch({ type: 'handleGetUserForAdmin', payload: [...result.data] })
        } catch (e) {
            if (e.response.status === 500) {
                toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
            } else if (e.response.status === 403) {
                toast.warning('با اطلاعات هویتی شما این عمل مجاز نمی باشد', { position: 'top-right' })
            } else if (e.response.status === 401) {
                toast.warning('برای انجام این درخواست لطفا ابتدا در سامانه ثبت نام کنید', { position: 'top-right' })
            } else if (e.response.status === 405) {
                localStorage.removeItem('token')
            }
        }
    }
}
export const handleDeleteUser = (id) => {
    return async (dispatch, getstate) => {
        try {
            await axios.delete(`${configUrl.url}user/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const user = [...getstate().AdminUsers];
            const new_data = user.filter((item) => item._id !== id);
            await dispatch({ type: 'handleDeleteUser', payload: [...new_data] })
        } catch (e) {
            if (e.response.status === 500) {
                toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
            } else if (e.response.status === 403) {
                toast.warning('با اطلاعات هویتی شما این عمل مجاز نمی باشد', { position: 'top-right' })
            } else if (e.response.status === 401) {
                toast.warning('برای انجام این درخواست لطفا ابتدا در سامانه ثبت نام کنید', { position: 'top-right' })
            } else if (e.response.status === 405) {
                localStorage.removeItem('token')
            }
        }
    }
}
export const handleLogin = (data, replace) => {
    return async (dispatch, getstate) => {
        try {
            await dispatch({ type: 'setLoddingTrue' })
            const user = await axios.post(`${configUrl.url}login`, data);
            localStorage.setItem('token', user.data.token)
            await dispatch({ type: 'handleLogin', payload: { ...user.data.user } })
            await dispatch({ type: 'closeLodding' })
            replace('/')
            if(user.data.user.role!=='admin'){
                toast.success(`${user.data.user.name} ${user.data.user.lastName} لیست دروس و امتحانات شما در ترم جاری در قسمت زیر قابل مشاهده است `,{position:'top-right',autoClose:9000})
            }else{
                toast.success('شما در صورت لزوم می توانید درس یا دانشجو یا استاد و ادمین دیگری برای سایت در این قسمت تعریف کنید')
            }
        } catch (e) {
            console.log(e)
            await dispatch({ type: 'closeLodding' })
            if (e.response.status === 500) {
                toast.error('مشکلی از سمت سرور پیش آمده لطفا مجددا تلاش کنید', { position: 'top-right' })
            }else if(e.response.status===403){
                toast.error('رمز عبور و شماره دانشجویی با هم مطابقت ندارد در صورت فراموشی رمز عبور وارد قسمت بازیابی رمز عبور شوید',{position:'top-right', className:{}})
            }else if (e.response.status === 404) {
                toast.error('دانشجویی با این شماره دانشجویی در سامانه ثبت نشده است', { position: 'top-right' })
            } else if (e.response.status === 405) { 
                localStorage.removeItem('token')
            }
        }

    }
}
export const handleUserGetLessons = (replace) => {
    return async (dispatch) => {
        try {
            const result = await axios.get(`${configUrl.url}user/student/lessons`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            await dispatch({ type: 'handleUserGetLessons', payload: [...result.data] })
        } catch (e) {
            console.log(e)
                await dispatch({type:'removeUser',payload:{}})
                localStorage.removeItem('token')
                replace('/')            
        }
    }
}
export const handleCheckUserImage = (image,exam_id,replace,flag,imageUser) => {
    return async (dispatch, getstate) => {
        try {
            const form = new FormData();
            form.append('image', image);
            form.append('exam_id',exam_id)
            form.append('imageUser',imageUser)
            await dispatch({type:'setLoddingTrue'})
            const result = await axios.post(`${configUrl.url}user/checkImage`, form, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            await dispatch({type:'closeLodding'})            
            console.log(result.data.data)
            if (result.data.statusCode===200){
                if(result.data.data.similarPercent>80){
                    replace(`/examPage/${exam_id}?p=T`)
                }else{
                    replace('/')
                }
            }else{
                replace('/')
            }
        } catch (e) {
            replace('/')
            console.log(e);
            toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
        }
    }
}


export const handleSetOneQuestion=(index)=>{
    return async(dispatch,getstate)=>{
        try {
            const questions=[...getstate().Questions]
            const question=questions[index]
            await dispatch({type:'handleSetOneQuestion',payload:question})
        } catch (e) {
            
        }
    }
}