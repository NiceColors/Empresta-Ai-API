import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IClientsRepository } from "../../repositories/IClientRepository";


@injectable()
class DeleteClienteUseCase {
    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository
    ) { }


    async execute(id: string): Promise<void> {
        //         const client = await this.clientsRepository.findById(id);
        // 
        //         if (!client) {
        //             throw new AppError("Client does not exists!");
        //         }

        await this.clientsRepository.delete(id);
    }
}

export { DeleteClienteUseCase }