import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAudio from "../../hooks/userAudio";
import { setBirdVolume, setFireVolume, setRainVolume, setWaveVolume } from "../../redux/sound/soundAction";
import { ReactComponent as DownArrow } from '../../assets/svg/down_arrow.svg';
import { ReactComponent as Bird } from '../../assets/svg/bird.svg';
import { ReactComponent as Fire } from '../../assets/svg/fire.svg';
import { ReactComponent as Wave } from '../../assets/svg/wave.svg';
import { ReactComponent as Rain } from '../../assets/svg/rain.svg';
import './AudioHandler.scss';

function AudioHandler() {
    const dispatch = useDispatch();
    const [smallView, setSmallView] = useState(false);
    const [soundPlay, setVolumePlay] = useState(false);
    const birdVolume = useSelector(state=>state.sound.birdVolume);
    const fireVolume = useSelector(state=>state.sound.fireVolume);
    const waveVolume = useSelector(state=>state.sound.waveVolume);
    const rainVolume = useSelector(state=>state.sound.rainVolume);

    let [birdPlaying, changeBirdVolume] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/bird.wav`);
    let [firePlaying, changeFireVolume] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/firewood.wav`);
    let [wavePlaying, changeWaveVolume] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/wind.wav`);
    let [rainPlaying, changeRainVolume] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/rain.wav`);

    const soundInfoList = [
        { name: 'bird', volume: birdVolume, icon: <Bird/>, setVolume: function (e) {dispatch(setBirdVolume(e.currentTarget.value)); changeBirdVolume(e.currentTarget.value/100)} },
        { name: 'fire', volume: fireVolume, icon: <Fire/>, setVolume: function (e) {dispatch(setFireVolume(e.currentTarget.value)); changeFireVolume(e.currentTarget.value/100)} },
        { name: 'wave', volume: waveVolume, icon: <Wave/>, setVolume: function(e){dispatch(setWaveVolume(e.currentTarget.value)); changeWaveVolume(e.currentTarget.value/100)} },
        { name: 'rain', volume: rainVolume, icon: <Rain/>, setVolume: function(e){dispatch(setRainVolume(e.currentTarget.value)); changeRainVolume(e.currentTarget.value/100)} }
    ]
    
    return (
        <div className="audio-handler"
            id={smallView ? "small-view" : null}
        >
            <div 
                className="header" 
                onClick={()=>{setVolumePlay(true)}}
            >
                사운드 설정 
                <DownArrow 
                    className="down-arrow"
                    onClick={()=>{setSmallView(!smallView)}}
                />
            </div>
            {
                !smallView &&
                <ul className="sound-setting-container">
                    {
                        soundInfoList.map((sound, idx) => (
                            <li 
                                className={sound.volume === 0 ? "sound-setting-elem" : "sound-setting-elem active"}
                                id={sound.name}
                                key={idx}
                            >
                                { sound.icon }
                                <input 
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={sound.volume}
                                    onChange={(e)=>{sound.setVolume(e)}}
                                />
                                <span className="sound-amount">{ sound.volume }</span>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}
export default AudioHandler;