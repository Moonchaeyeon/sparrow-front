import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { ReactComponent as Check } from '../../assets/svg/check.svg';
import './PoetryRecommend.scss';

function PoetryRecommend({ content, setShowModal }) {
    const [poetry, setPoetry] = useState('');

    const copyToClipboard = () => {
        const t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = poetry;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
    }

    useEffect(()=>{
        const getPoetryReco = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_RECO_SERVER}/default/poetry-recommend`, {}, {
                    content: content
                });
                setPoetry(res.sentence);
            } catch(err) {
                console.log(err);
            }
        }
        getPoetryReco();
    }, [content])

    return(
        <Modal setShowModal={setShowModal} displayType="center">
            <div className="modal-wrapper poetry-recommend">
                <div className="modal-content">
                    <div className="title">오늘의 추천 글귀</div>
                    <div className="reco-poetry-wrapper">
                        <div className="reco-poetry">
                            {/* { poetry ? poetry : "자신을 사랑해주세요." } */}
                            { poetry }
                        </div>
                    </div>
                </div>

                <button onClick={(e)=>{copyToClipboard(); e.currentTarget.focus(); console.log("hihi")}} className="copy-reco">
                    Copy to Clipboard
                    <Check className="check-icon"/>
                </button>
            </div>
        </Modal>
    )
}
export default PoetryRecommend;