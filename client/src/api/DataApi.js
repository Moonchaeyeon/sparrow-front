import store from '../redux/store';
import { setMusicList, setTagList } from '../redux/data/dataAction';
import { setSelectedMusic } from '../redux/sound/soundAction';
import { get, post, put, destroy } from './AxiosCreate';

class UserApi {
    getTagInfoList = async () => {
        const res = await get('/tag');
        store.dispatch(setTagList(res.data));
        return res.data;
    }

    getMusicInfoList = async () => {
        const res = await get('/music');
        store.dispatch(setMusicList(res.data));
        // 랜덤으로 meditation music을 선택
        store.dispatch(setSelectedMusic(res.data[Math.floor(Math.random() * res.data.length)]));
        return res.data;
    }
}

export default UserApi;