import { Request, Response } from 'express';
import LeaderboardService from '../services/learder.service';

export default class LeaderboardController {
  constructor(
    private service = new LeaderboardService(),
  ) { }

  async getLeaderboard(_request: Request, response: Response): Promise<void> {
    const result = await this.service.getLeaderboard();
    response.status(200).json(result);
  }
}
