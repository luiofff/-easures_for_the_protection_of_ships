import styles from "./auth.module.css"

import React from "react"

const Auth = () => {

    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    const authFunction = async () => {
      if (login==="user_1") window.location.replace("/ShipsList")
      else if(login==="user_2") window.location.replace("/ShipsSystems")
      else if(login==="user_3") window.location.replace("/ShipsThreats")
      else if(login==="user_4") window.location.replace("/ShipsVulnerabilities")
      else if(login==="user_5") window.location.replace("/ProtectionMeasures")
      else if(login==="user_6") window.location.replace("/SecurityIndicators")
      else if(login==="user_7") window.location.replace("/ThreatsShipSystems")
      else alert("Такого пользователя не существует")
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