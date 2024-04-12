import mongoose from "mongoose";

function DBConnector(url:string){

    mongoose.connect(url).then(() => console.log('Connected!'))
        .catch((error)=>{console.log("there  was error in connecting the mongodb: "+error)});

}
export default DBConnector;