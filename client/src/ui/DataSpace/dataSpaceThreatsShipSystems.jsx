
import React, { useState, useEffect } from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";
import { useSelector, useDispatch } from 'react-redux';
import ModalThreatsShipSystems from "../Modals/modalThreatsShipSystems";


const DataSpaceThreatsShipSystems = () => {


  const [content, setContent] = useState(
    []
  );

  

  const fetchData = () => {
    fetch('http://localhost:3005/api/getThreatSystemShip')
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

  const dispatch = useDispatch();

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
            modalHandler ? <ModalThreatsShipSystems /> : <></>
      }
      <div className={styles.content__block}>
          {content.map((elem) => (
            <div onClick={() => handleElemClick([elem.name, elem.description, elem.system_name, elem.ship_type, elem.id])}>
               <DataContentListElem arr={[elem.name, elem.description, elem.system_name, elem.ship_type]} />
            </div>
          ))}
      </div>
    </>
  );
}

export default DataSpaceThreatsShipSystems;
