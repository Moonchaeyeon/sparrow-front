import { useState, useEffect } from 'react';
import { useQuestState } from '../../hooks/useQuestState';
import ThreeCanvas from '../../canvas';
import UserQuestList from './UserQuestList';
import AudioHandler from './AudioHandler';
import MusicHandler from './MusicHandler';
import ShowStatus from './ShowStatus';
import QuestHandler from './questHandler';
import QuestRecord from '../../components/questRecord';
import { ReactComponent as Pencil } from '../../assets/svg/pencil2.svg';
import Scene from '../../components/scene/Scene';
import './index.scss';


function Quest() {
    const { 
        questInfo, createQuest, finishQuestState, editQuestTime, timer, showQuestRecord, closeQuestRecord, createQuestRecord, 
        musicThemeList, selectedMusicTheme, setSelectedMusicTheme, status 
    } = useQuestState();
    const [showUserQuestList, setShowUserQuestList] = useState(false);

    return (
        <Scene>
            <button
                className="floating-btn show-record"
                onClick={()=>{setShowUserQuestList(true)}}
            >
                <Pencil />
            </button>
            { 
                showUserQuestList &&
                <UserQuestList 
                    closeModal={()=>setShowUserQuestList(false)}
                />
            }
            <ShowStatus/>
            <AudioHandler/>
            <MusicHandler status={status}/>

            <QuestHandler 
                questInfo={questInfo}
                timer={timer}
                createQuest={createQuest}
                finishQuest={finishQuestState}
                editQuestTime={editQuestTime}
            />

            { 
                showQuestRecord && 
                <QuestRecord 
                    questInfo={questInfo}
                    closeModal={closeQuestRecord}
                    createQuestRecord={createQuestRecord}
                /> 
            }
        {/* </> */}
        </Scene>
    )
}
export default Quest;