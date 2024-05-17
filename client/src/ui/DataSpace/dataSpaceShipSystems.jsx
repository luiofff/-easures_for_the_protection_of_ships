import React from "react";
import styles from "./dataSpace.module.css";
import DataContentListElem from "../DataContentListElem/dataContentListElem";

const DataSpaceShipSystems = () => {


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

    return (
        <>
            <div className={styles.content__block}>
                {content.map((elem) => (
                    <DataContentListElem arr={[elem.system_name, elem.description, elem.ship_type]} />
                ))}
            </div>
        </>
    )
}

export default DataSpaceShipSystems;