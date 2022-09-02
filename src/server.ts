import "reflect-metadata";
import cors from "cors"; // Importar o cors
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { router } from "./api";
import swaggerFile from "./swagger.json";

import "./database";
import "./shared/container";

const port = 3333; // Porta que o servidor vai rodar
const app = express(); // Instanciando o express

app.use(express.json()); // Para o express entender o formato json

app.use(cors()); // Deixando as rotas acessíveis para qualquer endereço

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Rota para acessar a documentação

app.use(router); // Usando as rotas

app.use( // Middleware de tratamento de erros
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        return response.status(500).json({
            status: "error",
            message: `Internal server error ${err.message}`,
        });
    }
);

app.listen(port, () => {
    console.log(`Server is running`);
});
