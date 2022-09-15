import { ACTION_TYPES } from "./soundTypes"

export const setSelectedMusic = (music) => {
    return {type: ACTION_TYPES.SET_SELECTED_MUSIC, data: music};
}

export const setBirdVolume = (amount) => {
    return {type: ACTION_TYPES.SET_BIRD_SOUND, data: amount};
}

export const setFireVolume = (amount) => {
    return {type: ACTION_TYPES.SET_FIRE_SOUND, data: amount};
}

export const setWindVolume = (amount) => {
    return {type: ACTION_TYPES.SET_WIND_SOUND, data: amount};
}

export const setWaveVolume = (amount) => {
    return {type: ACTION_TYPES.SET_WAVE_SOUND, data: amount};
}

export const setRainVolume = (amount) => {
    return {type: ACTION_TYPES.SET_RAIN_SOUND, data: amount};
}