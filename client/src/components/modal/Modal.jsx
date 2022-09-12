import { useRef } from "react";
import { useEffect } from "react";
import './Modal.scss';

function Modal({ setShowModal, displayType, ...props }) {
    const CENTER = "alignItems: `center`, justifyContents: `center`";
    const LEFT = "alignItems: `left`, justifyContents: `flexStart`";

    // const clickModalOutside = (e) => {
    //     if (!childRef.current.contains(e.currentTarget)) {
    //         setShowModal(false);
    //     }
    // }

    // useEffect(()=>{
    //     document.addEventListener('click', clickModalOutside);
    //     return () => {
    //         document.removeEventListener('click', clickModalOutside);
    //     }
    // }, [])

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