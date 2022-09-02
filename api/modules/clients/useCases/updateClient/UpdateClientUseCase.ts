import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUpdateClientDTO } from "../../dtos/IUpdateClientDTO";
import { IClientsRepository } from "../../repositories/IClientRepository";

@injectable()
class UpdateClientUseCase {
    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository
    ) { }

    async execute({ id, cpf, ...data }: IUpdateClientDTO): Promise<void> {
        const client = await this.clientsRepository.findById(id ?? cpf);

        if (!client) {
            throw new AppError("Client not found");
        }


        await this.clientsRepository.update({ id, cpf, ...data });
    }


}

export { UpdateClientUseCase };