import { ACTION_TYPES } from './userDataTypes';

const initialState = {
    auth : false,
    myId : null,
    name : '',
    email : '',
    profileImage : null,
    totalDuration : 0,
}

export const userDataReducer = (state = initialState, action) => {
    let resultState = { ...state };

    switch (action.type) {
        case ACTION_TYPES.SET_AUTH:
            resultState.auth = action.data;
            break;
        case ACTION_TYPES.SET_ID:
            resultState.myId = action.data;
            break;
        case ACTION_TYPES.SET_NAME:
            resultState.name = action.data;
            break;
        case ACTION_TYPES.SET_EMAIL:
            resultState.email = action.data;
            break;
        case ACTION_TYPES.SET_PROFILE_IMAGE:
            resultState.profileImage = action.data;
            break;
        case ACTION_TYPES.SET_TOTAL_DURATION:
            resultState.totalDuration = action.data;
            break;
        case ACTION_TYPES.ADD_DURATION_TIME:
            resultState.totalDuration += action.data;
            break;
        default:
    }

    return resultState;
}