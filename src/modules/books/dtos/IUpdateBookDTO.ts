import { ICreateBookDTO } from "./ICreateBookDTO";

type UpdateBook = {[P in keyof ICreateBookDTO]?: ICreateBookDTO[P]};

export { UpdateBook };