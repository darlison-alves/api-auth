import * as express from 'express';
import { json } from 'body-parser'
import { connect, disconnect } from 'mongoose';
import session from 'express-session';

import { RouterConfig } from './routes/router.config';
import { AuthRouter } from './routes/auth.router';
import { ErrorRouter } from './routes/error.router';
import { UserRouter } from './routes/user.router';

const app = express.default();
const routers: Array<RouterConfig> = [];
const port = 3000;

// app.use(passport.initialize());
// app.use(session());

app.use(json());
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge:  10000 } // 1min
}))


routers.push(
    new AuthRouter(app),
    new UserRouter(app),
    new ErrorRouter(app)
    );

app.listen(port, async () => {   
    try {
        await connect(process.env.URL_MONGO || '',
        { 
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        process.on('SIGINT', async () => {            
            await disconnect();
            console.log("disconnected mongo!!!");
            process.exit(0);
        });

    } catch (error) {
        console.log("connection mongo error: ", error);
        process.exit(0);
    }
    console.log(`Running server at http://localhost:${port}`);
    routers.forEach(route => {
        console.info(`Routes configured for ${route.getName()}`);
    });
});