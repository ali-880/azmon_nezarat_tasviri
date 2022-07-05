import axios from "axios"
import { configUrl } from "Costume/Url";
import { toast } from 'react-toastify';

export const handleGetLessonForChatPage = (id,replace) => {
    return async (dispatch, getstate) => {
        try {
            const result = await axios.get(`${configUrl.url}lessens/chatpage/${id}`,{headers:{
                'Authorization':localStorage.getItem('token')
            }});
            const lesson={
                _id:result.data._id,
                name:result.data.name,
                group:result.data.group,
            }
            await dispatch({ type: 'handleGetMsgForChatPage', payload: [...result.data.msg] });
            await dispatch({ type: 'handleGetUsersForChatPage', payload: [...result.data.users] });
            await dispatch({ type: 'handleGetLessonForChatPage', payload: {...lesson} });
            await dispatch({type:'handleGetTeacherForChatPage',payload:{...result.data.teacher}})
        }catch{
            replace('/')
            toast.error('مشکلی رخ داده است چند لحضه ی دیگر دوباره تلاش کنید',{position:'top-right'})
        }
    }
}
export const handleGetTeacherChat=(course_id)=>{
    return async(dispatch,getstate)=>{
        const result=await axios.get(`${configUrl.url}chatWithTeacher/${course_id}`,{headers:{
            'Authorization':localStorage.getItem('token')
        }})
        await dispatch({type:"setUserChatWithTeacher",payload:[...result.data]})
    }
}
export const handleGetstudentChat=(course_id,user_id)=>{
    return async(dispatch,getstate)=>{
        const result=await axios.get(`${configUrl.url}chatWithStudent/${course_id}/${user_id}`)
        await dispatch({type:"setUserChatWithTeacher",payload:[...result.data]})
    }
}