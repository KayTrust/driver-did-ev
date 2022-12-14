import * as bodyParser from "body-parser";
import express from "express";
import dotenv from 'dotenv';
import logger from "./logger";

import Routes from "./routes";

dotenv.config();
const port = process.env.PORT;

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get("/", (req, res, next) => {
            res.send("Welcome to driver-did-ev");
        });

        this.express.use("/1.0", Routes);

        this.express.listen(port, () => {
          logger.info(`Server is running at https://localhost:${port}`);
        });
    }
}

export default new App().express;