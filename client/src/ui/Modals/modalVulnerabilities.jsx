import React from "react";

import styles from "./modal.module.css"

import { useSelector, useDispatch } from 'react-redux';

const ModalShipVulnerabilities = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.selectedData)


    const [content, setContent] = React.useState([]);


    const handleToggleSwitch = () => {
        dispatch({ type: 'TOGGLE_SWITCH' });
    };

    const [vulnerabiliti, setVulnerabiliti] = React.useState(data[0]);
    const [description, setDescription] = React.useState(data[1]);
    const [threat, setThreat] = React.useState(data[2])

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:3005/api/getShipsThreat')
          .then(response => response.json())
          .then(data => {
            setContent(data);
          })
          .catch(error => {
            console.error('Error fetching ship types:', error);
          });
    }

    const update = () => {
        fetch('http://localhost:3005/api/updateShipsVulnerability', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vulnerability_name: vulnerabiliti,
                description: description,
                threat: threat,
                ThreatId: data[3]
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    return (
        <>
            <div  className={styles.bg__modal}></div>
            <div className={styles.modal_base}>
                <div className={styles.modal__content}>
                    <nav className={styles.modal__nav}>
                        <svg onClick={handleToggleSwitch} style={{ marginRight: "2rem" }} xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </nav>
                    <form className={styles.modal__inputsList}>
                        <div className="form__elem">
                            <label htmlFor="type_ship" className="form-title">Название уязвимости:</label>
                            <textarea onChange={(e) => setVulnerabiliti(e.target.value)} value={vulnerabiliti}  className="textArea-element" name="type_ship" id="type_ship" />
                        </div>
                        
                        <div className="form__elem">
                            <label htmlFor="description" className="form-title">Описание:</label>
                            <textarea onChange={(e) => setDescription(e.target.value)}  value={description}  className="textArea-element" name="description" id="description" />
                        </div>

                        
                        <div className="form__elem">
                            <label htmlFor="description" className="form-title">Угроза:</label>
                            <select className="select-menu" onChange={(e) => setThreat(e.target.value)}>
                                {content.map((elem) => (
                                   <option  key={elem.threat_name} value={elem.id}>{elem.threat_name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <button onClick={update}  className="form__btn-submit">Готово</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalShipVulnerabilities;

