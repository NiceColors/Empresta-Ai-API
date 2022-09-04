import seedBooks from './books.seed'
import seedUsers from './users.seed'


async function main() {
    console.log(`Star general seeding ...`);

    await seedBooks()
    await seedUsers()

    console.log(`Seeding finished.`);
}

main()

