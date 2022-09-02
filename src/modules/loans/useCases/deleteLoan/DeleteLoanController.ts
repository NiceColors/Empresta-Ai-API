import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteLoanUseCase } from "./DeleteLoanUseCase";

class DeleteLoanController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;

        try {
            await container.resolve(DeleteLoanUseCase).execute({ id });

            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.',
            });
        }
    }
}

export { DeleteLoanController };