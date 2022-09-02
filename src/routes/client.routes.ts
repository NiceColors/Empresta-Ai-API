import { Router } from 'express'

import { CreateClientController } from "../modules/clients/useCases/createClient/createClientController";
import { DeleteClientController } from '../modules/clients/useCases/deleteClient/deleteClientController';
import { ListClientsController } from '../modules/clients/useCases/listClients/listClientsController';
import { UpdateClientController } from '../modules/clients/useCases/updateClient/updateClientController';


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