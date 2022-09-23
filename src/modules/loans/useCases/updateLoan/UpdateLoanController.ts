import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLoanUseCase } from "./UpdateLoanUseCase";

class UpdateLoanController {


    async handle(request: Request, response: Response): Promise<Response> {
        const { loanId: id, status, bookId, clientId, employeeId } = request.body || request.params
        const url = request.url.replace('/', '')

        try {
            const loan = await container.resolve(UpdateLoanUseCase).execute({ id: id ?? url, status, bookId, clientId, employeeId });

            if (!loan) throw new Error('Loan not found.');

            return response.status(200).json({
                message: 'Empréstimo atualizado com sucesso.',
                data: loan
            });
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }


}

export { UpdateLoanController };