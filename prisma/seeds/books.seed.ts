import { PrismaClient, Prisma, Book } from "@prisma/client";
import axios from 'axios'
import scraper from './scraping/scraper'

const prisma = new PrismaClient();

type TSeedBooks = {
    list: string[] | [],
    query: keyof Book,
}

const getData = async (url: string) => {
    try {
        const { data } = await axios.get(url)
        return data
    } catch (error) {
        console.log('Error: API request')
    }
}

const getGoogleBookData = async (query) => {
    try {
        const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        const book = await data.items[1].volumeInfo
        const bookData: Prisma.BookCreateInput = {
            title: book.title,
            isbn: book.industryIdentifiers[1].identifier, //ISBN 10
            author: book.authors.join(', '),
            publisher: book.publisher ?? '',
            bannerUrl: book.imageLinks.thumbnail ?? '',
            pages: book.pageCount ?? 10,
            loanRate: 10,
            releaseYear: new Date(book.publishedDate),
            status: true,
            synopsis: book.description,
        }

        return bookData
    } catch (error) {
        console.log('Error: Google API request')
    }
}

const createBook = async (bookData: Prisma.BookCreateInput) => {

    //verifica se o livro já existe no banco de dados e caso exista não cria
    let bookIsCreated = await searchBook({ ["isbn"]: bookData?.isbn })

    if (!!bookData && !bookIsCreated) {
        try {
            const createdBook = await prisma.book.create({
                data: bookData,
            });
            console.log(`Created book with id: ${createdBook.id}`);

        } catch (error) {
            console.log('Error: Creating Book')
            return false
        }
    }
}

const searchBook = async (query: Partial<Book>) => {
    const book = await prisma.book.findMany({
        where: query
    })

    return !!(book.length > 0)
}

const seedBooks = async ({ list, query }: TSeedBooks) => {
    // percorre as querys, cria um objeto com os dados do livro e armazena no banco de dados
    list.forEach(async (item) => {
        //verifica se o livro já existe no banco de dados e caso exista não cria
        let bookIsCreated = await searchBook({ [query]: item })
        if (bookIsCreated) return console.log('Book already exists')
        // cria o livro no banco de dados
        const bookData = await getGoogleBookData(item)
        await createBook(bookData)
    })
}

const setBooksUnique = async () => {
    const books = await prisma.book.findMany()
    const uniqueISBNs = [... new Set(books.map(book => book.isbn))]
    const listOfBooks = uniqueISBNs.map(item => books.find(book => book.isbn === item))

    await prisma.book.deleteMany({})
    console.log('All books deleted')
    listOfBooks.forEach(async (book) => {
        await createBook(book)
    })
}

async function main() {

    const query = 'harcover-fiction'
    const nyTimesBaseUrl = 'https://api.nytimes.com/svc/books/v3'
    const nyTimesBooksApiUrl = `${nyTimesBaseUrl}/lists.json?list-name=${query}&api-key=${process.env.NYTIMES_API_KEY}`
    const nyTimesBooksData = await getData(nyTimesBooksApiUrl)

    const isbns = nyTimesBooksData.results.map((book) => book.isbns[0].isbn10) // Pega os isbn's
    seedBooks({ list: isbns, query: "isbn" })
    const amzBaseUrl = "https://www.amazon.com.br/gp/bestsellers/books/7842714011/ref=pd_zg_hrsr_books"
    const amzBooksData = await scraper(amzBaseUrl) // Pega os titulos dos livros da Amazon
    seedBooks({ list: amzBooksData, query: "title" })
    console.log(amzBooksData.length);

    // Retira resultados repetidos do banco de dados
    // await setBooksUnique()

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

seed();
