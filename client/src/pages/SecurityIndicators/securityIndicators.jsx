import React, { useState, useEffect } from "react";
import Navbar from "../../ui/Navbar/navbar";
import DataSpaceSecurityIndicators from "../../ui/DataSpace/dataSpaceSecurityIndicators";

const SecurityIndicators = () => {

    const [content, setContent] = useState([]);
    const [measure_id, setMeasure_id] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const indicator = formData.get('indicator');
        const description = formData.get('description');

        try {
            const response = await fetch('http://localhost:3005/api/addNewShipSecurityIndicator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    indicator,
                    description,
                    measure_id
                })
            });
            console.log(measure_id)
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
        fetch('http://localhost:3005/api/getAllShipsProtectionMeasures')
          .then(response => response.json())
          .then(data => {
            setContent(data);
          })
          .catch(error => {
            console.error('Error fetching ship indicator:', error);
          });
    }

    return (
        <>
            <Navbar />
            <section className="content__space">
                <DataSpaceSecurityIndicators />

                <form onSubmit={handleSubmit} className="form-element">
                    <div className="form__elem">
                        <label htmlFor="indicator" className="form-title">Показатель защищенности:</label>
                        <textarea className="textArea-element" name="indicator" id="indicator" />
                    </div>
                    
                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Описание:</label>
                        <textarea className="textArea-element" name="description" id="description" />
                    </div>

                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Мера защиты:</label>
                        <select className="select-menu" onChange={(e) => setMeasure_id(e.target.value)}>
                        {content.map((elem) => (
                            <option  key={elem.name} value={elem.id}>{elem.name}</option>
                        ))}
                    </select>
                    </div>
                    

                    <button type="submit" className="form__btn-submit">Отправить</button>
                </form>
            </section>
        </>
    )
}

export default SecurityIndicators;
