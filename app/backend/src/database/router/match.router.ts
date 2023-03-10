import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import Validation from '../middleware/token.validator';
import Condition from '../middleware/match.condition';

const router:Router = Router();

const matchController = new MatchController();
const validation = new Validation();
const condition = new Condition();

router.get('/', matchController.getProgressFilter);
router.patch('/:id', matchController.update);
router.patch('/:id/finish', matchController.finish);
router.post(
  '/',
  condition.noEquals,
  condition.teamsExist,
  validation.requiretoken,
  matchController.addNew,
);

export default router;
