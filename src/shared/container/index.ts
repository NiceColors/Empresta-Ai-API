import { container } from "tsyringe";

import { EmployeersRepository } from "../../modules/accounts/implementations/EmployeersRepository";
import { UsersTokenRepository } from "../../modules/accounts/implementations/UsersTokenRepository";
import { IEmployeeRepository } from "../../modules/accounts/repositories/IEmployeersRepository";
import { IUsersTokenRepository } from "../../modules/accounts/repositories/IUsersTokenRepository";
import { BooksRepository } from "../../modules/books/implementations/BooksRepository";
import { IBooksRepository } from "../../modules/books/repositories/IBooksRepository";
import { ClientsRepository } from "../../modules/clients/implementations/clientRepository";
import { IClientsRepository } from "../../modules/clients/repositories/IClientRepository";
import { LoansRepository } from "../../modules/loans/implementations/LoansRepository";
import { ILoansRepository } from "../../modules/loans/repositories/ILoansRepository";

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

container.registerSingleton<IClientsRepository>(
    "ClientsRepository",
    ClientsRepository
)

container.registerSingleton<ILoansRepository>(
    "LoansRepository",
    LoansRepository
)