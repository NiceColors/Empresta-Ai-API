interface ICreateLoanDTO {
    employeeId: string;
    clientId: string;
    status: boolean;
    startDate: Date;
    endDate: Date;
    bookId: string;
}

export { ICreateLoanDTO };