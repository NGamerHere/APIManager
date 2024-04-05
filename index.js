const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/APIMANAGER", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.error("Error connecting to MongoDB:", error);
});

const routeSchema = new mongoose.Schema({
    routerName: String,
    RouteData: mongoose.Schema.Types.Mixed
});

const RouteModel = mongoose.model("Route", routeSchema);

// POST route to save route data
app.post("/", async (req, res) => {
    try {
        if (!req.body.routerName || !req.body.routeData) {
            return res.status(400).send("Invalid data");
        }
        const data = req.body;
        const ds = new RouteModel({
            routerName: data.routerName,
            RouteData: data.routeData
        });
        await ds.save();
        await setupRoutes(); // Refresh routes after saving data
        res.send("Data saved");
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("Error saving data");
    }
});

// GET route to fetch all route data
app.get("/", async (req, res) => {
    try {
        const routes = await RouteModel.find();
        res.send(routes);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

// Function to dynamically set up routes based on data in the database
const setupRoutes = async () => {
    try {
        const routes = await RouteModel.find();
        app._router.stack // Clear previous routes
            .filter(route => route.route)
            .forEach(route => {
                app._router.stack.splice(app._router.stack.indexOf(route), 1);
            });

        routes.forEach(routeData => {
            app.get(`/api/${routeData.routerName}`, (req, res) => {
                res.send(routeData.RouteData);
            });
        });
    } catch (error) {
        console.error("Error setting up routes:", error);
    }
};

app.listen(4000, () => {
    console.log("Server started");
    setupRoutes(); // Initial setup of routes
});
