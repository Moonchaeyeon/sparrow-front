import store from '../redux/store';
import { setAuth, setName, setProfileImage } from '../redux/userData/userDataAction';
import { get, post, put, destroy } from './AxiosCreate';

class UserApi {
    getUserInfo = async () => {
        // const res = await get('user-info');
        let res;
        res.data = {
            name: '문채연',
            profileImage: '',
        }
        store.dispatch(setProfileImage(res.data.profileImage));
        store.dispatch(setName(res.data.name));
        
        return res.data;
    }
}

export default UserApi;