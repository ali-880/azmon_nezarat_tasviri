import axios from "axios"
import { configUrl } from "Costume/Url";
import { toast } from 'react-toastify';

export const handleGetGroup = () => {
    return async (dispatch, getstate) => {
        try {
            const result = await axios.get(`${configUrl.url}group`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            await dispatch({ type: 'handleGetGroup', payload: [...result.data] })
        } catch (e) {
            if (e.response.status === 500) {
                toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
            }
        }
    }
}