import React, { useState, useEffect } from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



const DataSpaceShipType = () => {
  const [content, setContent] = useState(
    []
  );
  const dispatch = useDispatch();
 
  const red = useSelector(state => state.selectedData)

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

  const [selectedData, setSelectedData] = useState([]); // Хранение выбранных данных

  const handleElemClick = (data) => {
    dispatch({ type: 'UPDATE_SELECTED_DATA', payload: data });
  }


  return (
    <>
      <div className={styles.content__block}>
        {content.map((elem) => (
          <div onClick={() => handleElemClick([elem.ship_type, elem.description])}>
            <DataContentListElem arr={[elem.ship_type, elem.description]} />
          </div>
        ))}
      </div>

      <div>
        {red}
      </div>
    </>

  );
}

export default DataSpaceShipType;
