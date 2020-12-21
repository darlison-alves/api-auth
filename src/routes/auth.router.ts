import { Application, Router } from "express";
import passport from "passport";
import { AuthController } from "../controllers/auth.controller";
import { FacebookStrategy } from "../passport/facebook.strategy";
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
            console.log("user", user);
            done(null, user._id)
        })

        passport.deserializeUser(function( obj, done) {
            console.log("usuario autenticado: ", obj);
            done(null, obj);
        })

        passport.use(new LocalStrategy());
        passport.use(new FacebookStrategy());
        
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // const router = Router();
        this.app.route('/login').post(passport.authenticate('local', {
            passReqToCallback: true,
            failureRedirect:'/fail' }),
            (req, res) => this.authController.logIn(req, res));


        this.app.route('/login/facebook').get(passport.authenticate('facebook', {
            passReqToCallback: true,
            successRedirect: '/users',
            failureRedirect:'/fail'
         }),
            (req, res) => this.authController.logInFacebook(req, res));

        // router.post("/login", passport.authenticate('local', {
        //     passReqToCallback: true,
        //     failureRedirect:'/fail' }),
        //     (req, res) => this.authController.logIn(req, res)
        // );
        // this.app.route('/login').post();
        // this.app.use(router);
        return this.app;
    }   
}