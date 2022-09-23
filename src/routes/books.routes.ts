import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateBookController } from "../modules/books/useCases/createBook/CreateBookController";
import { DeleteBookController } from "../modules/books/useCases/deleteBook/DeleteBookController";
import { ListBooksController } from "../modules/books/useCases/listBooks/ListBooksController";
import { UpdateBookController } from "../modules/books/useCases/updateBook/UpdateBookController";

const booksRoutes = Router();

const createBookController = new CreateBookController();
const listBookController = new ListBooksController();
const updateBookController = new UpdateBookController();
const deleteBookController = new DeleteBookController();

booksRoutes.use(ensureAuthenticated);
booksRoutes.post("/", createBookController.handle);
booksRoutes.put("/:id", updateBookController.handle);
booksRoutes.get("/", listBookController.handle);
booksRoutes.delete("/:id", deleteBookController.handle);

export { booksRoutes };
