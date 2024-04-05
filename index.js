const express=require("express");

const app=express();

app.get("/",(req, res)=>{
   res.send("hello there")
})


app.post("",(req, res)=>{

})

app.listen(4000,()=>{
   console.log("server was started")
});