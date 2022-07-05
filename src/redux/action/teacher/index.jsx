import axios from 'axios';
import { configUrl } from './../../../Costume/Url';
import { toast } from 'react-toastify';
export const handleGetLessonsForTeacher=()=>{
    return async(dispatch,getstate)=>{
       try{
            const result=await axios.get(`${configUrl.url}teacher/courses`,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            await dispatch({type:'handleGetLessonsForTeacher',payload:[...result.data]})
       }catch(e){
            toast.error('اشتباهی پیش امده است لطفا مجددا تلاش کنید',{position:'top-right'})
       }
    }
}
export const handleCreateExam=(name,course,year,month,day,hour,min,end)=>{
    return async(dispatch,getstate)=>{
        try {
            const data={
                name,
                course,
                year,
                month,
                day,
                hour,
                min,
                end
            }
            const result=await axios.post(`${configUrl.url}exam`,data,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            await dispatch({type:'handleCreateExam',payload:result.data})
            await dispatch({type:'handleAddExamToExams',payload:[result.data,...getstate().Exams]})
            toast.success('امتحان شما با موفقیت به سامانه اضافه شود',{position:'top-right'})
        } catch (e) {
            console.log(e);
            toast.error('اشتباهی پیش امده است لطفا مجددا تلاش کنید',{position:'top-right'})
        }
    }
}
export const handleAddTextQuestion=(exam,text,score)=>{
    return async(dispatch,getstate)=>{
        try {
            const data={
                exam,
                text,
                score
            }
            await axios.post(`${configUrl.url}AddTextQuestion`,data,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            let new_que={
                text:text,
                score:score,
                type:'text'
            }
            await dispatch({type:'handleAddTextQuestion',payload:[new_que,...getstate().Questions]})
            toast.success('با موفقیت سوال متنی شما به سوالات امتحان اضافه شود')
        } catch (error) {
            toast.error('اشتباهی پیش امده است لطفا مجددا تلاش کنید',{position:'top-right'})
        }
    }
}
export const handleAddTestQuestion=(exam,test,Text1,Text2,Text3,Text4,score)=>{
    return async(dispatch,getstate)=>{
        try {
            const data={
                exam,
                text:test,
                answ1:Text2,
                answ2:Text3,
                answ3:Text4,
                true_ans:Text1,
                score
            }
            await axios.post(`${configUrl.url}AddTestQuestion`,data,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            let new_que={
                text:test,
                score:score,
                type:'test'
            }
            await dispatch({type:'handleAddTestQuestion',payload:[new_que,...getstate().Questions]})
            toast.success('با موفقیت سوال تستی شما به سوالات امتحان اضافه شود')
        } catch (error) {
            toast.error('اشتباهی پیش آمده است لطفا مجددا تلاش کنید',{position:'top-right'})
        }
    }
}
export const handleAddFileQuestion=(exam,file,score)=>{
    return async(dispatch,getstate)=>{
        try {
            const data={
                exam,
                file,
                score
            }
            await axios.post(`${configUrl.url}AddFileQuestion`,data,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            let new_que={
                text:file,
                type:'file',
                score:score
            }
            toast.success('با موفقیت سوال با فرمت فایل به سوالات امتحان اضافه شود')
            await dispatch({type:'handleAddFileQuestion',payload:[new_que,...getstate().Questions]})
        } catch (error) {
            toast.error('اشتباهی پیش امده است لطفا مجددا تلاش کنید',{position:'top-right'})
        }
    }
}

export const handleGetUserResponse=(user_id,exam_id)=>{
    return async(dispatch,getstate)=>{
        try {
            if(user_id.length===9){
                const data={
                    user_id,
                    exam_id
                }
                const result=await axios.post(`${configUrl.url}teacher/user/response`,data,{
                    headers: {
                        'Authorization': localStorage.getItem('token')
                }})
                console.log(result.data)
                await dispatch({type:"handleGetUserResponse",payload:[...result.data.results.results]})
                await dispatch({type:"handleGetUserResponsePhoto",payload:[...result.data.results.Photo]})
                await dispatch({type:"handleGetUserForTeacher",payload:result.data.user})
                toast.success('پاسخ های دانشجو را می توانید در قسمت زیر مشاهده کنید')
           }else{
               toast.info('شماره دانشجویی شامل نه کاراکتر می باشد',{position:'top-right'})
           }
        } catch (e) {
            toast.warning('پاسخی برای این کاربر ثبت نشده است آیا از درستی شماره دانشجویی اطمینان دارید ?')
            console.log(e);
        }
    }
}