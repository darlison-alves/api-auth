import * as express from 'express';
import { json } from 'body-parser'
import { RouterConfig } from './routes/router.config';
import { AuthRouter } from './routes/auth.router';
import { ErrorRouter } from './routes/error.router';

const app = express.default();
const routers: Array<RouterConfig> = [];
const port = 3000;

// app.use(passport.initialize());
// app.use(session());

app.use(json());

routers.push(new AuthRouter(app), new ErrorRouter(app));

app.listen(port, () => {
    console.log(`Running server at http://localhost:${port}`);
    routers.forEach(route => {
        console.info(`Routes configured for ${route.getName()}`);
    });
});