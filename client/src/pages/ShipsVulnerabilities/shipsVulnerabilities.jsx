import React, { useState, useEffect } from "react";
import Navbar from "../../ui/Navbar/navbar";
import DataSpaceShipSystems from "../../ui/DataSpace/dataSpaceShipSystems";
import DataSpaceShipVulnerabilities from "../../ui/DataSpace/dataSpaceShipVulnerabilities";

const ShipsVulnerabilities = () => {

    const [content, setContent] = useState([]);
    const [threat_id, setThreat_id] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const vulnerability_name = formData.get('vulnerability_name');
        const description = formData.get('description');

        try {
            const response = await fetch('http://localhost:3005/api/addNewShipVulnerabilities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vulnerability_name,
                    description,
                    threat_id
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
        fetch('http://localhost:3005/api/getShipsThreat')
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
            <Navbar title={"Список уязвимостей"}/>
            <section className="content__space">
                <DataSpaceShipVulnerabilities />

                <form onSubmit={handleSubmit} className="form-element">
                    <div className="form__elem">
                        <label htmlFor="vulnerability_name" className="form-title">Название уязвимости:</label>
                        <textarea className="textArea-element" name="vulnerability_name" id="vulnerability_name" />
                    </div>
                    
                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Описание:</label>
                        <textarea className="textArea-element" name="description" id="description" />
                    </div>

                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Угроза:</label>
                        <select className="select-menu" onChange={(e) => setThreat_id(e.target.value)}>
                        {content.map((elem) => (
                            <option  key={elem.threat_name} value={elem.id}>{elem.threat_name}</option>
                        ))}
                    </select>
                    </div>
                    

                    <button type="submit" className="form__btn-submit">Отправить</button>
                </form>
            </section>
        </>
    )
}

export default ShipsVulnerabilities;
