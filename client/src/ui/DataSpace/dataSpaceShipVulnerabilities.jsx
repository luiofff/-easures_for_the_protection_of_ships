
import React, { useState, useEffect } from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";

const DataSpaceShipVulnerabilities = () => {
  const [content, setContent] = useState(
    []
  );

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
      <div className={styles.content__block}>
        {content.map((elem) => (
          <DataContentListElem arr={[elem.vulnerability_name, elem.description, elem.threat_name]} />
        ))}
      </div>
    </>
  );
}

export default DataSpaceShipVulnerabilities;
