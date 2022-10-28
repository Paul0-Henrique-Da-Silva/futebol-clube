import TeamModel from '../models/TeamsModel';
import { ITeam } from '../interfaces/ITeam';

export default class TeamService {
  private modelTeam = TeamModel;

  public async getAll(): Promise<ITeam[]> {
    const data = await this.modelTeam.findAll();
    return data;
  }

  public async getById(id: string): Promise<ITeam> {
    const data = await this.modelTeam.findOne({ where: { id } });
    return data as ITeam;
  }
}
