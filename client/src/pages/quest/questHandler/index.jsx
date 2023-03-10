import { useEffect } from 'react';
import { useState } from 'react';
import { secToString } from '../../../utils/action/toString';
import { ReactComponent as Pencil } from "../../../assets/svg/pencil2.svg";
import { ReactComponent as Close } from "../../../assets/svg/close.svg";
import './index.scss';

function QuestHandler({ questInfo, timer, createQuest, finishQuest, editQuestTime }) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);

    useEffect(()=>{
        if (questInfo) {
            setTitle(questInfo.title);
            setHour(Math.floor(questInfo.timer/60));
            setMin(questInfo.timer%60);
        }
    }, [questInfo])

    return (
        <div className="quest-handler">
            <div className="quest-handler-header">
                <div className="quest-handler-title">
                    Quest
                </div>
                {
                    questInfo &&
                    <Pencil 
                        className="quest-edit-icon"
                        onClick={()=>setEditMode(true)}
                    />
                }
            </div>
            {
                // questInfo ? <div>hihi</div>
                // : 
                <form 
                    className="quest-form"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        createQuest({title, hour, min})
                    }}
                >
                    <div className="quest-title">
                        <input 
                            className="quest-title-input"
                            type="text" 
                            placeholder="제목을 입력해주세요." 
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            disabled={questInfo}
                        />
                    </div>
                    {
                        (editMode || !questInfo) &&
                        <div className="timer">
                            <div className="timer-input">
                                <input
                                    className="hour"
                                    type="number" 
                                    placeholder="00" 
                                    value={hour}
                                    max={59}
                                    onChange={(e)=>{e.target.value< 60 && setHour(e.target.value)}}
                                    disabled={!editMode && questInfo}
                                />
                                <span className="time-text"> h </span>
                                <input 
                                    className="min"
                                    type="number" 
                                    placeholder="00" 
                                    value={min}
                                    onChange={(e)=>{e.target.value< 60 && setMin(e.target.value)}}
                                    disabled={!editMode && questInfo}
                                />
                                <span className="time-text"> min</span>
                            </div>
                        </div>
                    }

                    {
                        !(questInfo) ?
                        <button
                            className="quest-create-button"
                            type="submit"
                            disabled={!(title && (hour||min))}
                        >
                            생성하기
                        </button>
                        : 
                        editMode
                        ? <div className="button-wrapper">
                            <button
                                className="quest-create-button edit-cancel-button"
                                type="button"
                                onClick={()=>setEditMode(false)}
                            >
                                취소
                            </button>
                            <button
                                className="quest-create-button"
                                type="button"
                                disabled={!(title && (hour||min))}
                                onClick={()=>{ editQuestTime(hour, min); setEditMode(false); }}
                            >
                                수정하기
                            </button>
                        </div>
                        : <>
                            <div className="quest-timer">{ secToString(timer) }</div>
                            <button
                                className="quest-create-button"
                                type="button"
                                disabled={!(title && (hour||min))}
                                onClick={()=>finishQuest()}
                            >
                                종료하기
                            </button>
                        </>
                    }

                </form>
            }
        </div>
    )
}
export default QuestHandler;