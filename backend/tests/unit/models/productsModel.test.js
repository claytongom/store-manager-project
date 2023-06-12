const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const productsModel = require('../../../src/models/productsModel');

const { products } = require('./mocks/productsModel.mock');

describe('Testando Models', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testando getAll', async function () {
    const executeStub = sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(products);
    
    executeStub.restore();
  });

  it('Testando retorno de produto por ID', async function () {
    const executeStub = sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(products[0]);

    executeStub.restore();
  }); 
});
