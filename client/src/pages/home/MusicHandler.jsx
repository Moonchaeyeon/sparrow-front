import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAudio from "../../hooks/useAudio";
import Music from "../../components/music/Music";
import musicInfoList from "../../utils/data/musicList";
import { IoMusicalNotes } from 'react-icons/io5';
import './MusicHandler.scss';


function MusicHandler({ status }) {
    const dispatch = useDispatch();
    const selectedMusic = useSelector(state=>state.sound.selectedMusic);
    let [playing,,setPlayingMusic] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/default.wav`);

    useEffect(()=>{
        if(status === 'ING') {
            setPlayingMusic(true);
        } else {
            setPlayingMusic(false);
        }
    }, [status])

    return (
        <button className="floating-btn music-selector">
            <div className="show-selected-music">
                {/* <MusicIcon/> */}
                <IoMusicalNotes />
                <span className="selected-music-name">{ selectedMusic.musicName }</span>
            </div>

            <div className="music-container">
                <div className="music-wrapper">
                    {
                        musicInfoList.length &&
                        musicInfoList.map((music, idx) => (
                            <div 
                                className="music-elem"
                                key={idx}
                                id={selectedMusic.musicId===music.musicId ? 'selected' : null}
                            >
                                <Music 
                                    music={music}
                                    width="50px"
                                    height="50px"
                                />
                                <div className="music-info-wrapper"
                                    onClick={()=>{dispatch({ type: 'SET_SELECTED_MUSIC', data: music })}}
                                >
                                    <div className="music-name">{ music.musicName }</div>
                                    <div className="music-composer">{ music.composer }</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </button>
    )
}
export default MusicHandler;