const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateProductName = require('../../../src/middlewares/productNameValidate');
const validateProductId = require('../../../src/middlewares/productIdValidate');

describe('testando middleware de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando retorno com sucesso', async function () {
    expect(validateProductName).to.be.a('function');
    expect(validateProductId).to.be.a('function');

    const res = {};
    const req = {
      params: { id: 1 },
      body: { name: 'opaganastar' },
    };

    await validateProductName(req, res, () => { });
    await validateProductId(req, res, () => { });
  });

  it('testante erro de retorno sem sucesso', async function () {
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
      params: 1,
      body: {},
    };

    const next = {};

    await validateProductName(req, res, next);

    expect(res.statusCode).to.equal(400);
    expect(res.responseData).to.deep.equal({ message: '"name" is required' });
  });

  it('testando erro ID inválido', async function () {
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
      params: { id: 707070707 },
      body: {},
    };

    const next = {};

    await validateProductId(req, res, next);

    expect(res.statusCode).to.equal(404);
    expect(res.responseData).to.deep.equal({ message: 'Product not found' });
  });
});
