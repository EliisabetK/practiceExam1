const express = require('express');
const pool = require('./database');
const cors = require('cors')


const port = process.env.PORT || 3000;
const app = express();



app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());


app.get('/api/routes', async(req, res) => {
    try {
        console.log("A get all request has arrived");
        const routes = await pool.query(
            "SELECT * FROM routes ORDER BY id"
        );
        res.json(routes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/routes/:id', async(req, res) => {
    try {
        console.log("get a post with route parameter request has arrived");
        const { id } = req.params;
        const posts = await pool.query(
            "SELECT * FROM routes WHERE fromcity = $1", [id]
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/api/routes', async(req, res) => {
    try {
        console.log("A post request has arrived");
        const route = req.body;
        const newpost = await pool.query(
            "INSERT INTO routes (fromcity, tocity, cost, departuretime, departuredate) values ($1, $2, $3, $4, $5)    RETURNING*", [route.fromcity, route.tocity, route.cost, route.departuretime, route.departuredate]
        );
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/api/routes/:id', async(req, res) => {
    try {
        const { id } = req.params;
        console.log("delete a route request has arrived");
        const deleteroute = await pool.query(
            "DELETE FROM routes WHERE id = $1 RETURNING*", [id]
        );
        res.json(deleteroute);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});