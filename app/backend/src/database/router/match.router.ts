import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import Validation from '../middleware/other.validator';

const router:Router = Router();

const matchController = new MatchController();
const validation = new Validation();

router.get('/', matchController.getProgressFilter);
router.patch('/:id/finish', matchController.finish);
router.post('/', validation.requiretoken, matchController.addNew);

export default router;
