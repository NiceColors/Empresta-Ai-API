interface ICreateBookDTO {
    id?: string;
    author: string;
    title: string;
    releaseYear: Date;
    rent: number;
    synopsis: string;
    pages: number;
    publisher: string;
    isbn: string;
    bannerUrl: string;
}

export { ICreateBookDTO };
