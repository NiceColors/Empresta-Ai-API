import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { booksRoutes } from "./books.routes";
import { clientsRoutes } from "./client.routes";
import { loansRoutes } from "./loans.routes";
import { usersRoutes } from "./users.routes";

const router = Router();
router.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
})

//Não usar o ensureAdmin pois ainda é preciso refatorar
router.use("/users", usersRoutes);
router.use("/books", booksRoutes);
router.use("/clients", clientsRoutes)
router.use("/loans", loansRoutes)
router.use(authenticateRoutes);

export { router };
