import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError"
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO"
import { IClientsRepository } from "../../repositories/IClientRepository"


@injectable()
class CreateClientUseCase {

    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository,
    ) { }

    async execute(data: ICreateClientDTO) {
//         const clientAlreadyExists = await this.clientsRepository.findById(data.id)
// 
//         if (clientAlreadyExists) {
//             throw new AppError('Client already exists!')
//         }

        const client = await this.clientsRepository.create(data)

        return client
    }


}

export { CreateClientUseCase }