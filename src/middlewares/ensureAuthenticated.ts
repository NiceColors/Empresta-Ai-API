import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../config/auth";
import { AppError } from "../errors/AppError";
import { UsersTokenRepository } from "../modules/accounts/implementations/UsersTokenRepository";

type TPayload = { sub: string };

async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    const usersTokensRepository = new UsersTokenRepository();
    const { secretToken } = auth;


    if (!authHeader) {
        throw new AppError("Token missing");
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: userId } = verify(token, secretToken) as TPayload;
        const user = await usersTokensRepository.findByUserIdAndRefreshToken(
            userId
        );

        if (!user) {
            throw new AppError("User does not exist!");
        }

        request.user= {
            id: userId,
        } as any;

        return next();
        
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }
}

export { ensureAuthenticated };
