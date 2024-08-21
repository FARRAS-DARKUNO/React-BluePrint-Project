import Cookies from 'js-cookie';
import KEY from "../utils/TypeKey";

const LogOutHandler = () => {
    Cookies.remove(KEY.TokenKey)
    // goto Logout
}

export default LogOutHandler

