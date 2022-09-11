import { useState } from "react";
import Modal from "../../components/modal/Modal";
import MeditationRecord from "../../components/record/MeditationRecord";
import { secToString, timeToString } from "../../utils/toString";
import MeditationRecordPreview from "./MeditationRecordPreview";
import './UserMeditationList.scss';

function UserMeditationList() {
    let totalMeditationDuration = 4698;
    const [currMeditationRecord, setCurrMeditationRecord] = useState(null);
    const [showMeditationRecord, setShowMeditationRecord] = useState(false);

    const userMeditationList = [
        {
            recordId: 10,
            createdDate: '2022-09-11', 
            duration: 230,
            music: {
                musicName: 'Dream2',
                coverImage: 'https://post-phinf.pstatic.net/MjAyMDA5MDRfMjY5/MDAxNTk5MjA3MjM5OTU0.06W0Vxag4mOp_3RUzKqnrCy3DhONXRwwCauNAHFcRXkg.r6a1UMHSnqnPQqhshDR2ANjFeVvXpGS5A90HJNSxPmsg.JPEG/98475567_678982502661201_3647491715844941249_n.jpg?type=w1200',
                musicUrl: `${process.env.PUBLIC_URL}/assets/audio/default.wav`
            },
            title: '나는 어떤 사람인가',
            diary: '세상에서 가장 대답하기 힘든 질문이 있다. "당신은 어떤 사람인가요?"라는 질문이다. 스스로 반문하자면 "나는 어떤 사람인가?"라는 질문이다. 지금은 작고하셨지만',
            tagIdList: [1, 2, 3, 4, 5],
            birdSound: 20,
            fireSound: 60,
            waveSound: 0,
            rainSound: 10,
        },
        { 
            recordId: 9,
            createdDate: '2022-09-10', 
            duration: 20,
            music: {
                musicName: 'Meditation',
                coverImage: 'https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/248R/image/ROaVC_3cDfgEn_Wmmu0ew-6n0S8.jpg',
                musicUrl: `${process.env.PUBLIC_URL}/assets/audio/default.wav`
            },
            title: '하루의 마무리',
            diary: '퇴근 후 잠자리에 눕기 전 핸드폰을 하는 대신, 명상을 하며 오늘 하루동안 있었던 복잡한 일들에 대한 마음을 정리하는 시간을 가졌다. ',
            tagIdList: [1, 2, 3, 4, 5],
            birdSound: 20,
            fireSound: 60,
            waveSound: 0,
            rainSound: 10,
        },
        { 
            recordId: 8,
            createdDate: '2022-09-10', 
            duration: 10,
            music: {
                musicName: 'Echo',
                coverImage: 'https://cdn.smehost.net/sonymusiccokr-45pressprod/wp-content/uploads/2020/05/Album-Cover-KATIE_ECHO.jpg',
                musicUrl: `${process.env.PUBLIC_URL}/assets/audio/default.wav`
            },
            title: '하루를 산뜻하게 시작하는 법',
            diary: '오늘 일을 시작하기 전에 명상을 하며 긍정적인 에너지를 충전했다.',
            tagIdList: [1, 2, 3, 4, 5, 6],
            birdSound: 20,
            fireSound: 60,
            waveSound: 45,
            rainSound: 10,
        },
        { 
            recordId: 7,
            createdDate: '2022-09-09',
            duration: 80, 
            music: {
                musicName: 'Dream2',
                coverImage: 'https://post-phinf.pstatic.net/MjAyMDA5MDRfMjY5/MDAxNTk5MjA3MjM5OTU0.06W0Vxag4mOp_3RUzKqnrCy3DhONXRwwCauNAHFcRXkg.r6a1UMHSnqnPQqhshDR2ANjFeVvXpGS5A90HJNSxPmsg.JPEG/98475567_678982502661201_3647491715844941249_n.jpg?type=w1200',
                musicUrl: `${process.env.PUBLIC_URL}/assets/audio/default.wav`
            },
            title: '첫 명상을 시작하며...',
            diary: '명상을 할 땐 무슨 생각을 해야 할까? 명상을 평소 하지 않았기에, 명상을 하기 전에는 막막한 느낌이 있었다. 하지만 막상 눈을 감고 편안한 음악을 들으니, 그 자체만으로도 차분해지고 따뜻해지는 시간이 되었던 것 같다.',
            tagIdList: [3, 5],
            birdSound: 0,
            fireSound: 10,
            waveSound: 88,
            rainSound: 10,
        }
    ]

    return (
        <>
            <Modal>
                <div className="user-meditation-list modal-wrapper">
                    <div className="modal-header">
                        <div>나의 총 명상 시간</div>
                        <div className="user-total-duration">{secToString(totalMeditationDuration)}</div>
                    </div>

                    <div className="modal-content">
                        <div className="meditation-wrapper">
                            {
                                userMeditationList.map((record, idx)=>(
                                    <>
                                    {
                                        (idx === userMeditationList.length - 1 ||
                                        timeToString(userMeditationList[idx].createdDate) !== timeToString(userMeditationList[idx+1].createdDate)) &&
                                        <div className="meditation-record-date">{ timeToString(userMeditationList[idx].createdDate) }</div>
                                    }
                                    <MeditationRecordPreview 
                                        recordInfo={record} 
                                        key={idx}
                                        onClick={()=>{setCurrMeditationRecord(record); setShowMeditationRecord(true)}}
                                        setShowMeditationRecord={setShowMeditationRecord}
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
                    editMode={false}
                    recordInfo={currMeditationRecord}
                />
            }
        </>
    )
}
export default UserMeditationList;