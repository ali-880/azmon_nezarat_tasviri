import jwt from 'jsonwebtoken'
import { Store } from './../redux/store/index';
const Auth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const user = jwt.decode(token);
        const time = new Date().getTime();
        if (user.exp > time) {
            await Store.dispatch({ type: 'Auth', payload: { ...user } })
        } else {
            localStorage.removeItem('token')
        }
    }
}
export default Auth