import { useEffect } from "react";
import useAudio from "../../hooks/useAudio";
import { ReactComponent as Play } from '../../assets/svg/play.svg';
import { ReactComponent as Pause } from '../../assets/svg/pause.svg';
import './Music.scss';

function Music({ music, width, height }) {
    let [playing,,setPlaying] = useAudio(music.musicPath);

    // useEffect(()=>{
    //  // 1분 미리듣기 기능?!
    // }, [playing])

    return (
        <div className="music-info" style={{width: width, height: height, backgroundImage: `url(${music.musicImagePath})`}}>
            <div className="music-hover">
                <div className="music-name">{ music.musicName }</div>
                {
                    !playing
                    ? <div className="play" onClick={()=>{setPlaying(true)}}><Play/></div>
                    : <div className="pause" onClick={()=>{setPlaying(false)}}><Pause/></div>
                }
            </div>
        </div>
    )
}
export default Music;