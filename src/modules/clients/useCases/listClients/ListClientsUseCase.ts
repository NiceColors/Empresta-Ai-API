import { inject, injectable } from "tsyringe";
import { IClientResponse, IClientsRepository } from "../../repositories/IClientRepository";


@injectable()
class ListClientsUseCase {

    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository
    ) { }


    async execute({ page, limit, query }): Promise<IClientResponse[]> {
        const clients = await this.clientsRepository.list({ page, limit, query });

        return clients;
    }


}

export { ListClientsUseCase };