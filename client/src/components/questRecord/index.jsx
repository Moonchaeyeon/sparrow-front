import { useState } from "react";
import { timeToString, secToString } from "../../utils/action/toString";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Pencil } from "../../assets/svg/pencil.svg";
import { ReactComponent as Trash } from "../../assets/svg/trash.svg";
import { ReactComponent as Quotes } from "../../assets/svg/quotes.svg";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import Modal from "../modal/Modal"
import Music from "../music/Music";
import QuestTag from "./QuestTag";
import './index.scss';

function QuestRecord ({ questInfo, setShowModal, createQuestRecord }) {
    const [editMode, setEditMode] = useState(true);
    const [title, setTitle] = useState(questInfo?.title);
    const [content, setContent] = useState("");
    const [tempTag, setTempTag] = useState("");
    const [tagList, setTagList] = useState([]);

    const addTag = () => {
        if (tempTag.length && !tagList.find(el=>el===tempTag)) {
            setTagList([...tagList, tempTag]);
            setTempTag("");
        }
    }
    
    const deleteTag = (tagName) => {
        setTagList(tagList.filter(el=>el!==tagName));
    }
    


    return (
        <Modal setShowModal={setShowModal} displayType="bottom">
            <div className="record modal-wrapper quest-record-modal" id={editMode ? null : 'view-mode'}>
                <div className="modal-title">Quest 기록</div>
                <Close id="modal-close" onClick={()=>{setShowModal(false)}}/>

                <div className="modal-contents">
                    <div className="white-box"></div>
                    {/* {
                        !editMode && <>
                        <Pencil className="action-button" id="change-to-edit-mode" onClick={()=>{setEditMode(true)}}/>
                        <Trash className="action-button" id="delete-record" onClick={()=>{(deleteRecord(recordInfo.meditationRecordId))}}/>
                        </>
                    } */}
                    <div className="meditation-info-wrapper">

                        <div className="time-info-wrapper">
                            <div className="date">{ timeToString(questInfo.createdDate) }</div>
                            <div className="time">{ secToString(questInfo.timer * 60) }</div>
                        </div>

                        <Music music={questInfo?.musicTheme.musics[0]} />
                        {/* <ul className="sound-wrapper">
                            {
                                soundInfoList.map((sound, idx)=>(
                                    <li className="sound-elem" key={idx}>
                                        { sound.icon }
                                        <span>{ sound.value }</span>
                                    </li>
                                ))
                            }
                        </ul> */}
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
                    <label className="record-input-label">세부사항</label>
                    <div className="record-input-description">방금 한 일에 대한 세부사항을 남겨보세요</div>
                    <div className="content-wrapper">
                        <textarea
                            value={content}
                            onChange={(e)=>{setContent(e.currentTarget.value)}}
                            disabled={!editMode}
                        />
                    </div>

                    <label className="record-input-label">태그</label>
                    <div className="record-input-description">방금 한 일에 대한 태그를 작성해주세요</div>
                    <div className="tag-wrapper">
                        <form
                            className="quest-tag-input-wrapper"
                            onSubmit={(e)=>{ e.preventDefault(); addTag() }}
                        >
                            <span className="quest-tag-icon">#</span>
                            <input
                                type="text" 
                                placeholder="태그를 입력하세요" 
                                value={tempTag}
                                onChange={(e)=>{setTempTag(e.currentTarget.value)}}
                            />
                            <button type="quest-tag-submit">
                                <MdOutlineSubdirectoryArrowLeft className="quest-tag-submit-icon" />
                            </button>
                        </form>
                        <div className="tag-list-wrapper">
                            {
                                tagList?.map((tag, idx)=>(
                                    <QuestTag 
                                        key={idx}
                                        tagName={tag}
                                        deleteTag={deleteTag}
                                    />
                                ))
                            }
                        </div>

                        {/* {
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
                        } */}
                    </div>
                    </div>

                    {
                        editMode &&
                        <div className="modal-action-button-wrapper">
                        {
                            questInfo.questRecordId
                            ? <>
                                <button className="modal-action" id="cancel" onClick={()=>{setEditMode(false)}}>취소</button>
                                {/* <button className="modal-action" onClick={()=>{editRecord()}}>수정하기</button> */}
                            </>
                            : <button className="modal-action" onClick={()=>{createQuestRecord(title, content, tagList)}}>기록하기</button>
                        }
                        </div>
                    }
                </div>
            </div>
        </Modal>
    )
}
export default QuestRecord;