import styles from "./auth.module.css"

import React from "react"

const Auth = () => {

    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    const authFunction = async () => {
        fetch('http://localhost:3005/api/auth', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: login, pass: password }),
          })
          .then(response => response.json())
          .then(data => {
            if (data === true) {
              console.log('Authentication successful');
              // Делайте что-то, если аутентификация успешна
            } else {
              console.log('Authentication failed');
              // Делайте что-то, если аутентификация не удалась
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }

    return (
        <>
            <section className={styles.auth_section}>
                <div className={styles.auth__component}>
                    <nav className={styles.topModal__block}>
                        Авторизация
                    </nav>
                    <div className={styles.inputs__block}>
                        <input placeholder="Логин" type="text" value={login} onChange={(e) => setLogin(e.target.value)} className={styles.input} required="" />
                        <input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} required="" />
                    </div>
                    <div className={styles.btns_block}>
                        <button onClick={authFunction} className={styles.btn}>Войти</button>
                    </div>
                </div> 
            </section>
        </>
    )
}

export default Auth;