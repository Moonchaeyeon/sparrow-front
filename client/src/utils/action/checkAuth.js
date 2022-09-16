import store from '../../redux/store';
import UserApi from "../../api/UserApi";
import { setAuth } from '../../redux/userData/userDataAction';

const userApi = new UserApi();

export const checkAuth = async () => {
    try {
        await userApi.getUserInfo();
        store.dispatch(setAuth(true));
    } catch(err) {
        if (err.status === 403) {
            await userApi.getAccessToken();
        } else {
            store.dispatch(setAuth(false));
        }
    }
}

export default checkAuth;