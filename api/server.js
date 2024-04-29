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



const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server is running on port ${port}`);
});