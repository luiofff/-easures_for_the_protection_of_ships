
import React, { useState, useEffect } from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";
import { useSelector, useDispatch } from 'react-redux';
import ModalSecurityIndicators from "../../ui/Modals/modalSecurityIndicators"

const DataSpaceSecurityIndicators = () => {
  const [content, setContent] = useState(
    []
  );

  const modalHandler = useSelector(state => state.toggleSwitch)

  const fetchData = () => {
    fetch('http://localhost:3005/api/getShipsSecurityIndicators')
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

  return (
    <>

      {
            modalHandler ? <ModalSecurityIndicators /> : <></>
      }
      <div className={styles.content__block}>
          {content.map((elem) => (
            <div onClick={() => handleElemClick([elem.indicator, elem.description, elem.name, elem.id])}>
               <DataContentListElem arr={[elem.indicator, elem.description, elem.name]} />
            </div>
          ))}
      </div>
    </>
  );
}

export default DataSpaceSecurityIndicators;
