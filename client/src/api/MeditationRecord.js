import { get, post, put, destroy } from './AxiosCreate';

class MeditationRecordApi {
    getRecordList = async (page = 0) => {
        const res = await get(`meditation-record?page=${page}`);
        return res.data;
    }

    postRecordList = async (recordInfo) => {
        // const res = await post(`meditation-record`, recordInfo);
        // return res.data;
        return         {
            "meditationRecordId": 4,
            "disclosure": true,
            "title": "대박ssss",
            "content": "대박",
            "music": {
                "musicId": 1,
                "musicName": "dream1",
                "musicPath": "",
                "musicImagePath": "https://i1.sndcdn.com/artworks-iNoCtQtBunQqZyJx-I3y0JQ-t500x500.jpg",
                "musicDurationSec": "89",
                "composer": "jjong"
            },
            "birdSound": 30,
            "oceanSound": 30,
            "rainSound": 30,
            "fireSound": 30,
            "durationSec": 80,
            "tagIdList": [1, 2, 3, 8]
        };
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