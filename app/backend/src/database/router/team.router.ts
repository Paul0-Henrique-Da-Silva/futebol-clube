import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();
const controllerTeam = new TeamController();

router.get('/', controllerTeam.getAll);
router.get('/:id', controllerTeam.getById);

export default router;
