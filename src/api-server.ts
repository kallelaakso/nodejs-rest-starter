import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as morgan from 'morgan';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import * as path from 'path';
import { createConnection } from "typeorm";
import { PassportAuthenticator, Server } from 'typescript-rest';

const enforce = require('express-sslify');
const config = require('../config/config');

require('dotenv').config();

export class ApiServer {
    public PORT: number = +process.env.PORT || 3000;

    private readonly app: express.Application;
    private server: http.Server = null;

    constructor() {
        this.app = express();
        this.config();

        Server.useIoC();

        Server.loadServices(this.app, 'controller/*', __dirname);
        Server.swagger(this.app, { filePath: './dist/swagger.json' });
    }

    /**
     * Start the server
     */
    public async start() {

        return new Promise<any>((resolve, reject) => {
            createConnection().then(() => {
                this.server = this.app.listen(this.PORT, () => {
                    // tslint:disable-next-line:no-console
                    console.log(`Listening to http://127.0.0.1:${this.PORT}`);
                    return resolve();
                });
            });
        });
    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public async stop(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        const allowedOrigins = config.get('cors.allowedOrigins');

        interface CorsOptions {
            origin: boolean;
        }

        const corsOptionsDelegate = function (req: express.Request, callback: (arg0: null, arg1: CorsOptions) => void) {
            let corsOptions;
            if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
                corsOptions = { origin: true };
            } else {
                corsOptions = { origin: false };
            }
            callback(null, corsOptions);
        };

        this.app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
        this.app.use(cors(corsOptionsDelegate));
        this.app.use(morgan('combined'));

        if (config.get('forceSSL') === true) {
            this.app.use(enforce.HTTPS({ trustProtoHeader: true }));
        }

        this.configureAuthenticator();
    }

    private configureAuthenticator() {
        const JWT_SECRET: string = 'some-jwt-secret';
        const jwtConfig: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(JWT_SECRET)
        };
        const strategy = new Strategy(jwtConfig, (payload: any, done: (err: any, user: any) => void) => {
            done(null, payload);
        });
        const authenticator = new PassportAuthenticator(strategy, {
            deserializeUser: (user: string) => JSON.parse(user),
            serializeUser: (user: any) => {
                return JSON.stringify(user);
            }
        });
        Server.registerAuthenticator(authenticator);
        Server.registerAuthenticator(authenticator, 'secondAuthenticator');
    }
}