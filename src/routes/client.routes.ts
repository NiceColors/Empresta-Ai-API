import { Router } from 'express'

import { CreateClientController } from "../modules/clients/useCases/createClient/CreateClientController";
import { DeleteClientController } from '../modules/clients/useCases/deleteClient/DeleteClientController';
import { ListClientsController } from '../modules/clients/useCases/listClients/ListClientsController';
import { UpdateClientController } from '../modules/clients/useCases/updateClient/UpdateClientController';


const clientsRoutes = Router();

const createClient = new CreateClientController();
const deleteClient = new DeleteClientController()
const updateClient = new UpdateClientController();
const listClients = new ListClientsController();

clientsRoutes.post('/', createClient.handle)
clientsRoutes.get('/', listClients.handle)
clientsRoutes.put('/', updateClient.handle)
clientsRoutes.delete('/', deleteClient.handle)

export { clientsRoutes };