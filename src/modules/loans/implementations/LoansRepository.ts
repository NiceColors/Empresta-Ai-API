import { Loan } from "@prisma/client";
import { prisma } from "../../../database";
import { ICreateLoanDTO } from "../dtos/ICreateLoanDTO";
import { ILoansRepository } from "../repositories/ILoansRepository";

type LoanResponse = {
    employeeName: string;
    clientName: string;
    bookTitle: string;
    loanRateValue?: number;
    status: boolean;
    startDate: Date;
    endDate: Date;
}


class LoansRepository implements ILoansRepository {
    private repository = prisma.loan;

    async create({
        employeeId,
        clientId,
        bookId,
        status,
        startDate,
        endDate,
    }: ICreateLoanDTO): Promise<void> {
        await this.repository.create({
            data: {
                employeeId,
                clientId,
                bookId,
                status,
                startDate,
                endDate,
            },
        });
    }

    async findById(id: string): Promise<LoanResponse | undefined> {
        const loan = await this.repository.findUnique({
            where: { id },
        });

        const { title: bookTitle } = await prisma.book.findUnique({
            where: {
                id: loan.bookId
            }
        })

        const { name: clientName } = await prisma.client.findUnique({
            where: {
                id: loan.clientId
            }
        })

        const { name: employeeName } = await prisma.employee.findUnique({
            where: {
                id: loan.employeeId
            }
        })

        const loanResponse: LoanResponse = {
            ...loan,
            employeeName,
            clientName,
            bookTitle,
        }

        return loanResponse;
    }

    async update(loan: Loan): Promise<Loan> {
        const updatedLoan = await this.repository.update({
            where: { id: loan.id },
            data: loan,
        });

        return updatedLoan;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({
            where: { id },
        });
    }
}

export { LoansRepository, LoanResponse };