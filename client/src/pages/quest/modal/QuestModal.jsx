import Modal from "../../../components/modal/Modal";

function QuestModal({ setShowModal }) {


    return (
        <Modal
            setShowModal={setShowModal}
            displayType="center"
        >
            <div className="quest-modal modal">
                
            </div>
        </Modal>
    )
}
export default QuestModal;