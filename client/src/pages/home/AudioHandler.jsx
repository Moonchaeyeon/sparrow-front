import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBirdVolume, setFireVolume, setRainVolume, setWaveVolume } from "../../redux/sound/soundAction";
import { ReactComponent as DownArrow } from '../../assets/svg/down_arrow.svg';
import { ReactComponent as Bird } from '../../assets/svg/bird.svg';
import { ReactComponent as Fire } from '../../assets/svg/fire.svg';
import { ReactComponent as Wave } from '../../assets/svg/wave.svg';
import { ReactComponent as Rain } from '../../assets/svg/rain.svg';
import './AudioHandler.scss';

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0);
  
    const toggle = () => setPlaying(!playing);
    const changeVolume = (amount) => { setVolume(amount); console.log(amount); }
    
    useEffect(()=>{
        audio.loop = true;
        audio.pause();
    }, [])

    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );
  
    useEffect(()=> {
        if (volume !== 0) {
            if (!playing) setPlaying(true);
            audio.volume = volume;
            console.log("음악 들리는 중 : ", volume, playing)
        } else {
            setPlaying(false);
            console.log("음악 멈췄음", playing)
        }
    }, [volume])

    useEffect(() => {
      audio.loop = true;
    }, []);
  
    return [playing, changeVolume];
};

function AudioHandler() {
    const dispatch = useDispatch();
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

    useEffect(()=>{
        console.log("bird : ", birdVolume);
        console.log("fire : ", fireVolume);
        console.log("wave : ", waveVolume);
        console.log("rain : ", rainVolume);
    }, [birdVolume, fireVolume, rainVolume, waveVolume])
    
    return (
        <div className="audio-handler">
            <div className="header" onClick={()=>{setVolumePlay(true)}}>
                사운드 설정 <DownArrow className="down-arrow"/>
            </div>
            <ul className="sound-setting-container">
                {
                    soundInfoList.map((sound, idx) => (
                        <li className="sound-setting-elem" key={idx}>
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
        </div>
    )
}
export default AudioHandler;