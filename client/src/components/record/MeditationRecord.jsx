import { useEffect, useState } from "react";
import { timeToString, secToString } from "../../utils/action/toString";
import MeditationRecordApi from "../../api/MeditationRecordApi";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Pencil } from "../../assets/svg/pencil.svg";
import { ReactComponent as Trash } from "../../assets/svg/trash.svg";
import { ReactComponent as Quotes } from "../../assets/svg/quotes.svg";
import { ReactComponent as Bird } from "../../assets/svg/bird.svg";
import { ReactComponent as Fire } from "../../assets/svg/fire.svg";
import { ReactComponent as Wave } from "../../assets/svg/wave.svg";
import { ReactComponent as Rain } from "../../assets/svg/rain.svg";
import Modal from "../modal/Modal";
import Music from "../music/Music";
import "./MeditationRecord.scss";
import { useSelector } from "react-redux";
import PoetryRecommend from "./PoetryRecommend";

function MeditationRecord({ edit = true, recordInfo, setShowModal, editMeditationRecord, deleteMeditationRecord }) { 
    const meditationRecordApi = new MeditationRecordApi();
    const tagInfoList = useSelector(state=>state.data.tagInfoList);
    const todayDate = new Date();
    const today = `${todayDate.getFullYear()}-${todayDate.getMonth()+1}-${todayDate.getDate()}`;
    const [ editMode, setEditMode ] = useState(edit);
    const [date, setDate] = useState(today);
    const [duration, setDuration] = useState(recordInfo.duration);
    const [music, setMusic] = useState(recordInfo.music);
    const [title, setTitle] = useState('');
    const [content, setDiary] = useState('');
    const [tagIds, setTagIdList] = useState([]);
    const [showPoetryRecommend, setShowPoetryRecommend] = useState(false);

    const soundInfoList = [
        { icon: <Bird/>, value: recordInfo.birdSound },
        { icon: <Fire/>, value: recordInfo.fireSound },
        { icon: <Wave/>, value: recordInfo.oceanSound },
        { icon: <Rain/>, value: recordInfo.rainSound },
    ]

    const tagSelectHandler = (checked, tagId) => {
        if (checked) {
            setTagIdList([...tagIds, tagId]);
        } else {
            setTagIdList(tagIds.filter(el=>el.tagId!==tagId));
        }
    }
    
    const postRecord = async () => {
        let newRecord = {
            disclosure: 1,
            title: title,
            content: content,
            musicId: recordInfo.music.musicId,
            birdSound: recordInfo.birdSound,
            oceanSound: recordInfo.oceanSound,
            rainSound: recordInfo.rainSound,
            fireSound: recordInfo.fireSound,
            duration: duration,
            tagIds: tagIds
        }
        console.log(newRecord);
        await meditationRecordApi.postRecord(newRecord);
        setShowPoetryRecommend(true);
    }

    const editRecord = async () => {
        let newRecord = {
            meditationRecordId: recordInfo.meditationRecordId,
            disclosure: 1,
            title: title,
            content: content,
            tagIds: tagIds
        }
        await editMeditationRecord(newRecord);
        setEditMode(false);
    }

    const deleteRecord = async (id) => {
        await meditationRecordApi.deleteRecord(id);
        deleteMeditationRecord(id);
        setShowModal(false);
    }

    useEffect(()=>{
        setDate(recordInfo.createdDate);
        setDuration(recordInfo.duration);
        if (recordInfo.meditationRecordId) {
            setTitle(recordInfo.title);
            setDiary(recordInfo.content);
            setTagIdList(recordInfo.tagIds);
        } 
    }, [recordInfo, editMode])

    return (
        <>
        <Modal setShowModal={setShowModal} displayType="bottom">
            <div className="record modal-wrapper" id={editMode ? null:'view-mode'}>
                <div className="modal-title">명상 기록</div>
                <Close id="modal-close" onClick={()=>{setShowModal(false)}}/>

                <div className="modal-contents">
                    <div className="white-box"></div>
                    {
                        !editMode && <>
                        <Pencil className="action-button" id="change-to-edit-mode" onClick={()=>{setEditMode(true)}}/>
                        <Trash className="action-button" id="delete-record" onClick={()=>{(deleteRecord(recordInfo.meditationRecordId))}}/>
                        </>
                    }
                    <div className="meditation-info-wrapper">

                        <div className="time-info-wrapper">
                            <div className="date">{ timeToString(date) }</div>
                            <div className="time">{ secToString(duration) }</div>
                        </div>

                        <Music music={music} />
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

                    <div className="record-input-container">
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
                    <div className="content-wrapper">
                        <textarea
                            value={content}
                            onChange={(e)=>{setDiary(e.currentTarget.value)}}
                            disabled={!editMode}
                        />
                    </div>

                    <label className="record-input-label">태그</label>
                    <div className="record-input-description">방금 한 명상에 대한 태그를 선택해주세요</div>
                    <div className="tag-wrapper">
                        {
                            tagInfoList?.map((tag, idx)=>(
                                <div className="tag-elem">
                                    <input
                                        type="checkbox"
                                        id={`tag${tag.tagId}`}
                                        checked={tagIds.includes(tag.tagId)}
                                        onChange={(e)=>{tagSelectHandler(e.currentTarget.checked, tag.tagId)}}
                                        disabled={!editMode}
                                    />
                                    <label htmlFor={`tag${tag.tagId}`}>#{ tag.tagNameKor }</label>
                                </div>
                            ))
                        }
                    </div>
                    </div>

                    {
                        editMode &&
                        <div className="modal-action-button-wrapper">
                        {
                            recordInfo.meditationRecordId
                            ? <>
                                <button className="modal-action" id="cancel" onClick={()=>{setEditMode(false)}}>취소</button>
                                <button className="modal-action" onClick={()=>{editRecord()}}>수정하기</button>
                            </>
                            : <button className="modal-action" onClick={()=>{postRecord()}}>기록하기</button>
                        }
                        </div>
                    }
                </div>
            </div>
        </Modal>
        { showPoetryRecommend && <PoetryRecommend content={content} setShowModal={setShowModal}/> }
        </>
    )
}
export default MeditationRecord;