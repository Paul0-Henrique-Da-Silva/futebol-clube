import { Request, Response, NextFunction } from 'express';
import MatchModel from '../models/MatchModel';

class Condition {
  private modelMacth = MatchModel;

  public noEquals = async (request: Request, response: Response, next: NextFunction):
  Promise<Response | undefined> => {
    const { homeTeam, awayTeam } = request.body;
    if (homeTeam === awayTeam) {
      return response.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  };

  public teamsExist = async (request: Request, response: Response, next: NextFunction):
  Promise<Response | undefined> => {
    const { homeTeam, awayTeam } = request.body;

    const isHomeTeam = await this.modelMacth.findOne({ where: { homeTeam } });
    const isAwayTeam = await this.modelMacth.findOne({ where: { awayTeam } });

    if (!isHomeTeam || !isAwayTeam) {
      return response.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  };
}

export default Condition;
