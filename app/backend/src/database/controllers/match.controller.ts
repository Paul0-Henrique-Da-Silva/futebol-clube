import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(
    private serviceMatch = new MatchService(),
  ) { }

  public getAll = async (_request: Request, response: Response): Promise<Response> => {
    const data = await this.serviceMatch.getAll();
    return response.status(200).json(data);
  };

  public getProgressFilter = async (request: Request, response: Response): Promise<Response> => {
    const { inProgress } = request.query;
    if (inProgress !== 'true' && inProgress !== 'false') {
      return this.getAll(request, response);
    }
    const filtered = await this.serviceMatch.getProgressFilter(inProgress === 'true');
    return response.status(200).json(filtered);
  };

  public finish = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    await this.serviceMatch.finish(id);
    return response.status(200).json({ message: 'Finished' });
  };

  public addNew = async (request: Request, response: Response): Promise<Response> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = request.body;
    const inProgress = true;
    const data = await this.serviceMatch
      .addNew({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
    return response.status(201).json(data);
  };
}

