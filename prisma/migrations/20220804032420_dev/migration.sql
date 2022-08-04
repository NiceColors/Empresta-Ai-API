-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `rent` DOUBLE NOT NULL,
    `synopsis` VARCHAR(191) NOT NULL,
    `pages` VARCHAR(191) NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,
    `isbn` VARCHAR(191) NOT NULL,
    `bannerUrl` VARCHAR(191) NOT NULL,
    `releaseYear` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Book_id_key`(`id`),
    UNIQUE INDEX `Book_isbn_key`(`isbn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('MANAGER', 'INTERN') NOT NULL,
    `permissions` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Employee_id_key`(`id`),
    UNIQUE INDEX `Employee_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Client_id_key`(`id`),
    UNIQUE INDEX `Client_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Loan` (
    `id` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `bookId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL,
    `bookFineId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Loan_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookFine` (
    `id` VARCHAR(191) NOT NULL,
    `returnTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `value` DOUBLE NOT NULL,

    UNIQUE INDEX `BookFine_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
