import { useState, useEffect } from "react";

const useAudio = url => {
    const [audio, setAudio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0);
  
    const toggle = () => setPlaying(!playing);
    const changeVolume = (amount) => { setVolume(amount) }
    
    useEffect(()=> {
        if (!!audio) {
            audio.loop = true;
            audio.pause();
        }
    }, [audio])

    useEffect(() => {
        (!!audio && playing) ? audio.play() : audio.pause();
      },
      [audio, playing]
    );
  
    useEffect(()=> {
        if (!!audio) {
            if (volume !== 0) {
                if (!playing) setPlaying(true);
                audio.volume = volume;
            } else {
                setPlaying(false);
            }
        }
    }, [audio, volume])

    return [playing, changeVolume, setPlaying];
};
export default useAudio;