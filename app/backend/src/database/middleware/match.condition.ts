import { Request, Response, NextFunction } from 'express';

class Condition {
  public noEquals = async (request: Request, response: Response, next: NextFunction):
  Promise<Response | undefined> => {
    const { homeTeam, awayTeam } = request.body;
    if (homeTeam === awayTeam) {
      return response.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  };
}

export default Condition;
