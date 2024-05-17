import React from "react";
import Navbar from "../../ui/Navbar/navbar";
import DataSpceShipThreats from "../../ui/DataSpace/dataSpceShipThreats";

const ShipsThreats = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const threat_name = formData.get('threat_name');
        const description = formData.get('description');
        const source = formData.get('source');

        try {
            const response = await fetch('http://localhost:3005/api/addNewShipThreat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    threat_name,
                    description,
                    source
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

    return (
        <>
         <Navbar />
            <section className="content__space">
                <DataSpceShipThreats />

                <form onSubmit={handleSubmit} className="form-element">
                    <div className="form__elem">
                        <label htmlFor="threat_name" className="form-title">Название системы судна:</label>
                        <textarea className="textArea-element" name="threat_name" id="threat_name" />
                    </div>
                    
                    <div className="form__elem">
                        <label htmlFor="description" className="form-title">Описание:</label>
                        <textarea className="textArea-element" name="description" id="description" />
                    </div>

                    <div className="form__elem">
                        <label htmlFor="source" className="form-title">Ресурс:</label>
                        <textarea className="textArea-element" name="source" id="source" />
                    </div>

                    <button type="submit" className="form__btn-submit">Отправить</button>
                </form>
            </section>
        </>
    )
}

export default ShipsThreats;