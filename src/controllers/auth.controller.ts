import { Request, Response } from "express";

export class AuthController {
   
    async logIn( req: Request, res: Response ) {
        try {

            console.log("isAuthenticated", req.isAuthenticated());
            return res.json(req.user);
        } catch (error) {
            res.status(400).send({
                message: error.toString(),
                debug: error.stack
            });
        }        
    }


    async logInFacebook( req: Request, res: Response ) {
        try {
            console.log("req", req.query);
            console.log("isAuthenticated", req.isAuthenticated());
            return res.json(req.user);
        } catch (error) {
            res.status(400).send({
                message: error.toString(),
                debug: error.stack
            });
        }        
    }
}