import { Application, Router } from "express";
import passport from "passport";
import { AuthController } from "../controllers/auth.controller";
import { LocalStrategy } from "../passport/local.strategy";
import { RouterConfig } from "./router.config";

export class AuthRouter extends RouterConfig
{
    private authController: AuthController;

    constructor(app: Application) {
        super(app, 'authRouters');
        this.authController = new AuthController();
        this.configureRouters();
    }

    configureRouters(): Application {

        passport.serializeUser(function(user:any, done) {
            done(null, user.id)
        })

        passport.use(new LocalStrategy())

        // passport.use(new LocalStrategy(
        //     function(username: string, password: string, done: Function) {
        //         console.log("username", username);
        //         console.log("pass", password);
        //         return done(null, { id: 1, name: "Darlinson", itens:[] });
        //     }
        // ));
        
        this.app.use(passport.initialize());

        const router = Router();
        router.post("/login", passport.authenticate('local', {
            passReqToCallback: true,
            failureRedirect:'/fail' }),
            (req, res) => this.authController.logIn(req, res)
        );
        // this.app.route('/login').post();
        this.app.use(router);
        return this.app;
    }   
}