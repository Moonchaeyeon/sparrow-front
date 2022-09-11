import { Suspense } from 'react';
import ThreeCanvas from '../../canvas';
import Record from '../../components/record/Record';
import AudioHandler from './AudioHandler';
import EyeTracking from './EyeTracking';

function Home() {

    return (
        // <ThreeCanvas />
        <>
            <ThreeCanvas />
            <EyeTracking />
            {/* <Record /> */}
            <AudioHandler />
        </>
    )
}
export default Home;