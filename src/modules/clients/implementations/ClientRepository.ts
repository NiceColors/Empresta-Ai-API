import { prisma } from "../../../database";
import { AppError } from "../../../errors/AppError";
import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { IUpdateClientDTO } from "../dtos/IUpdateClientDTO";
import { IClientResponse, IClientsRepository } from "../repositories/IClientRepository";

class ClientsRepository implements IClientsRepository {

    private repository = prisma.client;

    async create(data: ICreateClientDTO): Promise<void> {

        await this.repository.create({
            data
        })

    }

    async update(client: IUpdateClientDTO): Promise<IClientResponse | void> {

        await this.repository.update({
            where: { id: client.id },
            data: { ...client }
        })

    }

    async delete(id: string): Promise<void> {

        const loans = await prisma.loan.findMany({
            where: { clientId: id }
        })

        if (loans.length > 0)
            throw new AppError('Não é possível excluir um cliente que possui empréstimos', 402);

        await this.repository.delete({
            where: { id }
        })

    }

    async list({ page = 0, limit = 8, query = '' }): Promise<any> {

        const usersLength = await this.repository.count();
        const users = await this.repository.findMany({
            skip: page * limit,
            take: limit,
            where: {
                name: {
                    contains: query
                }
            },
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                id: true,
                name: true,
                cpf: true,
                birthdate: true,
                createdAt: true,
                updatedAt: true,
            }
        });



        return {
            data: users,
            total: usersLength,
            page,
            nextPage: page + 1 < Math.ceil(usersLength / limit) ? page + 1 : null,
            limit
        };

    }

    async findById(id: string): Promise<IClientResponse> {

        const client = await this.repository.findUnique({
            where: { id },
        });

        if (!client)
            throw new AppError('Cliente não encontrado', 402);


        return client as unknown as IClientResponse;

    }
    async findByName(name: string): Promise<IClientResponse> {

        const client = await this.repository.findMany({
            where: { name },
        });

        if (!client)
            throw new AppError('Cliente não encontrado', 402);

        return client as unknown as IClientResponse;



    }
    async findByCpf(cpf: string): Promise<IClientResponse> {

        const client = await this.repository.findUnique({
            where: { cpf },
        });

        if (!client)
            throw new AppError('Cliente não encontrado', 402);

        return client as unknown as IClientResponse;

    }



}

export { ClientsRepository }