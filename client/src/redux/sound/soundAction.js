import { ACTION_TYPES } from "./soundTypes"

export const setBirdSound = (amount) => {
    return {type: ACTION_TYPES.SET_BIRD_SOUND, data: amount};
}

export const setFireSound = (amount) => {
    return {type: ACTION_TYPES.SET_FIRE_SOUND, data: amount};
}

export const setWindSound = (amount) => {
    return {type: ACTION_TYPES.SET_WIND_SOUND, data: amount};
}

export const setRainSound = (amount) => {
    return {type: ACTION_TYPES.SET_RAIN_SOUND, data: amount};
}