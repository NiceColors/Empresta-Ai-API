import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { BooksRepository } from "../../modules/books/implementations/BooksRepository";
import { IBooksRepository } from "../../modules/books/repositories/IBooksRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IBooksRepository>(
    "BooksRepository",
    BooksRepository
);
