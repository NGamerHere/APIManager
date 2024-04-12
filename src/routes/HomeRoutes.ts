import express,{Request,Response} from "express";

const HomeRoutes=express.Router();

HomeRoutes.get("/", (req: Request, res: Response) => {
    if (req.session.user) {
        res.render('home',{not:false,log:true,name:req.session.user.name});
    }
    res.render('home',{not:true,log:false});
});



HomeRoutes.get('/dashboard', (req: Request, res: Response) => {
    if (req.session.user) {
        res.render('dashboard',{name: req.session.user.name});
    } else {
        res.redirect('/login');
    }
});

export default HomeRoutes;