import React, { useState, useEffect } from "react";
import Navbar from "../../ui/Navbar/navbar";
import DataSpaceThreatsShipSystems from "../../ui/DataSpace/dataSpaceThreatsShipSystems";

const ThreatsShipSystems = () => {

    const [systems, setSystems] = useState([]);
    const [ships, setShips] = useState([]);
    const [relationship_system, setRelationship_system] = useState(0);
    const [relationship_ship, setRelationship_ship] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const description = formData.get('description');

        try {
            const response = await fetch('http://localhost:3005/api/addNewThreatSystemShip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    relationship_system,
                    relationship_ship
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
        fetchSystems();
        fetchShips();
    }, []);

    const fetchSystems = () => {
        fetch('http://localhost:3005/api/getShipsSystem')
          .then(response => response.json())
          .then(data => {
            setSystems(data);
          })
          .catch(error => {
            console.error('Error fetching ship indicator:', error);
          });
    }

    const fetchShips = () => {
        fetch('http://localhost:3005/api/getShipsTypes')
          .then(response => response.json())
          .then(data => {
            setShips(data);
          })
          .catch(error => {
            console.error('Error fetching ship indicator:', error);
          });
    }

    return (
        <>
            <Navbar />
            <section className="content__space">
                <DataSpaceThreatsShipSystems />

                <form onSubmit={handleSubmit} className="form-element">
                    <div className="form__elem">
                        <label htmlFor="name" className="form-title">Название угозы:</label>
                        <textarea className="textArea-element" name="name" id="name" />
                    </div>
                    
                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Описание:</label>
                        <textarea className="textArea-element" name="description" id="description" />
                    </div>

                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Система судна:</label>
                        <select className="select-menu" onChange={(e) => setRelationship_system(e.target.value)}>
                        {systems.map((elem) => (
                            <option  key={elem.system_name} value={elem.id}>{elem.system_name}</option>
                        ))}
                        </select>
                    
                    </div>


                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Судно:</label>
                        <select className="select-menu" onChange={(e) => setRelationship_ship(e.target.value)}>
                        {ships.map((elem) => (
                            <option  key={elem.ship_type} value={elem.id}>{elem.ship_type}</option>
                        ))}
                    </select>
                    
                    </div>
                    

                    <button type="submit" className="form__btn-submit">Отправить</button>
                </form>
            </section>
        </>
    )
}

export default ThreatsShipSystems;
