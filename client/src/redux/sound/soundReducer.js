import { ACTION_TYPES } from './soundTypes';

const initialState = {
    birdSound: 0,
    windSound: 0,
    fireSound: 0,
    rainSound: 0,
}

export const contentReducer = (state = initialState, action) => {
    let resultState = { ...state };

    switch (action.type) {
        case ACTION_TYPES.SET_BIRD_SOUND:
            resultState.birdSound = action.data;
            break;
        case ACTION_TYPES.SET_WIND_SOUND:
            resultState.birdSound = action.data;
            break;
        case ACTION_TYPES.SET_FIRE_SOUND:
            resultState.birdSound = action.data;
            break;
        case ACTION_TYPES.SET_RAIN_SOUND:
            resultState.birdSound = action.data;
            break;

        default:
    }

    return resultState;
}