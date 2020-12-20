import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    readonly authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    async logIn( req: Request, res: Response ) {
        try {
            return res.json(req.user);
        } catch (error) {
            res.status(400).send({
                message: error.toString(),
                debug: error.stack
            });
        }
        
    }
}