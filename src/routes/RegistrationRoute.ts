import express,{Request,Response} from "express";
import session from "express-session";
import user from "../models/User.ts";

const RegistrationRoute=express.Router();

RegistrationRoute.get('/registration', (req: Request, res: Response) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    }
    res.render('registration',{error:false});
})
RegistrationRoute.post('/registration',async (req:Request,res:Response)=> {
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

});

export default RegistrationRoute;