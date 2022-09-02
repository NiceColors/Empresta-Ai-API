import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLoanUseCase } from "./CreateLoanUseCase";

class CreateLoanController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { ...data } = request.body;

        try {
            await container.resolve(CreateLoanUseCase).execute(data);

            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.',
            });
        }
    }
}

export { CreateLoanController }