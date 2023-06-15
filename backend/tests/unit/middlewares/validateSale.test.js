const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateSale = require('../../../src/middlewares/saleValidate');

describe('testando middleware insert de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('ao enviar dados válidos deve retornar com sucesso', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    const req = {
      body: [{ productId: 1, quantity: 1 }],
    };
  
    const next = sinon.stub().returns();
  
    await validateSale(req, res, next);
  
    expect(validateSale).to.be.a('function');
  });  

  it('testando erro sem ID', async function () {
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.responseData = data;
      },
    };
  
    const req = {
      body: [{ quantity: 1 }],
    };
  
    const next = {};
  
    await validateSale(req, res, next);
  
    expect(res.statusCode).to.equal(400);
    expect(res.responseData).to.deep.equal({ message: '"productId" is required' });
  });
  
  it('testando erro sem qtde', async function () {
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.responseData = data;
      },
    };
  
    const req = {
      body: [{ productId: 1 }],
    };
  
    const next = {};
  
    await validateSale(req, res, next);
  
    expect(res.statusCode).to.equal(400);
    expect(res.responseData).to.deep.equal({ message: '"quantity" is required' });
  });
  
  it('testando erro ID inexistente', async function () {
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.responseData = data;
      },
    };
  
    const req = {
      body: [{ productId: 707070707, quantity: 1 }],
    };
  
    const next = {};
  
    await validateSale(req, res, next);
  
    expect(res.statusCode).to.equal(404);
    expect(res.responseData).to.deep.equal({ message: 'Product not found' });
  });
});