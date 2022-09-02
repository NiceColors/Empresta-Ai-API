import { ICreateClientDTO } from "./ICreateClientDTO";

interface IUpdateClientDTO extends Partial<ICreateClientDTO> { }

export { IUpdateClientDTO };