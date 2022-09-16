import store from '../redux/store';
import { addDurationTime } from '../redux/userData/userDataAction';
import { get, post, put, destroy } from './AxiosCreate';

class MeditationRecordApi {
    getRecordList = async (page = 0) => {
        const res = await get(`meditation-record?page=${page}`);
        return res.data;
    }

    postRecord = async (recordInfo) => {
        const res = await post(`meditation-record`, recordInfo);
        store.dispatch(addDurationTime(recordInfo.duration));
        return res.data;
    }

    editRecord = async (recordInfo) => {
        const res = await put(`meditation-record`, recordInfo);
        return res.data;
    }

    deleteRecord = async (recordId) => {
        const res = await destroy(`meditation-record`, {
            meditationRecordId : recordId
        });
        return res.data;
    }
}

export default MeditationRecordApi;