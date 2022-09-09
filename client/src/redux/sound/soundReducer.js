import { ACTION_TYPES } from './soundTypes';

const initialState = {
    birdVolume: 0,
    windVolume: 0,
    fireVolume: 0,
    rainVolume: 0,
    waveVolume: 0,
}

export const soundReducer = (state = initialState, action) => {
    let resultState = { ...state };

    switch (action.type) {
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