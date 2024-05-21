import DataSpaceShipType from "../../ui/DataSpace/dataSpaceShipType";
import Navbar from "../../ui/Navbar/navbar";

import React from "react";

const ShipsList = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const ship_type = formData.get('type_ship');
        const description = formData.get('description');

        try {
            const response = await fetch('http://localhost:3005/api/addNewShip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ship_type,
                    description
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                window.location.reload();
            } else {
                console.error('Server error');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    


    return (
        <>
        <Navbar title={"Список судов"}/>
        <section className="content__space">
            <DataSpaceShipType />

            <form onSubmit={handleSubmit} className="form-element">
                <div className="form__elem">
                    <label htmlFor="type_ship" className="form-title">Тип судна:</label>
                    <textarea className="textArea-element" name="type_ship" id="type_ship" />
                </div>
                
                <div className="form__elem">
                    <label htmlFor="description" className="form-title">Описание:</label>
                    <textarea className="textArea-element" name="description" id="description" />
                </div>

                <button type="submit" className="form__btn-submit">Отправить</button>
            </form>
        </section>
    </>
    )
}

export default ShipsList;
