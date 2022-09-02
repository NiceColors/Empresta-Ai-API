import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";
import { IEmployeeRepository } from "../../repositories/IEmployeersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("EmployeersRepository")
        private usersRepository: IEmployeeRepository
    ) {}

    async execute({
        password,
        email,
        birthdate,
        cpf,
        name,
        permissions,
        role,
    }: ICreateEmployeeDTO): Promise<void> {
        const passwordHash = await hash(password, 8);

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists)
            throw new AppError(`User ${email} already exists`);

        await this.usersRepository.create({
            password: passwordHash,
            email,
            birthdate,
            cpf,
            name,
            permissions,
            role,
        });
    }
}

export { CreateUserUseCase };
