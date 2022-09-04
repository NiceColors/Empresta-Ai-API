import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

const refreshTokenController = new RefreshTokenController();

//Não usar o ensureAdmin pois ainda é preciso refatorar
authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
