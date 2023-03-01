import { ACTION_TYPES } from './soundTypes';
import musicInfoList from '../../utils/data/musicList';

const initialState = {
    selectedMusic: musicInfoList[0],
    birdSound: 0,
    windVolume: 0,
    fireSound: 0,
    rainSound: 0,
    oceanSound: 0,
}

export const soundReducer = (state = initialState, action) => {
    let resultState = { ...state };

    switch (action.type) {
        case ACTION_TYPES.SET_SELECTED_MUSIC:
            resultState.selectedMusic = action.data;
            break;
        case ACTION_TYPES.SET_BIRD_SOUND:
            resultState.birdSound = action.data;
            break;
        case ACTION_TYPES.SET_WIND_SOUND:
            resultState.windVolume = action.data;
            break;
        case ACTION_TYPES.SET_FIRE_SOUND:
            resultState.fireSound = action.data;
            break;
        case ACTION_TYPES.SET_RAIN_SOUND:
            resultState.rainSound = action.data;
            break;
        case ACTION_TYPES.SET_WAVE_SOUND:
            resultState.oceanSound = action.data;
            break;

        default:
    }

    return resultState;
}