interface ICreateUserTokenDTO {
    employeeId: string;
    expires: Date;
    refreshToken: string;
}

export { ICreateUserTokenDTO };
