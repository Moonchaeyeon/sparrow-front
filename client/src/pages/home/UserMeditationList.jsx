import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { secToString, timeToString } from "../../utils/action/toString";
import MeditationRecordApi from '../../api/MeditationRecordApi';
import ratingInfoList from "../../utils/data/ratingList";

import Modal from "../../components/modal/Modal";
import MeditationRecord from "../../components/record/MeditationRecord";
import MeditationRecordPreview from "./MeditationRecordPreview";

import { ReactComponent as Crown } from "../../assets/svg/crown.svg";
import './UserMeditationList.scss';

function UserMeditationList({ setShowModal }) {
    const meditationRecordApi = new MeditationRecordApi();
    const auth = useSelector(state=>state.userData.auth);
    const totalMeditationDuration = useSelector(state=>state.userData.totalDuration);
    let myRanking = ratingInfoList[3];
    const [currMeditationRecord, setCurrMeditationRecord] = useState(null);
    const [showMeditationRecord, setShowMeditationRecord] = useState(false);

    const openMeditationRecord = (record) => {
        setCurrMeditationRecord(record);
        setShowMeditationRecord(true);
    }

    const [meditationRecordList, setMeditationRecordList] = useState([]);

    const editMeditationRecord = async (newRecord) => {
        const res = await meditationRecordApi.postRecord(newRecord);
        let temp = {...meditationRecordList};
        for (let el of temp) {
            if (el.meditationRecordId === newRecord.meditationRecordId) {
                el = res.data;
            }
        }
        setMeditationRecordList(temp);
    }

    const deleteMeditationRecord = async (recordId) => {
        setMeditationRecordList(meditationRecordList.filter(el=>el.meditationRecordId !== recordId));
    }

    useEffect(()=>{
        const getUserMeditationRecordList = async () => {
            const res = await meditationRecordApi.getRecordList();
            setMeditationRecordList(res.data);
        }
        getUserMeditationRecordList();
    }, [auth])

    return (
        <>
            <Modal setShowModal={setShowModal} displayType="left">
                <div className="user-meditation-list modal-wrapper">
                    <div className="modal-header">
                        <div>나의 총 명상 시간</div>
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
                                meditationRecordList.map((record, idx)=>(
                                    <>
                                    {
                                        (idx === 0 ||
                                        timeToString(meditationRecordList[idx].createdDate) !== timeToString(meditationRecordList[idx-1].createdDate)) &&
                                        <div className="meditation-record-date">{ timeToString(meditationRecordList[idx].createdDate) }</div>
                                    }
                                    <MeditationRecordPreview 
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
                showMeditationRecord &&
                <MeditationRecord
                    edit={false}
                    recordInfo={currMeditationRecord}
                    setShowModal={setShowMeditationRecord}
                    editMeditationRecord={editMeditationRecord}
                    deleteMeditationRecord={deleteMeditationRecord}
                />
            }
        </>
    )
}
export default UserMeditationList;