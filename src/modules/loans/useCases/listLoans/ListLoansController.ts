import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListLoansUseCase } from "./ListLoansUseCase";

class ListLoansController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const all = await container.resolve(ListLoansUseCase).execute();

            return response.status(200).json(all);
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.',
            });
        }
    }


}

export { ListLoansController }