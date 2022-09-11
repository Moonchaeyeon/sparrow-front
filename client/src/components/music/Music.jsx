import { useEffect } from "react";
import useAudio from "../../hooks/userAudio";
import { ReactComponent as Play } from '../../assets/svg/play.svg';
import { ReactComponent as Pause } from '../../assets/svg/pause.svg';
import './Music.scss';

function Music({ music, width, height }) {
    let [playing,,setPlaying] = useAudio(music.musicUrl);

    // useEffect(()=>{
    //  // 1분 미리듣기 기능?!
    // }, [playing])

    return (
        <div className="music-info" style={{width: width, height: height, backgroundImage: `url(${music.coverImage})`}}>
            <div className="music-hover">
                <div className="music-name">{ music.musicName }</div>
                {
                    !playing
                    ? <button className="play" onClick={()=>{setPlaying(true)}}><Play/></button>
                    : <button className="pause" onClick={()=>{setPlaying(false)}}><Pause/></button>
                }
            </div>
        </div>
    )
}
export default Music;