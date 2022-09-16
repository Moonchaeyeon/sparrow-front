import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/userData/userDataAction";

function OAuthHandler() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = new useNavigate();

  let getParameter = (key) => {
      return new URLSearchParams(location.search).get(key);
  };

  useEffect(()=> {
      const access = getParameter("access");
      const refresh = getParameter("refresh");

      if (access && refresh) { // 로그인 성공
          localStorage.setItem('accessToken', access);
          localStorage.setItem('refreshToken', refresh);
          dispatch(setAuth(true));
      } else {
          
      }
      navigation('/');

  }, [])

  return (
    <div>
      정보를 받아오는 중입니다...
    </div>
  )
}
export default OAuthHandler;