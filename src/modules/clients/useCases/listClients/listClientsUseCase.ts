import { inject, injectable } from "tsyringe";
import { IClientResponse, IClientsRepository } from "../../repositories/IClientRepository";


@injectable()
class ListClientsUseCase {

    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository
    ) { }


    async execute(): Promise<IClientResponse[]> {
        const clients = await this.clientsRepository.list();

        return clients;
    }


}

export { ListClientsUseCase };