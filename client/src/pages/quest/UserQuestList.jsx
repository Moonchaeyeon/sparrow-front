import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { secToString, timeToString } from "../../utils/action/toString";
import { useQuestRecordList } from "../../hooks/useQuestRecordList";
import ratingInfoList from "../../utils/data/ratingList";

import Modal from "../../components/modal/Modal";
import QuestRecordViewMode from "../../components/questRecord/QuestRecordViewMode";
import QuestRecordPreview from "../../components/questRecordPreview/QuestRecordPreview";
import { ReactComponent as Crown } from "../../assets/svg/crown.svg";
import './UserQuestList.scss';

function UserMeditationList({ closeModal }) {
    const { questRecordList, editQuestRecord, deleteQuestRecord } = useQuestRecordList();
    const totalMeditationDuration = useSelector(state=>state.userData.totalDuration);
    let myRanking = ratingInfoList[3];
    const [currQuestRecord, setCurrQuestRecord] = useState(null);
    const [showQuestRecord, setShowQuestRecord] = useState(false);

    const openMeditationRecord = (record) => {
        setCurrQuestRecord(record);
        setShowQuestRecord(true);
    }

    return (
        <>
            <Modal closeModal={closeModal} displayType="left">
                <div className="user-meditation-list modal-wrapper">
                    <div className="modal-header">
                        <div className="user-total-duration-title">나의 총 퀘스트 수행 시간</div>
                        <div className="user-total-duration">{secToString(totalMeditationDuration)}</div>
                        <div className="my-rate"
                            style={{background: myRanking.color}}
                        >
                            <Crown/>
                        </div>
                    </div>

                    <div className="modal-content">
                        <div className="meditation-wrapper">
                            {
                                questRecordList?.map((record, idx)=>(
                                    <>
                                    {
                                        (idx === 0 ||
                                        timeToString(questRecordList[idx].createdDate) !== timeToString(questRecordList[idx-1].createdDate)) &&
                                        <div className="meditation-record-date">{ timeToString(questRecordList[idx].createdDate) }</div>
                                    }
                                    <QuestRecordPreview 
                                        recordInfo={record} 
                                        openMeditationRecord={openMeditationRecord}
                                    />
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Modal>
            {
                showQuestRecord &&
                <QuestRecordViewMode
                    edit={false}
                    questInfo={currQuestRecord}
                    closeModal={()=>setShowQuestRecord(false)}
                    editRecord={editQuestRecord}
                    deleteRecord={deleteQuestRecord}
                />
            }
        </>
    )
}
export default UserMeditationList;