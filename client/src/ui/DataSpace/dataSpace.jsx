
import DataContentListElem from "../DataContentListElem/dataContentListElem";
import styles from "./dataSpace.module.css"

const DataSpace = () => {
    return (
        <>
            <div className={styles.content__block}>
                <DataContentListElem />
                <DataContentListElem />
                <DataContentListElem />
                <DataContentListElem />
                <DataContentListElem />
                <DataContentListElem />
                <DataContentListElem />
                <DataContentListElem />
            </div>
        </>
    )
}

export default DataSpace;
