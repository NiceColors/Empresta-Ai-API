import { Router } from "express";

import { CreateEmployeeController } from "../modules/employeers/useCases/createEmployee/CreateEmployeeController";
import { ListEmployeersController } from "../modules/employeers/useCases/listEmployeers/ListEmployeersController";

const employeersRoute = Router();

const createEmployeersController = new CreateEmployeeController();
const listEmployeersController = new ListEmployeersController();

employeersRoute.post("/", createEmployeersController.handle);
employeersRoute.get("/", listEmployeersController.handle);

export { employeersRoute };
