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
        t.value = poetry.sentence;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
    }

    useEffect(()=>{
        const getPoetryReco = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_RECO_SERVER}/default/poetry-recommend`, {
                    content: content
                });
                console.log('poetry', res.data);
                setPoetry(res.data);
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
                        {
                            poetry.sentence
                            ? <>
                                <div className="reco-poetry">
                                    { poetry.sentence }
                                </div>
                                <div className="reco-source">
                                    { 
                                        poetry.type !== 'sentence' && 
                                        `${poetry.title} - ${poetry.author}`
                                    }
                                </div>   
                            </>
                            : <div class="loader loader--style3" title="2">
                                {/* <svg version="1.1" id="loader-1" x="0px" y="0px"
                                width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;">
                                <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                <animateTransform attributeType="xml"
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 25 25"
                                    to="360 25 25"
                                    dur="0.6s"
                                    repeatCount="indefinite"/>
                                </path>
                                </svg> */}
                          </div>
                        }
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