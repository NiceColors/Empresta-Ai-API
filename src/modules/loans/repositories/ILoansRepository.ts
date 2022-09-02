import { Loan } from "@prisma/client";
import { ICreateLoanDTO } from "../dtos/ICreateLoanDTO";
import { LoanResponse } from "../implementations/LoansRepository";

interface ILoansRepository {
    create(data: ICreateLoanDTO): Promise<void>;
    findById(id: string): Promise<LoanResponse | undefined>;
    update(loan: Loan): Promise<Loan>;
    delete(id: string): Promise<void>;
}

export { ILoansRepository };