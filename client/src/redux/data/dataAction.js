import { ACTION_TYPES } from "./dataTypes"

export const setTagList = (tagList) => {
    return {type: ACTION_TYPES.SET_TAG_LIST, data: tagList};
}

export const setMusicList = (musicList) => {
    return {type: ACTION_TYPES.SET_MUSIC_LIST, data: musicList};
}