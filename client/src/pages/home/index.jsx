import { useNavigate } from 'react-router-dom';
import spaceImg from '../../assets/images/gradient.jpg';
import './index.scss';

function Home() {
    const navigation = useNavigate();

    return (
        <div className="sparrow-home"
            style={{backgroundImage: `url(${spaceImg})`}}
        >
            <div className="sparrow-home-title">sparrow 에 오신 것을 환영합니다!</div>
            <div className="sparrow-home-button-wrapper">
                <button 
                    className="service-button"
                    onClick={()=>{navigation('/meditation')}}
                >
                    <span className="service-summary">쉼이 필요할 땐,</span>
                    <span className="service-title">Meditation</span>
                    <span className="service-description">
                        {/* 명상으로 쉬어가세요,<br/> */}
                        웹캠을 기반으로 명상을 하고, 기록해 보세요
                    </span>
                </button>
                <button 
                    className="service-button"
                    onClick={()=>{navigation('/quest')}}
                >
                    <span className="service-summary">집중이 필요할 땐,</span>
                    <span className="service-title">Quest</span>
                    <span className="service-description">
                        {/* 퀘스트로 집중하세요,<br/> */}
                        하루 일과를 기록하고, 한 편의 소설로 만들어보세요
                    </span>
                </button>
            </div>
        </div>
    )
}
export default Home;