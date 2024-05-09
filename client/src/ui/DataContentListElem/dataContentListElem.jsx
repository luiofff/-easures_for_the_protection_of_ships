import styles from "./dataContentListElem.module.css"

const DataContentListElem = () => {
    return (
        <>
            <div className={styles.list_elem__block}>
                <h1 className={styles.title}>Сверх тяж судно морское</h1>
                <p className={styles.text}>Compiled with warnings.

                [eslint] 
                src/pages/ShipsList/shipsList.jsx
                Line 4:8:  'styles' is defined but never used  no-unused-vars

                Search for the keywords to learn more about each warning.
                To ignore, add // eslint-disable-next-line to the line before.

                WARNING in [eslint] 
                src/pages/ShipsList/shipsList.jsx
                Line 4:8:  'styles' is defined but never used  no-unused-vars
                </p>
            </div>
        </>
    )
}

export default DataContentListElem;