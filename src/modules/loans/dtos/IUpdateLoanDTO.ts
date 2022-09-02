import { ICreateLoanDTO } from "./ICreateLoanDTO";

interface IUpdateLoanDTO extends Partial<ICreateLoanDTO> { }

export { IUpdateLoanDTO };