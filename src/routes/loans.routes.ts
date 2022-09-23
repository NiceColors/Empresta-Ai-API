import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateLoanController } from '../modules/loans/useCases/createLoan/CreateLoanController';
import { DeleteLoanController } from '../modules/loans/useCases/deleteLoan/DeleteLoanController';
import { ListLoansController } from '../modules/loans/useCases/listLoans/ListLoansController';
import { UpdateLoanController } from '../modules/loans/useCases/updateLoan/UpdateLoanController';


const loansRoutes = Router();


const loanCreateController = new CreateLoanController();
const loanDeleteController = new DeleteLoanController();
const loanUpdateController = new UpdateLoanController();
const loanListController = new ListLoansController();

//Não usar o ensureAdmin pois ainda é preciso refatorar
loansRoutes.get('/', ensureAuthenticated, loanListController.handle)
loansRoutes.post('/', ensureAuthenticated, loanCreateController.handle)
loansRoutes.delete('/:id', ensureAuthenticated, loanDeleteController.handle)
loansRoutes.put('/:id', ensureAuthenticated, loanUpdateController.handle)

export { loansRoutes };