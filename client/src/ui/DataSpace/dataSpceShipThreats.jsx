import React, { useState, useEffect } from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";

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

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <div className={styles.content__block}>
        {content.map((elem) => (
          <DataContentListElem arr={[elem.threat_name, elem.description, elem.source]} />
        ))}
      </div>
    </>
  );
}

export default DataSpceShipThreats;
