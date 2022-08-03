import { Router } from "express";

import { booksRoutes } from "./books.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/books", booksRoutes);

export { router };
