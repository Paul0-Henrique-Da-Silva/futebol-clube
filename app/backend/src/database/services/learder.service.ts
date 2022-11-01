import sequelize from '../models';
import ILeaderboard from '../interfaces/IMatch';
import homeLeaderboard from './query/home_query';

export default class LeaderboardService {
  private sequelize = sequelize;

  async getLeaderboard(): Promise<ILeaderboard[]> {
    const [result] = await this.sequelize.query(homeLeaderboard);
    return result as ILeaderboard[];
  }
}
