import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './index.scss';

function Navbar({ setShowLoginModal }) {

    return (
        <div className="navbar">
            <Logo />
            <button 
                className="login-btn" 
                onClick={()=>{setShowLoginModal(true)}}
            >
                Login
            </button>
        </div>
    )
}
export default Navbar;