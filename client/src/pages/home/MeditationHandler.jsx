import { useState } from "react";
import MeditationRecord from "../../components/record/MeditationRecord";

function MeditationHandler({  }) {
    const START = 'START';
    const ING = 'ING';
    const END = 'END';
    const [status, setStatus] = useState('');

    return (
        <>
            <MeditationRecord />
        </>
    )
}