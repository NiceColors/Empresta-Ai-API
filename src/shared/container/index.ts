import { container } from "tsyringe";

import { EmployeersRepository } from "../../modules/accounts/implementations/EmployeersRepository";
import { UsersTokenRepository } from "../../modules/accounts/implementations/UsersTokenRepository";
import { IEmployeeRepository } from "../../modules/accounts/repositories/IEmployeersRepository";
import { IUsersTokenRepository } from "../../modules/accounts/repositories/IUsersTokenRepository";
import { BooksRepository } from "../../modules/books/implementations/BooksRepository";
import { IBooksRepository } from "../../modules/books/repositories/IBooksRepository";

container.registerSingleton<IEmployeeRepository>(
    "EmployeersRepository",
    EmployeersRepository
);

container.registerSingleton<IBooksRepository>(
    "BooksRepository",
    BooksRepository
);

container.registerSingleton<IUsersTokenRepository>(
    "UsersTokenRepository",
    UsersTokenRepository
);
