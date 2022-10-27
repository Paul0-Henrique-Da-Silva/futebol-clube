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

describe('', async () => {
  let requestHttp: Response; let responseHttp: Response;

  beforeEach(async () => {
    requestHttp = await chai.request(app).post('/login').send(validUser());
    responseHttp = await chai.request(app).post('/matches')
    .set('authorization', requestHttp.body.token).send(newMatch());
    sinon.stub(MatchModel, 'findOne').resolves(newMatch() as MatchModel)
  });
  afterEach(() => (MatchModel.findOne as sinon.SinonStub).restore());

  it('"POST/matches", salvar uma partida com o status de inProgress', async () => {
    expect(responseHttp.body)
    .to.be.deep.equal(
    { ...newMatch(), id: responseHttp.body.id, inProgress: responseHttp.body.inProgress });
    expect(responseHttp.status).to.be.equal(201);
  });
});

// mocks (brincando com Hoisting)
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

function validUser () {
  return { email: 'admin@admin.com', password: 'secret_admin'}
}

function newMatch () {
   return {
    homeTeam: 16, 
    awayTeam: 8, 
    homeTeamGoals: 2,
    awayTeamGoals: 2
  }
   
}