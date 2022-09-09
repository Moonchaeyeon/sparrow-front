import { Suspense } from 'react';
import ThreeCanvas from '../../canvas';
import AudioHandler from './AudioHandler';
import EyeTracking from './EyeTracking';

function Home() {

    return (
        // <ThreeCanvas />
        <>
            <EyeTracking />
            <AudioHandler />
        </>
    )
}
export default Home;