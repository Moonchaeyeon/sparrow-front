import './Modal.scss';

function Modal({ setShowModal, displayType, ...props }) {
    return (
        <div className="modal-background" onClick={()=>{setShowModal(false)}}
            id={displayType}
        >
            <div onClick={(e)=>{e.stopPropagation()}}>
                { props.children }
            </div>
        </div>
    )
}
export default Modal;