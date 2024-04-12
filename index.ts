
import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import DBConnector from "./connection.ts";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

DBConnector("mongodb://127.0.0.1:27017/tester");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const user=mongoose.model('user',userSchema);


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



app.get('/registration', (req: Request, res: Response) => {
    res.render('registration');
})
app.get('/login', (req: Request, res: Response) => {
    res.render('login');
});
app.get('/logout', (req: Request, res: Response) => {
  req.session.destroy();
    res.redirect('/');
})
app.get("/", (req: Request, res: Response) => {
   res.render('home');
});

app.post('/login',async (req:Request,res:Response)=>{
   const email:string=req.body.email;
   const password:string=req.body.password;
    const flame = await user.findOne({ email: email });
    if (flame) {
        if (flame.password === password) {
            req.session.user = flame;
            res.redirect('/dashboard');
        } else {
            res.send('Password is incorrect');
        }
    } else {
        res.send('User not found');
    }

});

app.get('/dashboard', (req: Request, res: Response) => {
    if (req.session.user) {
        res.render('dashboard',{name: req.session.user.name});
    } else {
        res.send('You need to login first');
    }
});

app.post('/registration',(req:Request,res:Response)=> {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const newUser = new user({
        name: name,
        email: email,
        password: password
    });
    newUser.save().then((result: any) => {
        console.log("new user was added "+result.name);
        res.redirect('/login');
    }).catch((err: any) => {
        console.log(err);
        res.send('Data not Saved');
    });

})



app.listen(3000, async () => {
    console.log('Server is running on port 3000');
});
