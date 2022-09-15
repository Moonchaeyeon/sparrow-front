import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAudio from "../../hooks/useAudio";
import { setBirdVolume, setFireVolume, setRainVolume, setWaveVolume } from "../../redux/sound/soundAction";
import { ReactComponent as SoundOn } from '../../assets/svg/sound_on.svg';
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
    const birdSound = useSelector(state=>state.sound.birdSound);
    const fireSound = useSelector(state=>state.sound.fireSound);
    const oceanSound = useSelector(state=>state.sound.oceanSound);
    const rainSound = useSelector(state=>state.sound.rainSound);

    let [birdPlaying, changeBirdVolume] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/bird.wav`);
    let [firePlaying, changeFireVolume] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/firewood.wav`);
    let [wavePlaying, changeWaveVolume] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/wind.wav`);
    let [rainPlaying, changeRainVolume] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/rain.wav`);

    const soundInfoList = [
        { name: 'bird', volume: birdSound, icon: <Bird/>, setVolume: function (e) {dispatch(setBirdVolume(e.currentTarget.value)); changeBirdVolume(e.currentTarget.value/100)} },
        { name: 'fire', volume: fireSound, icon: <Fire/>, setVolume: function (e) {dispatch(setFireVolume(e.currentTarget.value)); changeFireVolume(e.currentTarget.value/100)} },
        { name: 'wave', volume: oceanSound, icon: <Wave/>, setVolume: function(e){dispatch(setWaveVolume(e.currentTarget.value)); changeWaveVolume(e.currentTarget.value/100)} },
        { name: 'rain', volume: rainSound, icon: <Rain/>, setVolume: function(e){dispatch(setRainVolume(e.currentTarget.value)); changeRainVolume(e.currentTarget.value/100)} }
    ]
    
    return (
        <div className="audio-handler"
            id={smallView ? "small-view" : null}
        >
            {/* <div 
                className="header" 
                onClick={()=>{setVolumePlay(true)}}
            >
                <SoundOn className="sound-icon"/>
                <DownArrow 
                    className="down-arrow"
                    onClick={()=>{setSmallView(!smallView)}}
                />
            </div> */}
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