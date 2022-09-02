import { Loan } from "@prisma/client";
import { ICreateLoanDTO } from "../dtos/ICreateLoanDTO";
import { LoanResponse } from "../implementations/LoansRepository";

interface ILoansRepository {
    create(data: ICreateLoanDTO): Promise<void>;
    update({ ...loan }: Loan): Promise<Loan>;
    delete(id: string): Promise<void>;
    list(): Promise<LoanResponse[]>;
    findById(id: string): Promise<LoanResponse | undefined>;
    findByClientId(clientId: string): Promise<Loan[]>;
}

export { ILoansRepository };