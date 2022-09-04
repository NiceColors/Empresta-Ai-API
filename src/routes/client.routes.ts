import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateClientController } from "../modules/clients/useCases/createClient/CreateClientController";
import { DeleteClientController } from '../modules/clients/useCases/deleteClient/DeleteClientController';
import { ListClientsController } from '../modules/clients/useCases/listClients/ListClientsController';
import { UpdateClientController } from '../modules/clients/useCases/updateClient/UpdateClientController';


const clientsRoutes = Router();

const createClient = new CreateClientController();
const deleteClient = new DeleteClientController()
const updateClient = new UpdateClientController();
const listClients = new ListClientsController();

clientsRoutes.post('/', ensureAuthenticated, createClient.handle)
clientsRoutes.get('/', ensureAuthenticated, listClients.handle)
clientsRoutes.put('/', ensureAuthenticated, updateClient.handle)
clientsRoutes.delete('/', ensureAuthenticated, deleteClient.handle)

export { clientsRoutes };