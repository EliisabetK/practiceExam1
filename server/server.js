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

app.get('/api/routes/:fromcity/:tocity/:departuretime/:departuredate', async (req, res) => {
    try {
        console.log("A get route request has arrived");
        const { fromcity, tocity, departuretime, departuredate } = req.params;
        const routes = await pool.query(
            "SELECT * FROM routes WHERE fromcity = $1 AND tocity = $2 AND departuretime = $3 AND departuredate = $4",
            [fromcity, tocity, departuretime, departuredate]
        );

        if (routes.rows.length === 0) {
            // No route found with the specified parameters
            return res.status(404).json({ message: 'Not found' });
        }

        res.json(routes.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/api/routes/:fromcity/:tocity/:departuretime/:departuredate', async (req, res) => {
    try {
        const { fromcity, tocity, departuretime, departuredate } = req.params;
        console.log("update seats request has arrived");

        // First, get the current number of seats
        const currentSeatsResult = await pool.query(
            "SELECT seats FROM routes WHERE fromcity = $1 AND tocity = $2 AND departuretime = $3 AND departuredate = $4",
            [fromcity, tocity, departuretime, departuredate]
        );

        if (currentSeatsResult.rows.length === 0) {
            // No route found with the specified parameters
            return res.status(404).json({ message: 'Route not found' });
        }

        const currentSeats = currentSeatsResult.rows[0].seats;

        // Then, decrease the number of seats by 1
        const newSeats = currentSeats - 1;

        const updateseats = await pool.query(
            "UPDATE routes SET seats = $1 WHERE fromcity = $2 AND tocity = $3 AND departuretime = $4 AND departuredate = $5 RETURNING *",
            [newSeats, fromcity, tocity, departuretime, departuredate]
        );
        res.json({ seats: updateseats.rows[0].seats });
        console.log("seats updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/api/routes/:fromcity', async (req, res) => {
    try {
        console.log("Get a route with fromcity parameter request has arrived");
        const { fromcity } = req.params;
        const result = await pool.query("SELECT * FROM routes WHERE fromcity = $1", [fromcity]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Route not found' });
        }
        console.log("Route found")
        res.json(result.rows);       
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/busses/:model', async (req, res) => {
    try {
        console.log("Get a bus with model parameter request has arrived");
        const { model } = req.params;
        const result = await pool.query("SELECT * FROM busses WHERE model = $1", [model]);

        if (result.rows.length === 0) {
            // No bus found with the specified model
            return res.status(404).json({ message: 'Bus not found' });
        }
        console.log("Bus found")
        res.json({ seats: result.rows[0].seats });        // Assuming you only expect one bus with a unique model
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal Server Error' });
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
app.delete('/api/routes', async(req, res) => {
    try {
        console.log("delete all request has arrived");
        const deleteroutes = await pool.query(
            "DELETE FROM routes",
        );
        res.json(deleteroutes);
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/api/routes/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const route = req.body;
        console.log("update request has arrived");
        const updateroute = await pool.query(
            "UPDATE routes SET (fromcity, tocity, cost, departuretime, departuredate) = ($2, $3, $4, $5, $6) WHERE id = $1 RETURNING*", [id, route.fromcity, route.tocity, route.cost, route.departuretime, route.departuredate]
        );
        res.json(updateroute);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});