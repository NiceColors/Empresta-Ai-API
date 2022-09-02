import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { booksRoutes } from "./books.routes";
import { clientsRoutes } from "./client.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/books", booksRoutes);
router.use("/clients", clientsRoutes)
router.use(authenticateRoutes);

export { router };
