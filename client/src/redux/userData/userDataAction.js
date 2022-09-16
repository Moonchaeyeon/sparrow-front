import { ACTION_TYPES } from "./userDataTypes"

export const setAuth = (auth) => {
    return {type: ACTION_TYPES.SET_AUTH, data: auth};
}

export const setProfileImage = (imagePath) => {
    return {type: ACTION_TYPES.SET_PROFILE_IMAGE, data: imagePath};
}

export const setName = (name) => {
    return {type: ACTION_TYPES.SET_NAME, data: name};
}

export const setTotalDuration = (sec) => {
    return {type: ACTION_TYPES.SET_TOTAL_DURATION, data: sec};
}

export const setMeditating = (meditating) => {
    return {type: ACTION_TYPES.SET_MEDITATING, data: meditating};
}

export const setFaceDetection = (faceDetected) => {
    return {type: ACTION_TYPES.SET_MEDITATING, data: faceDetected};
}