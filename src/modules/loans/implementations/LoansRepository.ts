import { Loan } from "@prisma/client";
import { prisma } from "../../../database";
import { AppError } from "../../../errors/AppError";
import { ICreateLoanDTO } from "../dtos/ICreateLoanDTO";
import { ILoansRepository } from "../repositories/ILoansRepository";

type LoanResponse = {
    employeeName: string;
    clientName: string;
    bookTitle: string;
    bookId: string;
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

    async list(): Promise<LoanResponse[]> {
        const loans = await this.repository.findMany();

        const loansResponse = await Promise.all(loans.map(async loan => {
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
        }))

        return loansResponse;
    }

    async findById(id: string): Promise<LoanResponse | undefined> {
        const loan = await this.repository.findUnique({
            where: { id },
        });

        if (!loan) {
            throw new AppError('Loan not found.', 422);
        }

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

    async findByClientId(clientId: string): Promise<Loan[]> {
        const loans = await this.repository.findMany({
            where: { clientId, status: true },
        });

        return loans;
    }

}

export { LoansRepository, LoanResponse };