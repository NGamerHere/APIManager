import express,{Request,Response} from "express";

const LogoutRoute=express.Router();

LogoutRoute.get('/logout', (req: Request, res: Response) => {
    req.session.destroy();
    res.redirect('/');
})

export default LogoutRoute;