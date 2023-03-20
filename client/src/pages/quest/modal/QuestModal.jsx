import Modal from "../../../components/modal/Modal";

function QuestModal({ closeModal }) {


    return (
        <Modal
            closeModal={closeModal}
            displayType="center"
        >
            <div className="quest-modal modal">
                <div>Quest 생성하기</div>
                <div className="title">
                    <input type="text" placeholder="Quest 제목을 입력해주세요." />
                </div>
                <div className="timer">
                    <div className="timer-input">
                        <input type="number" placeholder="00" />
                        <span>:</span>
                        <input type="number" placeholder="00" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default QuestModal;