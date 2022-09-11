import { Suspense, useState } from 'react';
import ThreeCanvas from '../../canvas';
import MeditationRecord from '../../components/record/MeditationRecord';
import UserMeditationList from './UserMeditationList';
import AudioHandler from './AudioHandler';
import EyeTracking from './EyeTracking';
import { ReactComponent as Pencil } from '../../assets/svg/pencil.svg';

function Home() {
    const [showUserMeditationList, setShowUserMeditationList] = useState(true);

    return (
        <>
            <ThreeCanvas />
            <EyeTracking />
            <button
                className="show-record"
                onClick={()=>{setShowUserMeditationList(true)}}
            >
                <Pencil />
            </button>
            { 
                showUserMeditationList &&
                <UserMeditationList />
            }

            {/* <MeditationRecord /> */}
            <AudioHandler />
        </>
    )
}
export default Home;