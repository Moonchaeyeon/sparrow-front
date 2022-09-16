export const timeToString = (time) => {
    const dateInfo = time.split('T')[0].split('-');
    return `${dateInfo[0]}.${dateInfo[1]}.${dateInfo[2]}`
}

export const secToString = (_sec) => {
    const hour = Math.floor(_sec / 3600);
    const min = Math.floor(_sec / 60 - hour * 60);
    const sec = _sec % 60;
    
    return `${hour}시간 ${min}분 ${sec}초`;
}