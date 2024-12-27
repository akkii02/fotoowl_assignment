import React, { useState } from "react";
import styles from "./Login.module.css"; 

const Login = ({ onLogin }) => {
    const [currentUser, setCurrentUser] = useState("");

    const handleUserChange = (e) => {
        setCurrentUser(e.target.value);
    };

    const handleLogin = () => {
        onLogin(currentUser); 
    };

    return (
        <div className={styles.loginPage}>
            <h2 className={styles.title}>Select User</h2>
            <select className={styles.select} value={currentUser} onChange={handleUserChange}>
                <option >Select User</option>
                <option value="User 1">User 1</option>
                <option value="User 2">User 2</option>
            </select>
            <button
                className={styles.button}
                onClick={handleLogin}
                disabled={!currentUser}
            >
                Login
            </button>
        </div>
    );
};

export default Login;
