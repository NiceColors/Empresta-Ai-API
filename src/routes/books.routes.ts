import { Router } from "express";

import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";

const booksRoutes = Router();

const createBookController = new CreateBookController();
// const listBookController = new ListBooksController();

booksRoutes.post("/", createBookController.handle);
// booksRoutes.get("/", listBookController.handle);

export { booksRoutes };
