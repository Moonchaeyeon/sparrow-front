import tagInfoList from '../../utils/tagList';
import Music from '../../components/music/Music';
import './MeditationRecordPreview.scss';

function MeditationRecordPreview({ recordInfo, setShowMeditationRecord }) {

    return (
        <div className="meditation-record-preview">
            <Music music={recordInfo.music} width="240px" height="240px"/>

            <div 
                className="record-info-wrapper"
                onClick={()=>{setShowMeditationRecord(true)}}
            >
                <div className="record-info-title">{ recordInfo.title }</div>
                <div className="record-into-diary">
                    { recordInfo.diary }
                </div>
                <div className="record-tag-wrapper">
                    {
                        recordInfo.tagIdList.map((tagId, idx)=>(
                            <div className="record-tag-elem"># { tagInfoList.find(el=>el.tagId===tagId).tagName }</div>
                        ))
                    }
                </div>
                <button className="replay-meditation">명상 다시하기</button>
            </div>
        </div>
    )
}
export default MeditationRecordPreview;