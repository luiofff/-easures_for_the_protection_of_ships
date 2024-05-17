const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require("./db");
const app = express();

const port = 3005


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/api/auth', async (req, res) => {
    try {

        const { login, pass} = req.body;
    
        const user = await pool.query('SELECT * FROM public.users WHERE login = $1', [login]);
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (user.rows[0].login === login && user.rows[0].pass === pass) {
            res.send(true)
        } else {
            res.send(false)
        }
    
        
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
});


app.post('/api/addNewShip', async (req, res) => {
    try {
        const { ship_type, description } = req.body;

        // Добавление нового корабля в таблицу ships_list
        const newShip = await pool.query("INSERT INTO public.ships_list (ship_type, description) VALUES ($1, $2) RETURNING *", [ship_type, description]);

        res.json({ message: `Добавлен новый корабль тип ${ship_type} описание ${description}`, newShip: newShip.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


app.get("/api/getShipsTypes", async (req, res) => {
    try {

        // выводим всех кораблей
        const getShips = await pool.query("SELECT * FROM public.ships_list");

        res.send(getShips.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})



app.post('/api/addNewShipSystem', async (req, res) => {
    try {
        const { system_name, description, vessel } = req.body;

    
        const newShip = await pool.query("INSERT INTO public.systems_list (system_name, description, vessel) VALUES ($1, $2, $3) RETURNING *", [system_name, description, vessel]);

        res.json({ message: `Добавлена новая сисистема название ${system_name} описание ${description} судно ${vessel}`, newShip: newShip.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get("/api/getShipsSystem", async (req, res) => {
    try {

        const getSystems = await pool.query('SELECT public.systems_list.*, public.ships_list.ship_type FROM public.ships_list INNER JOIN public.systems_list ON public.ships_list.id = public.systems_list.vessel;');


        res.send(getSystems.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})



app.post('/api/addNewShipThreat', async (req, res) => {
    try {
        const { threat_name, description, source } = req.body;

    
        const newShip = await pool.query("INSERT INTO public.threats_ship (threat_name, description, source) VALUES ($1, $2, $3) RETURNING *", [threat_name, description, source]);

        res.json({ message: `Добавлена новая угроза название ${threat_name} описание ${description} ресурс ${source}`, newShip: newShip.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


app.get("/api/getShipsThreat", async (req, res) => {
    try {

        // выводим все угрозы
        const getShips = await pool.query("SELECT * FROM public.threats_ship");

        res.send(getShips.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})




app.post('/api/addNewShipVulnerabilities', async (req, res) => {
    try {
        const { vulnerability_name, description, threat_id } = req.body;

    
        const newShip = await pool.query("INSERT INTO public.vulnerabilities_ship (vulnerability_name, description, threat_id) VALUES ($1, $2, $3) RETURNING *", [vulnerability_name, description, threat_id]);

        res.json({ message: `Добавлена новая узвимость название ${vulnerability_name} описание ${description} угроза ${vulnerability_name}`, newShip: newShip.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get("/api/getShipsVulnerabilities", async (req, res) => {
    try {

        const getSystems = await pool.query('SELECT public.vulnerabilities_ship.*, public.threats_ship.threat_name FROM public.threats_ship INNER JOIN public.vulnerabilities_ship ON public.threats_ship.id = public.vulnerabilities_ship.threat_id;');


        res.send(getSystems.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


app.post('/api/addNewShipProtectionMeasures', async (req, res) => {
    try {
        const { name, description, system_id } = req.body;

    
        const newMeasures = await pool.query("INSERT INTO public.measures(name, description, ship_id) VALUES ($1, $2, $3) RETURNING *", [name, description, system_id]);

        res.json({ message: `Добавлена новая мера защиты ${name} описание ${description} корабль ${system_id}`, newMeasures: newMeasures.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get("/api/getShipsProtectionMeasures", async (req, res) => {
    try {

        const getMeasures = await pool.query('SELECT public.measures.*, public.systems_list.system_name FROM public.systems_list INNER JOIN public.measures ON public.systems_list.id = public.measures.ship_id;');


        res.send(getMeasures.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


app.get("/api/getAllShipsProtectionMeasures", async (req, res) => {
    try {

        const getMeasures = await pool.query('SELECT * FROM public.measures;');


        res.send(getMeasures.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})









app.post('/api/addNewShipSecurityIndicator', async (req, res) => {
    try {
        const { indicator, description, measure_id } = req.body;

    
        const newIndicator = await pool.query("INSERT INTO public.shipsecurityindicator(indicator, description, protection_measure) VALUES ($1, $2, $3) RETURNING *", [indicator, description, measure_id ]);

        res.json({ message: `Добавлена новый показатель ${indicator} описание ${description} мера ${measure_id}`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get("/api/getShipsSecurityIndicators", async (req, res) => {
    try {

        const getIndicators = await pool.query('SELECT public.shipsecurityindicator.*, public.measures.name FROM public.measures INNER JOIN public.shipsecurityindicator ON public.measures.id = public.shipsecurityindicator.protection_measure;');


        res.send(getIndicators.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


app.post('/api/addNewThreatSystemShip', async (req, res) => {
    try {
        const { name, description, relationship_system, relationship_ship } = req.body;

    
        const newThreat = await pool.query("INSERT INTO public.threats_ship_systems(name, description, relationship_system, relationship_ship) VALUES ($1, $2, $3, $4) RETURNING *", [name, description, relationship_system, relationship_ship]);

        res.json({ message: `Added new threat ${name} description ${description} relationship system ${relationship_system}`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


app.get("/api/getThreatSystemShip", async (req, res) => {
    try {

        const getIndicators = await pool.query('SELECT public.threats_ship_systems.*, public.systems_list.system_name, public.ships_list.ship_type FROM public.systems_list INNER JOIN public.threats_ship_systems ON public.systems_list.id = public.threats_ship_systems.relationship_system INNER JOIN public.ships_list ON public.ships_list.id = public.threats_ship_systems.relationship_ship;');


        res.send(getIndicators.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server is running on port ${port}`);
});