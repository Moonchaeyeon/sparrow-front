import { useState } from "react";
import { useEffect } from "react";

function AudioHandler() {
    const [soundPlay, setSoundPlay] = useState(false);
    let bird = new Audio('../../assets/audio/bird.wav');

    useEffect(()=>{
        if (soundPlay) {
            bird.load();
            bird.play();
            bird.loop = true;
        }

    }, [soundPlay])

    return (
      <button onClick={()=>{setSoundPlay(true)}}>hihi</button>
    )
}
export default AudioHandler;