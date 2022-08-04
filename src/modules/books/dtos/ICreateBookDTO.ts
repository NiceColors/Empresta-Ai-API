interface ICreateBookDTO {
    author: string;
    title: string;
    releaseYear: Date;
    rent: number;
    synopsis: string;
    pages: string;
    publisher: string;
    isbn: string;
    bannerUrl: string;
}

export { ICreateBookDTO };
