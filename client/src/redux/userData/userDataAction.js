import { ACTION_TYPES } from "./userDataTypes"

export const setMeditating = (meditating) => {
    return {type: ACTION_TYPES.SET_MEDITATING, data: meditating};
}

export const setFaceDetection = (faceDetected) => {
    return {type: ACTION_TYPES.SET_MEDITATING, data: faceDetected};
}