import { useEffect } from "react";
import useAudio from "../../hooks/userAudio";

function MusicHandler({ status }) {
    let [playing,,setPlayingMusic] = useAudio(`${process.env.PUBLIC_URL}/assets/audio/default.wav`);

    useEffect(()=>{
        if(status === 'ING') {
            setPlayingMusic(true);
        } else {
            setPlayingMusic(false);
        }
    }, [status])

    return (
        <>
        <button>

        </button>
        </>
    )
}
export default MusicHandler;