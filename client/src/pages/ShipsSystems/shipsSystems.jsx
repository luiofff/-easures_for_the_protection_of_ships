import React, { useState, useEffect } from "react";
import Navbar from "../../ui/Navbar/navbar";
import DataSpaceShipSystems from "../../ui/DataSpace/dataSpaceShipSystems";

const ShipsSystems = () => {

    const [content, setContent] = useState([]);
    const [vessel, setVessel] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const system_name = formData.get('name_ship_system');
        const description = formData.get('description');

        try {
            const response = await fetch('http://localhost:3005/api/addNewShipSystem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    system_name,
                    description,
                    vessel
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                window.location.reload()
            } else {
                console.error('Server error');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:3005/api/getShipsTypes')
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
            <Navbar />
            <section className="content__space">
                <DataSpaceShipSystems content={[1,2,3]}/>

                <form onSubmit={handleSubmit} className="form-element">
                    <div className="form__elem">
                        <label htmlFor="name_ship_system" className="form-title">Название системы судна:</label>
                        <textarea className="textArea-element" name="name_ship_system" id="name_ship_system" />
                    </div>
                    
                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Описание:</label>
                        <textarea className="textArea-element" name="description" id="description" />
                    </div>

                    <select className="select-menu" onChange={(e) => setVessel(e.target.value)}>
                        {content.map((elem) => (
                            <option   key={elem.ship_type} value={elem.id}>{elem.ship_type}</option>
                        ))}
                    </select>

                    <button type="submit" className="form__btn-submit">Отправить</button>
                </form>
            </section>
        </>
    )
}

export default ShipsSystems;
