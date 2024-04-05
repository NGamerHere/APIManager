const express=require("express");
const bodyParser=require("body-parser")

const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const routing=[];

app.get("/",(req, res)=>{
    if (routing.length===0){
        return res.send("no data")
    }
   res.send(routing)
})

const setupRoutes = () => {
    routing.forEach(routeData => {
        app.get(`/${routeData.route}`, (req, res) => {
            res.send(routeData.ds);
        });
    });
};



app.post("/",(req, res)=>{
    if (!req.body.route || !req.body.ds) {
        return res.status(400).send("Invalid data");
    }
    console.log(req.body.route)
    routing.push(req.body)
    setupRoutes();
  res.send("post request")
})



app.listen(4000,()=>{
   console.log("server was started")
});