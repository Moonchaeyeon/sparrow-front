import { get } from './AxiosCreate';

class MusicApi {
    getMusicThemeList = async () => {
        const res = await get('music-theme/all');
        return res.data;
    }

    getMusicTheme = async () => {
        const res = await get('music-theme');
        return res.data;
    }
}

export default MusicApi;