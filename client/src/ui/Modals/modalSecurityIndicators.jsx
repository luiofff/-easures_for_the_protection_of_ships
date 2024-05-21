
import React from "react";

import styles from "./modal.module.css"

import { useSelector, useDispatch } from 'react-redux';

const ModalSecurityIndicators = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.selectedData)

    const [protection_measure, setProtection_measure] = React.useState(0);
    const [content, setContent] = React.useState([]);


    const handleToggleSwitch = () => {
        dispatch({ type: 'TOGGLE_SWITCH' });
    };

    const [indicator, setIndicator] = React.useState(data[0]);
    const [description, setDescription] = React.useState(data[1]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:3005/api/getShipsProtectionMeasures')
          .then(response => response.json())
          .then(data => {
            setContent(data);
            console.log(data)
          })
          .catch(error => {
            console.error('Error fetching ship types:', error);
          });
    }

    const update = () => {
        fetch('http://localhost:3005/api/updateShipsIndicator', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                indicator: indicator,
                description: description,
                protection_measure: protection_measure,
                IndicatorId: data[3]
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
                            <label htmlFor="indicator" className="form-title">Показатель защищенности:</label>
                            <textarea onChange={(e) => setIndicator(e.target.value)} value={indicator}  className="textArea-element" name="indicator" id="indicator" />
                        </div>
                        
                        <div className="form__elem">
                            <label htmlFor="description" className="form-title">Описание:</label>
                            <textarea onChange={(e) => setDescription(e.target.value)}  value={description}  className="textArea-element" name="description" id="description" />
                        </div>

                        
                        <div className="form__elem">
                            <label htmlFor="description" className="form-title">Мера защиты:</label>
                            <select className="select-menu" onChange={(e) => setProtection_measure(e.target.value)}>
                                {content.map((elem) => (
                                    <option  key={elem.name} value={elem.id}>{elem.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <button onClick={update} type="submit" className="form__btn-submit">Готово</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ModalSecurityIndicators;








