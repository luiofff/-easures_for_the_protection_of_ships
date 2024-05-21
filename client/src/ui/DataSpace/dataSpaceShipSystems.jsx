import React from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";
import ModalShipSystem from "../Modals/modalShipSystem";
import { useDispatch, useSelector } from 'react-redux';

const DataSpaceShipSystems = () => {

    const dispatch = useDispatch();
    const [content, setContent] = React.useState([]);
    

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:3005/api/getShipsSystem')
          .then(response => response.json())
          .then(data => {
            setContent(data);
          })
          .catch(error => {
            console.error('Error fetching ship types:', error);
          });
    }

    const handleElemClick = (data) => {
        handleToggleSwitch()
        dispatch({ type: 'UPDATE_SELECTED_DATA', payload: data });
    }
    
    
    const handleToggleSwitch = () => {
        dispatch({ type: 'TOGGLE_SWITCH' });
    };
    
      
    const modalHandler = useSelector(state => state.toggleSwitch)

    return (
        <>
            {
                modalHandler ? <ModalShipSystem/> : <></>
            }
            <div className={styles.content__block}>
                {content.map((elem) => (
                    <div onClick={() => handleElemClick([elem.system_name, elem.description, elem.ship_type, elem.id])}>
                        <DataContentListElem arr={[elem.system_name, elem.description, elem.ship_type]} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default DataSpaceShipSystems;