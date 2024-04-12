import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import DBConnector from "./src/services/connection.ts";
import user from "./src/models/User.ts";
import handle404 from "./src/services/Notfound.ts";

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



app.get('/registration', (req: Request, res: Response) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    }
    res.render('registration',{error:false});
})
app.get('/login', (req: Request, res: Response) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    }
    res.render('login',{error:false});
});
app.get('/logout', (req: Request, res: Response) => {
  req.session.destroy();
    res.redirect('/');
})
app.get("/", (req: Request, res: Response) => {
    if (req.session.user) {
        res.render('home',{not:false,log:true,name:req.session.user.name});
    }
   res.render('home',{not:true,log:false});
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
            res.render('login',{error:true,message:"Password is incorrect"})
        }
    } else {
        res.render('login',{error:true,message:"user not found"})
    }

});

app.get('/dashboard', (req: Request, res: Response) => {
    if (req.session.user) {
        res.render('dashboard',{name: req.session.user.name});
    } else {
        res.redirect('/login');
    }
});

app.post('/registration',async (req:Request,res:Response)=> {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const Email = await user.findOne({ email: email });
    if (Email) {
        return res.render('registration',{error:true,message:"Email is already exist"});
    }
   else {
        const newUser =await new user({
            name: name,
            email: email,
            password: password
        });
        newUser.save().then((result: any) => {
            console.log("new user was added "+result.name);
            res.redirect('/login');
        }).catch((err: any) => {
            console.log(err);
            res.render('registration',{error:true,message:"Something went wrong"});
        });
    }

})
app.use(handle404);


app.listen(3000, async () => {
    console.log('Server is running on port 3000');
});
