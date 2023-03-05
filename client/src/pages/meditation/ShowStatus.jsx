function ShowStatus({ faceDetected, status }) {
    const FACE_NOT_DETECTED = '얼굴이 감지되지 않았습니다';
    const MEDITATION_START = '명상을 시작합니다';
    const MEDITATION_ING = '명상하는 중입니다';
    const MEDITATION_END = '명상을 종료합니다';

    return (
        <div className="show-status">
            {
                faceDetected
                ?
                <>
                { status === 'START' && MEDITATION_START }
                { status === 'ING' && MEDITATION_ING }
                { status === 'END' && MEDITATION_END }
                </>
                : FACE_NOT_DETECTED
            }
        </div>
    )
}
export default ShowStatus;