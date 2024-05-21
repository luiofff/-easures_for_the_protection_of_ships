

import React, {useState, useEffect} from "react";

import styles from "./modal.module.css"

import { useSelector, useDispatch } from 'react-redux';

const ModalThreatsShipSystems = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.selectedData)

    const [system, setSystem] = React.useState(0);
    const [vessel, setVessel] = React.useState(0);


    const handleToggleSwitch = () => {
        dispatch({ type: 'TOGGLE_SWITCH' });
    };

    const [name, setName] = React.useState(data[0]);
    const [description, setDescription] = React.useState(data[1]);

    const [systems, setSystems] = useState([]);
    const [ships, setShips] = useState([]);
  
    
  
    useEffect(() => {
      fetchSystems();
      fetchShips();
    }, []);
  
    const fetchSystems = () => {
        fetch('http://localhost:3005/api/getShipsSystem')
          .then(response => response.json())
          .then(data => {
            setSystems(data);
          })
          .catch(error => {
            console.error('Error fetching ship indicator:', error);
          });
    }
  
    const fetchShips = () => {
        fetch('http://localhost:3005/api/getShipsTypes')
          .then(response => response.json())
          .then(data => {
            setShips(data);
          })
          .catch(error => {
            console.error('Error fetching ship indicator:', error);
          });
    }

    const update = () => {
        fetch('http://localhost:3005/api/updateThreatsShipSystems', {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                description: description,
                system: system,
                vessel: vessel,
                IndicatorId: data[4]
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
                            <label htmlFor="name" className="form-title">Название угозы:</label>
                            <textarea onChange={(e) => setName(e.target.value)} value={name}  className="textArea-element" name="name" id="name" />
                        </div>
                        
                        <div className="form__elem">
                            <label htmlFor="description" className="form-title">Описание:</label>
                            <textarea onChange={(e) => setDescription(e.target.value)}  value={description}  className="textArea-element" name="description" id="description" />
                        </div>

                        
                        <div className="form__elem">
                            <label htmlFor="description" className="form-title">Система судна:</label>
                            <select className="select-menu" onChange={(e) => setSystem(e.target.value)}>
                                {systems.map((elem) => (
                                    <option  key={elem.system_name} value={elem.id}>{elem.system_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form__elem">
                            <label htmlFor="description" className="form-title">Судно:</label>
                            <select className="select-menu" onChange={(e) => setVessel(e.target.value)}>
                                {ships.map((elem) => (
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

export default ModalThreatsShipSystems;














