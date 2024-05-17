import React, { useState } from "react"
import styles from "./dataContentListElem.module.css"

const DataContentListElem = ({arr}) => {
   

    return (
        <>
            <div name="elem_listed" className={styles.list_elem__block}>
                {arr.map((elem, index) => (
                    <p key={index} className={styles.text}>{elem}</p>
                ))}
            </div>
            
        </>
    )
}

export default DataContentListElem;
