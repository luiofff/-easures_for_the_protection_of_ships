
import React, { useState, useEffect } from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";
import { useDispatch, useSelector } from 'react-redux';
import ModalShipVulnerabilities from "../Modals/modalVulnerabilities";



const DataSpaceShipVulnerabilities = () => {
    const [content, setContent] = useState(
        []
    );

    const dispatch = useDispatch();

    const handleElemClick = (data) => {
        handleToggleSwitch()
        dispatch({ type: 'UPDATE_SELECTED_DATA', payload: data });
    }


    const handleToggleSwitch = () => {
        dispatch({ type: 'TOGGLE_SWITCH' });
    };

    
    const modalHandler = useSelector(state => state.toggleSwitch)

    const fetchData = () => {
        fetch('http://localhost:3005/api/getShipsVulnerabilities')
        .then(response => response.json())
        .then(data => {
            setContent(data);
        })
        .catch(error => {
            console.error('Ошибка запроса:', error);
        });
        
    }

    useEffect(() => {
        fetchData()
    }, []);

  return (
    <>
      {
        modalHandler ? <ModalShipVulnerabilities/> : <></>
      }
      
      <div className={styles.content__block}>
        {content.map((elem) => (
          <div onClick={() => handleElemClick([elem.vulnerability_name, elem.description, elem.threat_name, elem.id])}>
              <DataContentListElem arr={[elem.vulnerability_name, elem.description, elem.threat_name]} />
          </div>
        ))}
      </div>
    </>
  );
}

export default DataSpaceShipVulnerabilities;
