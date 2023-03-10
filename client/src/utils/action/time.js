export function getDiffSec(date) {
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    return Math.round(diff / 1000);
}

export function secToTime(sec) {
    const date = new Date(null);
    date.setSeconds(sec);
    return date.toISOString().substr(11, 8);
}