import tagInfoList from '../../utils/data/tagList';
import Music from '../../components/music/Music';
import './MeditationRecordPreview.scss';

function MeditationRecordPreview({ recordInfo, openMeditationRecord }) {

    return (
        <div className="meditation-record-preview">
            <Music music={recordInfo.music} width="240px" height="240px"/>

            <div 
                className="record-info-wrapper"
                onClick={()=>{openMeditationRecord(recordInfo)}}
            >
                <div className="record-info-title">{ recordInfo.title }</div>
                <div className="record-into-content">
                    { recordInfo.content }
                </div>
                <div className="record-tag-wrapper">
                    {
                        recordInfo.tagIdList.map((tagId, idx)=>(
                            <div className="record-tag-elem"># { tagInfoList.find(el=>el.tagId===tagId).tagNameKor }</div>
                        ))
                    }
                </div>
                <button className="replay-meditation">명상 다시하기</button>
            </div>
        </div>
    )
}
export default MeditationRecordPreview;