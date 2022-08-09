import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";
import { ListBooksController } from "../modules/books/useCases/listBooks/ListBooksController";
import { UpdateBookController } from "../modules/books/useCases/updateBook/UpdateBookController";

const booksRoutes = Router();

const createBookController = new CreateBookController();
const listBookController = new ListBooksController();
const updateBookController = new UpdateBookController();

booksRoutes.use(ensureAuthenticated);
booksRoutes.post("/", createBookController.handle);
booksRoutes.put("/", updateBookController.handle);
booksRoutes.get("/", listBookController.handle);

export { booksRoutes };
