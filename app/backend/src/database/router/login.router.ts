import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Validation from '../middleware/login.validations';

const router:Router = Router();

const userController = new UserController();
const validation = new Validation();

router.post('/', validation.requireLogin, userController.login);
router.get('/validate', userController.validate);

export default router;
