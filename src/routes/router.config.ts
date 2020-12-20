import { Application } from 'express';
export abstract class RouterConfig {
    app: Application;
    name: string;

    constructor(app: Application, name: string) {
        this.app = app;
        this.name = name;
    }

    getName() {
        return this.name;
    }

    abstract configureRouters(): Application;
}