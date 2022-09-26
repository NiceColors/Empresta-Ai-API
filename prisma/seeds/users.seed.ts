import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const userData: Prisma.EmployeeCreateInput[] = [
        {
            email: "admin@admin.com",
            password: await hash("admin2", 8),
            name: "Administrador",
            cpf: "9999999999",
            birthdate: new Date(),
            role: "MANAGER",
            permissions: "USER",
        },
        {
            email: "Intern Test",
            password: await hash("intern", 8),
            name: "Estagiário",
            cpf: "123456789021",
            birthdate: new Date(),
            role: "INTERN",
            permissions: "USER",
        },
    ];

    console.log(`Start seeding ...`);

    userData.forEach(async (data) => {
        const user = await prisma.employee.create({
            data,
        });
        console.log(`Created user with id: ${user.id}`);
    });

    console.log(`Seeding finished.`);
}

export default async function seed() {
    try {
        await main();
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seed()
