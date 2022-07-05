import axios from "axios"
import { configUrl } from 'Costume/Url';
import { toast } from 'react-toastify';

export const handleGetInfoSystem=()=>{
    return async(dispatch)=>{
        try{
            const result=await axios.get(`${configUrl.url}getSystemInfo`,{headers:{
                'Authorization':localStorage.getItem('token')
            }});
            await dispatch({type:'handleGetInfoSystem',payload:{...result.data}});
            await dispatch({type:'HandleAdmin',payload:[...result.data.admin]});
        }catch(e){
            if(e.response.status===405){
                localStorage.removeItem('token')
            }
            toast.error('مشکلی پیش امده است با عرض پوزش دوباره تلاش کنید',{position:'top-right'})
        }
    }
}
export const handleDeleteAdmin=(id)=>{
    return async (dispatch,getstate)=>{
        try{
            await axios.delete(`${configUrl.url}user/${id}`,{headers:{
                'Authorization':localStorage.getItem('token')
            }});
            const admin=[...getstate().Admin];
            const new_data=admin.map((item)=>item._id!==id);

            await dispatch({type:'handleDeleteAdmin',payload:[...new_data]});
        }catch(e){
            if(e.response.status===405){
                localStorage.removeItem('token')
            }
            toast.error('مشکلی پیش امده است با عرض پوزش دوباره تلاش کنید',{position:'top-right'})
        }
    }
}