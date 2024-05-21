import React, { useState, useEffect } from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";
import { useDispatch, useSelector } from 'react-redux';
import ModalShipThreats from "../Modals/modalShipThreats";

const DataSpceShipThreats = () => {
  const [content, setContent] = useState(
    []
  );

  const fetchData = () => {
    fetch('http://localhost:3005/api/getShipsThreat')
      .then(response => response.json())
      .then(data => {
        setContent(data);
      })
      .catch(error => {
        console.error('Ошибка запроса:', error);
      });
      
  }

  const dispatch = useDispatch();

  const handleElemClick = (data) => {
    handleToggleSwitch()
    dispatch({ type: 'UPDATE_SELECTED_DATA', payload: data });
  }


  const handleToggleSwitch = () => {
    dispatch({ type: 'TOGGLE_SWITCH' });
  };

  
  const modalHandler = useSelector(state => state.toggleSwitch)

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      {
        modalHandler ? <ModalShipThreats/> : <></>
      }
      
      <div className={styles.content__block}>
        {content.map((elem) => (
          <div onClick={() => handleElemClick([elem.threat_name, elem.description, elem.source, elem.id])}>
              <DataContentListElem arr={[elem.threat_name, elem.description, elem.source]} />
          </div>
        ))}
      </div>
    </>
  );
}

export default DataSpceShipThreats;
