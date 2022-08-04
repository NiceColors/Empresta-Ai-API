import { Router } from "express";

import { booksRoutes } from "./books.routes";
import { employeersRoute } from "./employeers.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/books", booksRoutes);
router.use("/employeers", employeersRoute);

export { router };
