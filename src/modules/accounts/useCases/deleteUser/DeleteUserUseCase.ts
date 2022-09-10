import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../repositories/IEmployeersRepository";

@injectable()
class DeleteUserUseCase {
    constructor(
        @inject("EmployeersRepository")
        private usersRepository: IEmployeeRepository
    ) { }

    async execute({ id, ids }: { id: string, ids?: string[] }): Promise<void | unknown> {

        if (ids)
            await this.usersRepository.deleteMany(ids)

        else await this.usersRepository.deleteOne(id)

        return {
            messsage: "Usuário deletado com sucesso"
        }


    }
}

export { DeleteUserUseCase };