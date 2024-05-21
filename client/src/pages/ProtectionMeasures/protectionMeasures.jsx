import React, { useState, useEffect } from "react";
import Navbar from "../../ui/Navbar/navbar";
import DataSpaceProtectionMeasures from "../../ui/DataSpace/dataSpaceProtectionMeasures";

const ProtectionMeasures = () => {

    const [content, setContent] = useState([]);
    const [system_id, setSystem_id] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const description = formData.get('description');

        try {
            const response = await fetch('http://localhost:3005/api/addNewShipProtectionMeasures', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    system_id
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
        fetch('http://localhost:3005/api/getShipsSystem')
          .then(response => response.json())
          .then(data => {
            setContent(data);
          })
          .catch(error => {
            console.error('Error fetching ship systems:', error);
          });
    }

    return (
        <>
            <Navbar title={"Меры защиты"}/>
            <section className="content__space">
                <DataSpaceProtectionMeasures />

                <form onSubmit={handleSubmit} className="form-element">
                    <div className="form__elem">
                        <label htmlFor="name" className="form-title">Название меры защиты:</label>
                        <textarea className="textArea-element" name="name" id="name" />
                    </div>
                    
                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Описание:</label>
                        <textarea className="textArea-element" name="description" id="description" />
                    </div>

                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Система судна:</label>
                        <select className="select-menu" onChange={(e) => setSystem_id(e.target.value)}>
                        {content.map((elem) => (
                            <option  key={elem.system_name} value={elem.id}>{elem.system_name}</option>
                        ))}
                    </select>
                    </div>
                    

                    <button type="submit" className="form__btn-submit">Отправить</button>
                </form>
            </section>
        </>
    )
}

export default ProtectionMeasures;
