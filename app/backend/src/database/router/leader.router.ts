import { Router } from 'express';
import LeaderboardController from '../controllers/leader.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req, res) => leaderboardController.getLeaderboard(req, res));

export default router;
