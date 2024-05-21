
import React, { useState, useEffect } from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";
import ModalShipProtectionMeasures from "../../ui/Modals/modalShipProtectionMeasures";

import { useSelector, useDispatch } from 'react-redux';

const DataSpaceProtectionMeasures = () => {
  const [content, setContent] = useState(
    []
  );

  const dispatch = useDispatch();

  const fetchData = () => {
    fetch('http://localhost:3005/api/getShipsProtectionMeasures')
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
            modalHandler ? <ModalShipProtectionMeasures /> : <></>
        }
        <div className={styles.content__block}>
            {content.map((elem) => (
                <div onClick={() => handleElemClick([elem.name, elem.description, elem.system_name, elem.id])}>
                    <DataContentListElem arr={[elem.name, elem.description, elem.system_name]} />
                </div>
            ))}
        </div>
    </>
  );
}

export default DataSpaceProtectionMeasures;
