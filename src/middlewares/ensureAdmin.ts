import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";
import { EmployeersRepository } from "../modules/accounts/implementations/EmployeersRepository";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const usersRepository = new EmployeersRepository();
    const user = await usersRepository.findById(id);

    if (!(user.role === "MANAGER"))
        throw new AppError("User is not an admin", 401);

    return next();
}
