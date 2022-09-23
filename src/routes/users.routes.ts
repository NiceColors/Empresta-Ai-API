import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ActualUserController } from "../modules/accounts/useCases/actualUser/ActualUserController";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../modules/accounts/useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "../modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "../modules/accounts/useCases/updateUser/UpdateUserController";

const usersRoutes = Router();

const actualUserController = new ActualUserController();
const createUserController = new CreateUserController();
const listUserController = new ListUsersController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();



//Não usar o ensureAdmin pois ainda é preciso refatorar
usersRoutes.get("/", ensureAuthenticated, listUserController.handle);
usersRoutes.post("/", ensureAuthenticated, createUserController.handle);
usersRoutes.delete("/:id", ensureAuthenticated, deleteUserController.handle);
usersRoutes.put("/:id", updateUserController.handle);
usersRoutes.get("/me", ensureAuthenticated, actualUserController.handle);


export { usersRoutes };
