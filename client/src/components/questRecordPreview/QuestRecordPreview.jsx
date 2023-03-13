
// import Music from '../../components/music/Music';
import { secToTime } from '../../utils/action/time';
import './QuestRecordPreview.scss';

function QuestRecordPreview({ recordInfo, openMeditationRecord }) {

    return (
        <div className="quest-record-preview">
            {/* <Music music={recordInfo.musicTheme.musics[0]} width="240px" height="240px"/> */}
            
            <div 
                className="record-info-wrapper"
                onClick={()=>{openMeditationRecord(recordInfo)}}
            >
                <div className="record-info-title">{ recordInfo.title }</div>
                <div className="record-info-time">
                    { secToTime(recordInfo.timeSpent*60) }
                </div>
                {/* <div className="record-into-content">
                    { recordInfo.content }
                </div> */}
                {/* <div className="record-tag-wrapper">
                    {
                        recordInfo.tags.map((tag, idx)=>(
                            <div 
                                className="record-tag-elem"
                                key={idx}
                            >
                                # { tag }
                            </div>
                        ))
                    }
                </div> */}
            </div>
        </div>
    )
}
export default QuestRecordPreview;