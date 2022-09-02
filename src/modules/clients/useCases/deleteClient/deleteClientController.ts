import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteClienteUseCase } from "./deleteClientUseCase";


class DeleteClientController {


    async handle(request: Request, response: Response): Promise<Response | void> {
        const { id } = request.body as { id: string };

        const deleteClientUseCase = container.resolve(DeleteClienteUseCase);

        await deleteClientUseCase.execute(id);

        return response.status(200).send();
    }

}

export { DeleteClientController };