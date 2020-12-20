import { Application, NextFunction, Request, Response } from "express";
import { BaseError } from "../errorCustom/base.error";
import { RouterConfig } from "./router.config";

export class ErrorRouter extends RouterConfig {
    constructor(app: Application) {
        super(app, 'ErrorRouter');
        this.configureRouters();
    }

    configureRouters() {
        this.app.use(this.responseError);
        return this.app;
    }

    private responseError(err: BaseError ,req: Request, res: Response, next: NextFunction) {
        const code = err.code ? err.code : 400;
        if(err)
            res.status(code).send({
                code,
                message: err.message,
                debug: err.stack
            });
        next();
    }
}