import { useRef } from "react";
import { useEffect } from "react";
import './Modal.scss';

function Modal({ setShowModal, ...props }) {
    let modalRef = useRef();

    const clickModalOutside = (e) => {
        if (!modalRef.current.contains(e.currentTarget)) {
            setShowModal(false);
        }
    }

    useEffect(()=>{
        document.addEventListener('click', clickModalOutside);
        return () => {
            document.removeEventListener('click', clickModalOutside);
        }
    }, [])

    return (
        <div className="modal-background">
            { props.children }
        </div>
    )
}
export default Modal;