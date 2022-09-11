import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { timeToString, secToString } from "../../utils/toString";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Bird } from "../../assets/svg/bird.svg";
import { ReactComponent as Fire } from "../../assets/svg/fire.svg";
import { ReactComponent as Wave } from "../../assets/svg/wave.svg";
import { ReactComponent as Rain } from "../../assets/svg/rain.svg";
import Modal from "../modal/Modal";
import Music from "../music/Music";
import "./Record.scss";

function Record({ editMode = true, recordInfo, setShowModal }) {
    const birdVolume = useSelector(state=>state.sound.birdVolume);
    const fireVolume = useSelector(state=>state.sound.fireVolume);
    const waveVolume = useSelector(state=>state.sound.waveVolume);
    const rainVolume = useSelector(state=>state.sound.rainVolume);
    const [date, setDate] = useState('2022-09-11');
    const [duration, setDuration] = useState(3453);
    const [title, setTitle] = useState('');
    const [diary, setDiary] = useState('');
    const [tagList, setTagList] = useState([]);

    const tagInfoList = [
        { tagId: 1, tagName: '휴식' },
        { tagId: 2, tagName: '스트레스_해소' },
        { tagId: 3, tagName: '행복' },
        { tagId: 4, tagName: '지친_하루' },
        { tagId: 5, tagName: '좋은_아침' },
        { tagId: 6, tagName: '퇴근_후' },
    ]

    const soundInfoList = [
        { icon: <Bird/>, value: (!editMode ? recordInfo.birdVolume : birdVolume) },
        { icon: <Fire/>, value: (!editMode ? recordInfo.fireVolume : fireVolume) },
        { icon: <Wave/>, value: (!editMode ? recordInfo.waveVolume : waveVolume) },
        { icon: <Rain/>, value: (!editMode ? recordInfo.rainVolume : rainVolume) },
    ]

    const tempMusicInfo = {
        musicName: 'Dream2',
        coverImage: 'https://post-phinf.pstatic.net/MjAyMDA5MDRfMjY5/MDAxNTk5MjA3MjM5OTU0.06W0Vxag4mOp_3RUzKqnrCy3DhONXRwwCauNAHFcRXkg.r6a1UMHSnqnPQqhshDR2ANjFeVvXpGS5A90HJNSxPmsg.JPEG/98475567_678982502661201_3647491715844941249_n.jpg?type=w1200',
        musicUrl: `${process.env.PUBLIC_URL}/assets/audio/default.wav`
    }

    const tagSelectHandler = (checked, tagId) => {
        if (checked) {
            setTagList([...tagList, tagId]);
        } else {
            setTagList(tagList.filter(el=>el.tagId!==tagId));
        }
    }

    return (
        <Modal>
            <div className="record modal-wrapper">
                <div className="modal-title">명상 기록</div>
                <Close id="modal-close" onClick={()=>{setShowModal(false)}}/>

                <div className="modal-contents">
                    <div className="white-box"></div>
                    <div className="meditation-info-wrapper">

                        <div className="time-info-wrapper">
                            <div className="date">{ timeToString(date) }</div>
                            <div className="time">{ secToString(duration) }</div>
                        </div>

                        <Music music={tempMusicInfo} width="246px" height="246px"/>
                        <ul className="sound-wrapper">
                            {
                                soundInfoList.map((sound, idx)=>(
                                    <li className="sound-elem" key={idx}>
                                        { sound.icon }
                                        <span>{ sound.value }</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <input
                        className="record-title-input"
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e)=>{setTitle(e.currentTarget.value)}}
                    />

                    <label className="record-input-label">일기</label>
                    <div className="record-input-description">명상하면서 정리한 생각을 남겨보세요</div>
                    <div className="diary-wrapper">
                        <textarea
                            value={diary}
                            onChange={(e)=>{setDiary(e.currentTarget.value)}}
                        />
                    </div>

                    <label className="record-input-label">태그</label>
                    <div className="record-input-description">방금 한 명상에 대한 태그를 선택해주세요</div>
                    <div className="tag-wrapper">
                        {
                            tagInfoList.map((tag, idx)=>(
                                <div className="tag-elem">
                                    <input
                                        type="checkbox"
                                        id={`tag${tag.tagId}`}
                                        value={tag.tagId}
                                        onChange={(e)=>{tagSelectHandler(e.currentTarget.checked, tag.tagId)}}
                                    />
                                    <label htmlFor={`tag${tag.tagId}`}>#{ tag.tagName }</label>
                                </div>
                            ))
                        }
                    </div>

                    {
                        editMode &&
                        <button className="submit">기록하기</button>
                    }
                </div>
            </div>
        </Modal>
    )
}
export default Record;