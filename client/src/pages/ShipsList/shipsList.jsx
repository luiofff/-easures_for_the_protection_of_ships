
import DataSpace from "../../ui/DataSpace/dataSpace";
import Navbar from "../../ui/Navbar/navbar";
import styles from "./shipsList.module.css"



const ShipsList = () => {
    return (
        <>
            <Navbar />
            <section className="content__space">
                <DataSpace/>
                <form action="" className="form-element">
                    <div className={styles.form__elem}>
                        <label for="story" className="form-title">Тип судна:</label>
                        <textarea className="textArea-element" name="story">
                      
                        </textarea>
                    </div>
                    
                    <div className={styles.form__elem}>
                        <label for="story" className="form-title">Тип судна:</label>
                        <textarea className="textArea-element" name="story">
                      
                        </textarea>
                    </div>

                    <div className={styles.form__elem}>
                        <label for="story" className="form-title">Тип судна:</label>
                        <textarea className="textArea-element" name="story">
                      
                        </textarea>
                    </div>

                    <button className="form__btn-submit">Отправить</button>
                </form>
            </section>
        </>
    )
}

export default ShipsList;