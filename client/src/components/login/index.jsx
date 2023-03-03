import Modal from "../modal/Modal";
import { ReactComponent as LogoIcon } from "../../assets/svg/logo_icon.svg";
import { ReactComponent as LogoText } from "../../assets/svg/logo_text.svg";
import { ReactComponent as Kakao } from "../../assets/svg/kakao.svg";
import { ReactComponent as Google } from "../../assets/svg/google.svg";
import { ReactComponent as Naver } from "../../assets/svg/naver.svg";
import colorfulObjects from "../../assets/images/colorful_objects.png";
import './index.scss';

function Login({ setShowModal }) {
    const socialLoginInfoList = [
        { id: 'kakao', name: '카카오톡으로', color: '#FFE812', textColor: 'black', icon: <Kakao/>, loginURL: `${process.env.REACT_APP_SERVER_HOST}/oauth2/authorization/kakao` },
        { id: 'google', name: '구글로', color: '#FFFFFF', textColor: 'black', icon: <Google/>, loginURL: `${process.env.REACT_APP_SERVER_HOST}/oauth2/authorization/google` },
        { id: 'naver', name: '네이버로', color: '#2DB400', textColor: 'white', icon: <Naver/>, loginURL: `${process.env.REACT_APP_SERVER_HOST}/oauth2/authorization/naver` },
    ]

    return (
        <Modal setShowModal={setShowModal} displayType="center">
            <div className="modal-wrapper login">
                <img src={colorfulObjects}/>
                <LogoIcon className="login-logo-icon"/>
                <LogoText className="login-logo-text"/>
                <span>
                    가입 후 다양한 명상 콘텐츠를 즐겨보세요!
                </span>
                {
                    socialLoginInfoList.map((social)=>(
                        <button 
                            className="login-button"
                            onClick={()=>{window.location.href = social.loginURL}}
                            // onClick={()=>{console.log(social.loginURL);}}
                            style={{background: social.color, color: social.textColor}}
                        >
                            { social.icon }
                            {social.name} 시작하기
                        </button>
                    ))
                }
            </div>
        </Modal>
    )
}
export default Login;