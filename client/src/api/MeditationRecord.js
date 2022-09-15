import { get, post, put, destroy } from './AxiosCreate';

class MeditationRecordApi {
    getRecordList = async (page = 0) => {
        const res = await get(`meditation-record?page=${page}`);
        return res.data;
    }

    postRecordList = async (recordInfo) => {
        const res = await post(`meditation-record`, recordInfo);
        return res.data;
    }

    editRecordList = async (recordInfo) => {
        const res = await put(`meditation-record`, recordInfo);
        return res.data;
    }

    deleteRecordList = async (recordId) => {
        const res = await destroy(`meditation-record`, {
            meditationRecordId : recordId
        });
        return res.data;
    }
}

export default MeditationRecordApi;