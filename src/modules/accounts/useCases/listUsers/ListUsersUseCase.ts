import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {} // Msm coisa que definir o atributo privado antes e dps instaciar e atribuir um valor (this...0)

    async execute(): Promise<User[]> {
        const categories = await this.usersRepository.list();

        return categories;
    }
}

export { ListUsersUseCase };
