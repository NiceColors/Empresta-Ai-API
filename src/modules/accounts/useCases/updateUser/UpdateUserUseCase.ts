import { inject, injectable } from "tsyringe";
import { IEmployeeRepository } from "../../repositories/IEmployeersRepository";

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("EmployeersRepository")
        private usersRepository: IEmployeeRepository
    ) { }

    async execute({ id, data}): Promise<void> {

        await this.usersRepository.update(id, data)

    }
}

export { UpdateUserUseCase };