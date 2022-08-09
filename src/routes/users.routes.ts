import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ActualUserController } from "../modules/accounts/useCases/actualUser/ActualUserController";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "../modules/accounts/useCases/listUsers/ListUsersController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const actualUserController = new ActualUserController();


//ensureAdmin middleware not used for now 'cause it need refactoring
usersRoutes.post("/", ensureAuthenticated, createUserController.handle);
usersRoutes.get("/", ensureAuthenticated, listUserController.handle);
usersRoutes.get("/me", ensureAuthenticated, actualUserController.handle);


export { usersRoutes };
