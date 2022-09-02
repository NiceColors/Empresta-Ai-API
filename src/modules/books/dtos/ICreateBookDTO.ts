interface ICreateBookDTO {
    id?: string;
    author: string;
    title: string;
    status?: boolean;
    releaseYear: Date;
    loanRate?: number;
    synopsis?: string;
    pages?: number;
    publisher?: string;
    isbn: string;
    bannerUrl: string;
}

export { ICreateBookDTO };
