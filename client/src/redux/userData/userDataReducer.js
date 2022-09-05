import { ACTION_TYPES } from './userDataTypes';

const initialState = {
    auth : false,
    myId : null,
    name : '',
    email : '',
    profileImg : null,
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
            resultState.profileImg = action.data;
            break;
        default:
    }

    return resultState;
}