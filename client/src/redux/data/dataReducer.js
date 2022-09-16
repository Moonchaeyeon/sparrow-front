import { ACTION_TYPES } from './dataTypes';

const initialState = {
    tagInfoList : [],
    musicInfoList : [],
}

export const dataReducer = (state = initialState, action) => {
    let resultState = { ...state };

    switch (action.type) {
        case ACTION_TYPES.SET_TAG_LIST:
            resultState.tagInfoList = action.data;
            break;
        case ACTION_TYPES.SET_MUSIC_LIST:
            resultState.musicInfoList = action.data;
            break;

        default:
    }

    return resultState;
}