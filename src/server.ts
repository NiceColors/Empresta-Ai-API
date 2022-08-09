import "reflect-metadata";
import cors from "cors"; // Importar o cors
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";
import "./shared/container";

const port = 3333;
const app = express();

app.use(express.json());

app.use(cors()); // Usar o cors antes das rotas

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        // console.log(err);

        return response.status(500).json({
            status: "error",
            message: `Internal server error ${err.message}`,
        });
    }
);

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
});
