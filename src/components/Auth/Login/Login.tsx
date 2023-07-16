import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import styles from './Login.module.scss';
import routes from "../../../routes";


function Login() {
    const navigate = useNavigate();

    const handleLogin = (): void => {
        // TBD open login modal
    }

    const handleGuest = (): void => {
        navigate(routes.timerDashboard.main)
    }

    return (
        <div className={styles.LoginPage}>
            <LoginForm onHandleLogin={handleLogin} onHandleGuest={handleGuest}/>
        </div>
    )
}

export default Login;