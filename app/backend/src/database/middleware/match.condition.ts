import { Request, Response, NextFunction } from 'express';

class Condition {
  public noEquals = async (request: Request, response: Response, next: NextFunction):
  Promise<Response | undefined> => {
    const { homeTeam, awayTeam } = request.body;
    if (homeTeam === awayTeam) {
      return response.status(401).json({ message: 'There is no team with such id!' });
    }
    next();
  };
}

export default Condition;
