import { Router } from 'express'
import { CreateLoanController } from '../modules/loans/useCases/createLoan/CreateLoanController';
import { DeleteLoanController } from '../modules/loans/useCases/deleteLoan/DeleteLoanController';
import { ListLoansController } from '../modules/loans/useCases/listLoans/ListLoansController';
import { UpdateLoanController } from '../modules/loans/useCases/updateLoan/UpdateLoanController';


const loansRoutes = Router();


const loanCreateController = new CreateLoanController();
const loanDeleteController = new DeleteLoanController();
const loanUpdateController = new UpdateLoanController();
const loanListController = new ListLoansController();

loansRoutes.get('/', loanListController.handle)
loansRoutes.post('/', loanCreateController.handle)
loansRoutes.delete('/', loanDeleteController.handle)
loansRoutes.put('/', loanUpdateController.handle)

export { loansRoutes };