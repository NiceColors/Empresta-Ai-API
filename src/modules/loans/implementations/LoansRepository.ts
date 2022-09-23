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


    async update({ ...loan }): Promise<Loan> {

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

    async list({ page = 0, limit = 10, query = '' }): Promise<any> {
        const loans = await this.repository.findMany();

        const loansLength = await this.repository.count();

        if (loansLength === 0) {
            return {
                data: [],
                total: loansLength,
                page,
                nextPage: null,
                limit
            };
        }

        const loansResponse = await Promise.all(loans.map(async loan => {
            const book = await prisma.book.findUnique({
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
                bookTitle: book?.title,
            }


            return loanResponse


        }))

        return {
            data: loansResponse,
            total: loansLength,
            page,
            nextPage: page + 1 < Math.ceil(loansLength / limit) ? page + 1 : null,
            limit
        };
    }

    async findById(data): Promise<LoanResponse | any> {


        console.log(data)

        const loan = await this.repository.findUnique({
            where: { id: data?.id },
        });

        if (!loan)
            throw new AppError("Empréstimos não encontrado", 422);

        return loan;


        //         if (!loan) {
        //             throw new AppError('Loan not found.', 422);
        //         }
        // 
        //         const { title: bookTitle } = await prisma.book.findUnique({
        //             where: {
        //                 id: loan?.bookId
        //             }
        //         })
        // 
        //         const { name: clientName } = await prisma.client.findUnique({
        //             where: {
        //                 id: loan?.clientId
        //             }
        //         })
        // 
        //         const { name: employeeName } = await prisma.employee.findUnique({
        //             where: {
        //                 id: loan?.employeeId
        //             }
        //         })
        // 
        //         const loanResponse: LoanResponse = {
        //             ...loan,
        //             employeeName,
        //             clientName,
        //             bookTitle,
        //         }


    }

    async findByClientId(clientId: string): Promise<Loan[]> {
        const loans = await this.repository.findMany({
            where: { clientId, status: true },
        });

        return loans;
    }

}

export { LoansRepository, LoanResponse };