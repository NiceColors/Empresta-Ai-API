import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateBookUseCase } from "./UpdateBookUseCase";

class UpdateBookController{
    async handle(request:Request, response:Response): Promise<Response>{
        const {isbn,
        ...fields} = request.body;
        console.log(fields);

        const updateBookUseCase = container.resolve(UpdateBookUseCase);

        await updateBookUseCase.execute(isbn, fields);

        return response.status(201).send();
    }
}

export { UpdateBookController };