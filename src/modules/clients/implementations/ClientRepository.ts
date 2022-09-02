import { prisma } from "../../../database";
import { AppError } from "../../../errors/AppError";
import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { IUpdateClientDTO } from "../dtos/IUpdateClientDTO";
import { IClientResponse, IClientsRepository } from "../repositories/IClientRepository";

class ClientRepository implements IClientsRepository {

    private repository = prisma.client;

    async create(data: ICreateClientDTO): Promise<void> {

        try {
            await this.repository.create({
                data
            })
        } catch (error) {
            throw new AppError(error.message, 400)
        }

    }


    async update(client: IUpdateClientDTO): Promise<IClientResponse | void> {

        await this.repository.update({
            where: { id: client.id },
            data: { ...client }
        })
    }
    async delete(id: string): Promise<void> {

        await this.repository.delete({
            where: { id }
        })
    }

    async list(): Promise<IClientResponse[]> {

        const clients = await this.repository.findMany()

        return clients as unknown as IClientResponse[];
    }

    async findById(id: string): Promise<IClientResponse> {
        const client = await this.repository.findUnique({
            where: { id },
        });

        return client as unknown as IClientResponse;

    }
    async findByName(name: string): Promise<IClientResponse> {
        const client = await this.repository.findMany({
            where: { name },
        });

        return client as unknown as IClientResponse;


    }
    async findByCpf(cpf: string): Promise<IClientResponse> {
        const client = await this.repository.findUnique({
            where: { cpf },
        });

        return client as unknown as IClientResponse;
    }



}

export { ClientRepository }