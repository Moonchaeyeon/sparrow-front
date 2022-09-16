import store from '../redux/store';
import { setAuth, setName, setProfileImage, setTotalDuration } from '../redux/userData/userDataAction';
import { get, post, put, destroy } from './AxiosCreate';

class UserApi {
    getAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const res = await get(`no-login/user/create-access?refreshPassword=${process.env.REACT_APP_PASSWORD}&refreshToken=${refreshToken}`);
            localStorage.setItem('accessToken', res.data);
            return res.data;
        } catch(e) {
            store.dispatch(setAuth(false));
            return false;
        }
    }

    getUserInfo = async () => {
        const res = await get('user');
        store.dispatch(setProfileImage(res.data.profileImage));
        store.dispatch(setName(res.data.name));
        store.dispatch(setTotalDuration(res.data.duration));
        
        return res.data;
    }
}

export default UserApi;