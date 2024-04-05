const express=require("express");
const bodyParser=require("body-parser")

const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const ds={
   name:"datta"
}
const routing=[];

app.get("/",(req, res)=>{
    if (routing.length===0){
        return res.send("no data")
    }
   res.send(routing)
})




app.post("/",(req, res)=>{
    console.log(req.body.route)
    routing.push(req.body)

  res.send("post request")
})

app.listen(4000,()=>{
   console.log("server was started")
});