import * as sinon from 'sinon';
import * as chai from 'chai';
import { Response } from 'superagent';
import MatchModel from '../database/models/MatchModel';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('', () => {
    beforeEach(() => {
        sinon.stub(MatchModel, 'findAll').resolves(match() as unknown as MatchModel[])
    });
    afterEach(() => (MatchModel.findAll as sinon.SinonStub).restore());

    it('"GET/matches", retorna todos match com o status 200 ', async () => {
        const response = await chai.request(app).get('/matches');
        expect(response.body).to.be.an('array');
        expect(response.status).to.be.equal(200);
    });
});

describe('', async () => {
    beforeEach(() => {
        sinon.stub(MatchModel, 'findAll').resolves(dataMatchesProgress() as unknown as MatchModel[])
    });
    afterEach(() => (MatchModel.findAll as sinon.SinonStub).restore());
    
    it('"GET/matches?inProgress=true", retorna todos match em progresso com o status 200', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');
      expect(response.body).to.be.deep.equal(dataMatchesProgress());
      expect(response.status).to.be.equal(200);
    });
});
const validUserDatabase = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}


function match () {
    return [
            {
              "id": 1,
              "homeTeam": 16,
              "homeTeamGoals": 1,
              "awayTeam": 8,
              "awayTeamGoals": 1,
              "inProgress": false,
              "teamHome": {
                "teamName": "São Paulo"
              },
              "teamAway": {
                "teamName": "Grêmio"
              }
            },
            {
              "id": 41,
              "homeTeam": 16,
              "homeTeamGoals": 2,
              "awayTeam": 9,
              "awayTeamGoals": 0,
              "inProgress": true,
              "teamHome": {
                "teamName": "São Paulo"
              },
              "teamAway": {
                "teamName": "Internacional"
              }
            }
          ]    
}

function dataMatchesProgress () {
    return [
        {
            "id": 41,
            "homeTeam": 16,
            "homeTeamGoals": 2,
            "awayTeam": 9,
            "awayTeamGoals": 0,
            "inProgress": true,
            "teamHome": {
                "teamName": "São Paulo"
            },
            "teamAway": {
            "teamName": "Internacional"
          }
        },
        {
          "id": 42,
          "homeTeam": 6,
          "homeTeamGoals": 1,
          "awayTeam": 1,
          "awayTeamGoals": 0,
          "inProgress": true,
          "teamHome": {
            "teamName": "Ferroviária"
          },
          "teamAway": {
            "teamName": "Avaí/Kindermann"
          }
        }
      ]    
}
