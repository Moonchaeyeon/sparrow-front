import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../redux/userData/userDataAction';
import defaultProfile from '../../assets/images/profile.png';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './index.scss';

function Navbar({ setShowLoginModal }) {
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.userData.auth);
    const name = useSelector(state=>state.userData.name);
    const profileImage = useSelector(state=>state.userData.profileImage);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setAuth(false));
    }

    return (
        <div className="navbar">
            <Logo className="logo"/>
            {
                !auth
                ? <button className="user-profile-wrapper">
                    <img className="user-profile-image" src={profileImage ? profileImage : defaultProfile} onError={(e)=>{this.src=defaultProfile}} alt="profile"/>
                    <div className="user-info-wrapper">
                        <div className="user-name">{ name?name:'문채연' }</div>
                        <div className="logout-btn" onClick={()=>{logout()}}>Logout</div>
                    </div>
                </button>
                : <button 
                    className="login-btn" 
                    onClick={()=>{setShowLoginModal(true)}}
                >
                    Login
                </button>
            }

        </div>
    )
}
export default Navbar;