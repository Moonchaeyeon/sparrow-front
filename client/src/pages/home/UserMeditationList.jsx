import Modal from "../../components/modal/Modal";
import { secToString } from "../../utils/toString";
import './UserMeditationList.scss';

function UserMeditationList() {
    let totalMeditationDuration = 4698;

    const meditationList = [
        { 
            createdDate: '2022-09-11', 
            music: {
                musicName: 'Dream2',
                coverImage: 'https://post-phinf.pstatic.net/MjAyMDA5MDRfMjY5/MDAxNTk5MjA3MjM5OTU0.06W0Vxag4mOp_3RUzKqnrCy3DhONXRwwCauNAHFcRXkg.r6a1UMHSnqnPQqhshDR2ANjFeVvXpGS5A90HJNSxPmsg.JPEG/98475567_678982502661201_3647491715844941249_n.jpg?type=w1200',
                musicUrl: `${process.env.PUBLIC_URL}/assets/audio/default.wav`
            },
            title: '',
            diary: '',
            tagIdList: [1, 2, 3, 4, 5],
        }
    ]

    return (
        <Modal>
            <div className="user-meditation-list modal-wrapper">
                <div className="modal-header">
                    <div>나의 총 명상 시간</div>
                    <div>{secToString(totalMeditationDuration)}</div>
                </div>

                <div className="modal-content">
                    <div className="meditation-wrapper">
                        {

                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default UserMeditationList;