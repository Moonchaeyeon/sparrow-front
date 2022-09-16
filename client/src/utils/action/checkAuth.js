import store from '../../redux/store';
import UserApi from "../../api/UserApi";
import DataApi from "../../api/DataApi";
import { setAuth } from '../../redux/userData/userDataAction';

const userApi = new UserApi();
const dataApi = new DataApi();

export const checkAuth = async () => {
    try {
        await userApi.getUserInfo();
        await dataApi.getTagInfoList();
        await dataApi.getMusicInfoList();
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