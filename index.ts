import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import DBConnector from "./src/services/connection.ts";
import user from "./src/models/User.ts";
import handle404 from "./src/services/Notfound.ts";
import LoginRoute from "./src/routes/LoginRoute.ts";
import RegistrationRoute from "./src/routes/RegistrationRoute.ts";
import LogoutRoute from "./src/routes/LogoutRoute.ts";
import HomeRoutes from "./src/routes/HomeRoutes.ts";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');


DBConnector("mongodb://127.0.0.1:27017/tester");




app.use(session({
    secret: 'hello there',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        //the user was login in for 7 days
        maxAge: 60 * 60 * 24 * 7 * 1000,
    },
}));

app.use(LoginRoute);
app.use(RegistrationRoute);
app.use(LogoutRoute);
app.use(HomeRoutes);



app.post("/addElement",async (req:Request,res:Response)=>{
   if (req.session.user) {
       const element: string = req.body.element;
       const userElement = await user.findOne({ email: req.session.user.email });
         userElement.element = element;
            userElement.save().then((result: any) => {
                console.log("new element was added "+result.element);
                res.redirect('/dashboard');
            }).catch((err: any) => {
                console.log(err);
                res.render('dashboard',{error:true,message:"Something went wrong"});
            });
   }
})

app.use(handle404);


app.listen(3000, async () => {
    console.log('Server is running on port 3000');
});
