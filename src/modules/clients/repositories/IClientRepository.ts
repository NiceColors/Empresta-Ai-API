import { Client } from "@prisma/client";
import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { IUpdateClientDTO } from "../dtos/IUpdateClientDTO";

interface IClientResponse {
    name: string;
    cpf: string;
    birthDate: Date;
}


interface IClientsRepository {
    create(data: ICreateClientDTO): Promise<void>;
    update(client: IUpdateClientDTO): Promise<IClientResponse | void>;
    delete(id: string): Promise<void>;
    list({ page, limit, query }): Promise<IClientResponse[]>
    findById(id: string): Promise<IClientResponse>;
    findByName(name: string): Promise<IClientResponse>;
    findByCpf(cpf: string): Promise<IClientResponse>;

}

export { IClientsRepository, IClientResponse };