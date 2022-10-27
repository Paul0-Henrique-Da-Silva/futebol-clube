import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UsersModel';
import * as bcrypt from 'bcryptjs';

// minha referencias em base de outro projetos..
// https://github.com/Paul0-Henrique-Da-Silva/node-api
// https://github.com/Paul0-Henrique-Da-Silva/ideas
// https://github.com/Paul0-Henrique-Da-Silva/auth_jwt/blob/main/app.js


chai.use(chaiHttp);
const { expect } = chai;

// mock
const validoUser = {
  email: 'ph46163835@gmail.com',
  password: bcrypt.hashSync('Alg-Cost-Salt-Hash'),
};

const simpleUser = {
  email: validoUser.email,
  password: validoUser.password,
  role: 'user',
}

const SECRET = process.env.JWT_SECRET as Jwt.Secret;

const token = Jwt.sign(
  { userEmail: validoUser.email }, SECRET,
  { algorithm: 'HS256', expiresIn: '3600' },
);

describe('', () => {
  it('"POST/login" Sem a senha, mensagem de erro com status 400', async () => {
    const response = await chai.request(app).post('/login')
    .send({
      email: 'any_email@gmail.com',
      password: ''
    });
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    expect(response.status).to.be.equal(400);
  });
});

describe('', () => {
  it('"POST/login" Sem o email, mensagem de erro com status 400', async () => {
    const response = await chai.request(app).post('/login')
    .send({
        email: '',
        password: 'password_invalid'
      });
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    expect(response.status).to.be.equal(400);
  });
});

describe('', () => { 
  beforeEach(() => {
    sinon.stub(UserModel, 'findOne').resolves(validoUser as UserModel)
  });
  afterEach(() => (UserModel.findOne as sinon.SinonStub).restore());
  
  it('"POST/login" Token JWT com status 200', async () => {
    const response = await chai.request(app)
    .post('/login').send({
      email: 'benignotatto@gmail.com',
      password: 'Alg-Cost-Salt-Hash'
    })
    expect(response.body).to.have.property('token');
    expect(response.status).to.be.equal(200);
  })
})

    
describe('', () => {
  beforeEach(() => {
    sinon.stub(UserModel, 'findOne').resolves(null as unknown as UserModel);
  });
  afterEach(() => (UserModel.findOne as sinon.SinonStub).restore());

  it('"POST/login", Usuario inválido, mensagem de erro com status 401', async () => {
    const response = await chai.request(app).post('/login')
    .send({
      email: 'email_invalid@gmail.com',
      password: 'password_invalid'
    });
    expect(response.status).to.be.equal(401);
  });

});

describe('', () => {
  beforeEach(() => {
    sinon.stub(UserModel, 'findOne').resolves(simpleUser as UserModel)
  });
  afterEach(() => { (UserModel.findOne as sinon.SinonStub).restore()});

  it('"GET/login/validate" retorne token valido e com status 200', async () => {
    const response = await chai.request(app).get('/login/validate')
    .set('authorization', token);

    expect(response.body).to.be.deep.equal({ role: simpleUser.role });
    expect(response.status).to.be.equal(200);
  });
});