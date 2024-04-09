const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const DB_URL=process.env.DBLINK

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
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
app.set('view engine', 'ejs');



app.get("/yourAPI", (req, res) => {
    RouteModel.find()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            res.status(500).send("Error fetching data");
        });
});

const setupRoutes = async () => {
    try {
        const routes = await RouteModel.find();
        routes.forEach(routeData => {
            app.get(`/yourAPI/${routeData.routerName}`, (req, res) => {
                res.send(routeData.RouteData);
            });
        });
    } catch (error) {
        console.error("Error setting up routes:", error);
    }
};

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
        await setupRoutes();
        res.send("Data saved");
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("Error saving data");
    }
});

app.get("/home", async (req, res) => {
    const routes = await RouteModel.find();
    res.render('dashboard',{name:"Rahul",routes:routes});
});

app.listen(4000, () => {
    console.log("Server started");
    setupRoutes().then(r => console.log("routes were set up")); // Call setupRoutes after server starts
});
