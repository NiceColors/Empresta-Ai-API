type TList = {
    page: number;
    limit: number;
    query: string;
}


type ListResponse = {
    page: number;
    limit: number;
    total: number;
    data: any[]
    nextPage: number;
}