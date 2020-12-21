import { Application } from "express";
import passport from "passport";
import { AuthenticatedMiddleware } from "../controllers/middlewares/authenticated.middleware";
import { UserController } from "../controllers/user.controller";
import { RouterConfig } from "./router.config";

export class UserRouter extends RouterConfig {
    private controller: UserController;
    constructor(app: Application) {
        super(app, 'UserRouter');
        this.controller = new UserController();
        this.configureRouters();
    }

    configureRouters(): Application {
        this.app.route('/users/:id').get(AuthenticatedMiddleware,(req, res) => this.controller.getById(req, res));
        this.app.route('/facebook/callback').get(passport.authenticate("facebook"), (req, res) => {
            const user: any = req.user;
            res.redirect(`/users/${user._id}`);
        });
        return this.app;
    }
}