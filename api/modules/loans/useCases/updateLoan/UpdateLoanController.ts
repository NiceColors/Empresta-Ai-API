import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLoanUseCase } from "./updateLoanUseCase";

class UpdateLoanController {


    async handle(request: Request, response: Response): Promise<Response> {
        const { id, status, bookId, clientId, employeeId } = request.body;

        try {
            const loan = await container.resolve(UpdateLoanUseCase).execute({ id, status, bookId, clientId, employeeId });

            return response.status(200).json({
                message: 'Loan updated successfully.',
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