import { get } from './AxiosCreate';

class MusicApi {
    getMusicThemeList = async () => {
        const res = await get('music-theme/all');
    }

    getMusicTheme = async () => {
        const res = await get('music-theme');
    }
}

export default MusicApi;