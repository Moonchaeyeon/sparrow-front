import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { timeToString, secToString } from "../../utils/action/toString";
import tagInfoList from "../../utils/data/tagList";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Pencil } from "../../assets/svg/pencil.svg";
import { ReactComponent as Quotes } from "../../assets/svg/quotes.svg";
import { ReactComponent as Bird } from "../../assets/svg/bird.svg";
import { ReactComponent as Fire } from "../../assets/svg/fire.svg";
import { ReactComponent as Wave } from "../../assets/svg/wave.svg";
import { ReactComponent as Rain } from "../../assets/svg/rain.svg";
import Modal from "../modal/Modal";
import Music from "../music/Music";
import "./MeditationRecord.scss";

function MeditationRecord({ edit = true, recordInfo, setShowModal }) { 
    const todayDate = new Date();
    const today = `${todayDate.getFullYear()}-${todayDate.getMonth()+1}-${todayDate.getDate()}`;
    const [ editMode, setEditMode ] = useState(edit);
    const birdVolume = useSelector(state=>state.sound.birdVolume);
    const fireVolume = useSelector(state=>state.sound.fireVolume);
    const waveVolume = useSelector(state=>state.sound.waveVolume);
    const rainVolume = useSelector(state=>state.sound.rainVolume);
    const [date, setDate] = useState(today);
    const [duration, setDuration] = useState(recordInfo.duration);
    const [music, setMusic] = useState({
        musicName: 'Dream2',
        musicImagePath: 'https://post-phinf.pstatic.net/MjAyMDA5MDRfMjY5/MDAxNTk5MjA3MjM5OTU0.06W0Vxag4mOp_3RUzKqnrCy3DhONXRwwCauNAHFcRXkg.r6a1UMHSnqnPQqhshDR2ANjFeVvXpGS5A90HJNSxPmsg.JPEG/98475567_678982502661201_3647491715844941249_n.jpg?type=w1200',
        musicPath: `${process.env.PUBLIC_URL}/assets/audio/default.wav`
    });
    const [title, setTitle] = useState('');
    const [diary, setDiary] = useState('');
    const [tagIdList, setTagIdList] = useState([]);

    const soundInfoList = [
        { icon: <Bird/>, value: recordInfo.birdVolume },
        { icon: <Fire/>, value: recordInfo.fireVolume },
        { icon: <Wave/>, value: recordInfo.waveVolume },
        { icon: <Rain/>, value: recordInfo.rainVolume },
    ]

    const tagSelectHandler = (checked, tagId) => {
        if (checked) {
            setTagIdList([...tagIdList, tagId]);
        } else {
            setTagIdList(tagIdList.filter(el=>el.tagId!==tagId));
        }
    }

    useEffect(()=>{
        setDate(recordInfo.createdDate);
        setDuration(recordInfo.duration);
        setTitle(recordInfo.title);
        setDiary(recordInfo.diary);
        setTagIdList(recordInfo.tagIdList);
        setMusic(recordInfo.music);
    }, [recordInfo, editMode])

    return (
        <Modal setShowModal={setShowModal} displayType="bottom">
            <div className="record modal-wrapper" id={editMode?null:'view-mode'}>
                <div className="modal-title">명상 기록</div>
                <Close id="modal-close" onClick={()=>{setShowModal(false)}}/>

                <div className="modal-contents">
                    <div className="white-box"></div>
                    {
                        !editMode &&
                        <Pencil id="change-to-edit-mode" onClick={()=>{setEditMode(true)}}/>
                    }
                    <div className="meditation-info-wrapper">

                        <div className="time-info-wrapper">
                            <div className="date">{ timeToString(date) }</div>
                            <div className="time">{ secToString(duration) }</div>
                        </div>

                        <Music music={music} width="246px" height="246px"/>
                        <ul className="sound-wrapper">
                            {
                                soundInfoList.map((sound, idx)=>(
                                    <li className="sound-elem" key={idx}>
                                        { sound.icon }
                                        <span>{ sound.value }</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="record-title-wrapper">
                        <Quotes className="quotes"/> <Quotes className="quotes"/>
                        <input
                            className="record-title-input"
                            type="text"
                            placeholder="제목을 입력하세요"
                            value={title}
                            disabled={!editMode}
                            onChange={(e)=>{setTitle(e.currentTarget.value)}}
                        />
                    </div>
                    <label className="record-input-label">일기</label>
                    <div className="record-input-description">명상하면서 정리한 생각을 남겨보세요</div>
                    <div className="diary-wrapper">
                        <textarea
                            value={diary}
                            onChange={(e)=>{setDiary(e.currentTarget.value)}}
                            disabled={!editMode}
                        />
                    </div>

                    <label className="record-input-label">태그</label>
                    <div className="record-input-description">방금 한 명상에 대한 태그를 선택해주세요</div>
                    <div className="tag-wrapper">
                        {
                            tagInfoList.map((tag, idx)=>(
                                <div className="tag-elem">
                                    <input
                                        type="checkbox"
                                        id={`tag${tag.tagId}`}
                                        checked={tagIdList.includes(tag.tagId)}
                                        onChange={(e)=>{tagSelectHandler(e.currentTarget.checked, tag.tagId)}}
                                        disabled={!editMode}
                                    />
                                    <label htmlFor={`tag${tag.tagId}`}>#{ tag.tagNameKor }</label>
                                </div>
                            ))
                        }
                    </div>

                    {
                        editMode &&
                        <div className="modal-action-button-wrapper">
                        {
                            recordInfo.recordId
                            ? <>
                                <button className="modal-action" id="cancel" onClick={()=>{setEditMode(false)}}>취소</button>
                                <button className="modal-action">수정하기</button>
                            </>
                            : <button className="modal-action">기록하기</button>
                        }
                        </div>
                    }
                </div>
            </div>
        </Modal>
    )
}
export default MeditationRecord;