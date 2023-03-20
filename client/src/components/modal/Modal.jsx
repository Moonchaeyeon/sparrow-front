import './Modal.scss';

function Modal({ closeModal, displayType, ...props }) {
    return (
        <div className="modal-background" onClick={()=>{closeModal()}}
            id={displayType}
        >
            <div onClick={(e)=>{e.stopPropagation()}}>
                { props.children }
            </div>
        </div>
    )
}
export default Modal;