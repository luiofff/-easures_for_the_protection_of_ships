import React from "react";

import styles from "./modal.module.css"

import { useSelector, useDispatch } from 'react-redux';

const ModalShipSystem = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.selectedData)

    const [vessel, setVessel] = React.useState(0);
    const [content, setContent] = React.useState([]);


    const handleToggleSwitch = () => {
        dispatch({ type: 'TOGGLE_SWITCH' });
    };

    const [shipSystem, setShipSystem] = React.useState(data[0]);
    const [description, setDescription] = React.useState(data[1]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:3005/api/getShipsTypes')
          .then(response => response.json())
          .then(data => {
            setContent(data);
          })
          .catch(error => {
            console.error('Error fetching ship types:', error);
          });
    }

    const update = () => {
        fetch('http://localhost:3005/api/updateShipsSystems', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                system_name: shipSystem,
                description: description,
                vessel: vessel,
                SystemId: data[3]
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
                            <label htmlFor="type_ship" className="form-title">Название системы судна:</label>
                            <textarea onChange={(e) => setShipSystem(e.target.value)} value={shipSystem}  className="textArea-element" name="type_ship" id="type_ship" />
                        </div>
                        
                        <div className="form__elem">
                            <label htmlFor="description" className="form-title">Описание:</label>
                            <textarea onChange={(e) => setDescription(e.target.value)}  value={description}  className="textArea-element" name="description" id="description" />
                        </div>

                        
                        <div className="form__elem">
                            <label htmlFor="description" className="form-title">Cудно:</label>
                            <select className="select-menu" onChange={(e) => setVessel(e.target.value)}>
                                {content.map((elem) => (
                                    <option  key={elem.ship_type} value={elem.id}>{elem.ship_type}</option>
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

export default ModalShipSystem;

