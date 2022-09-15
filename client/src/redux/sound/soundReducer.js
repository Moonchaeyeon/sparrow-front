import { ACTION_TYPES } from './soundTypes';

const initialState = {
    selectedMusic: {
        musicId: 1,
        musicName: "dream1",
        musicPath: `${process.env.PUBLIC_URL}/assets/audio/default.m4a`,
        musicImagePath: "https://i1.sndcdn.com/artworks-iNoCtQtBunQqZyJx-I3y0JQ-t500x500.jpg",
        musicDurationSec: "89",
        composer: "jjong"
    },
    birdVolume: 0,
    windVolume: 0,
    fireVolume: 0,
    rainVolume: 0,
    waveVolume: 0,
}

export const soundReducer = (state = initialState, action) => {
    let resultState = { ...state };

    switch (action.type) {
        case ACTION_TYPES.SET_SELECTED_MUSIC:
            resultState.selectedMusic = action.data;
            break;
        case ACTION_TYPES.SET_BIRD_SOUND:
            resultState.birdVolume = action.data;
            break;
        case ACTION_TYPES.SET_WIND_SOUND:
            resultState.windVolume = action.data;
            break;
        case ACTION_TYPES.SET_FIRE_SOUND:
            resultState.fireVolume = action.data;
            break;
        case ACTION_TYPES.SET_RAIN_SOUND:
            resultState.rainVolume = action.data;
            break;
        case ACTION_TYPES.SET_WAVE_SOUND:
            resultState.waveVolume = action.data;
            break;

        default:
    }

    return resultState;
}