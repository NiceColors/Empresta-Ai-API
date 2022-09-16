import { inject, injectable } from "tsyringe";
import { LoanResponse } from "../../implementations/LoansRepository";
import { ILoansRepository } from "../../repositories/ILoansRepository";


@injectable()
class ListLoansUseCase {
    constructor(
        @inject("LoansRepository")
        private loansRepository: ILoansRepository
    ) { }


    async execute({ page, limit, query }): Promise<LoanResponse[]> {
        const loans = await this.loansRepository.list({ page, limit, query });

        return loans;
    }


}
export { ListLoansUseCase }