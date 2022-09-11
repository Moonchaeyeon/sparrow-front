import { useState, useEffect } from "react";

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0);
  
    const toggle = () => setPlaying(!playing);
    const changeVolume = (amount) => { setVolume(amount) }
    
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
        } else {
            setPlaying(false);
        }
    }, [volume])

    useEffect(() => {
      audio.loop = true;
    }, []);
  
    return [playing, changeVolume, setPlaying];
};
export default useAudio;