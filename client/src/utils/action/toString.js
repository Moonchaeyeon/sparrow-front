export const timeToString = (time) => {
    const dateInfo = time.split('T')[0].split('-');
    return `${dateInfo[0]}.${toPad(dateInfo[1])}.${toPad(dateInfo[2])}`
}

export const secToString = (_sec) => {
    const hour = Math.floor(_sec / 3600);
    const min = Math.floor(_sec / 60 - hour * 60);
    const sec = _sec % 60;
    
    return `${hour}시간 ${toPad(min)}분 ${toPad(sec)}초`;
}

export const toPad = (any, length=2, str='0') => {
    return String(any).padStart(length, str);
}