import React, { useState, useEffect } from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";
import { useDispatch, useSelector } from 'react-redux';
import ModalShipType from "../Modals/modalShipType";



const DataSpaceShipType = () => {
  const [content, setContent] = useState(
    []
  );
  const dispatch = useDispatch();
 


  const fetchData = () => {
    fetch('http://localhost:3005/api/getShipsTypes')
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
        modalHandler ? <ModalShipType/> : <></>
      }
      
      <div className={styles.content__block}>
        {content.map((elem) => (
          <div onClick={() => handleElemClick([elem.ship_type, elem.description, elem.id])}>
            <DataContentListElem arr={[elem.ship_type, elem.description]} />
          </div>
        ))}
      </div>
    </>

  );
}

export default DataSpaceShipType;
