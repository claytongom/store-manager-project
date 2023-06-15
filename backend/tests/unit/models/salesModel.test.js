const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales, newSale } = require('./mocks/sales.model.mock');

describe('tesntando SalesModel', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando getAll sales', async function () {
    const executeStub = sinon.stub(connection, 'execute');
    executeStub.resolves([[sales]]);

    const result = await salesModel.getAll();

    expect(result).to.deep.equal([sales]);

    executeStub.restore();
  });

  it('testando busca por Id', async function () {
    const executeStub = sinon.stub(connection, 'execute').resolves([sales[2]]);

    const result = await salesModel.getProductById(2);

    expect(result).to.be.deep.equal(sales[2]);

    executeStub.restore();
  });

  it('testando cadastro de novo Id', async function () {
    const executeStub = sinon.stub(connection, 'execute');
    executeStub.resolves([{ insertId: 70 }]);
  
    const result = await salesModel.createSaleId();
  
    expect(result).to.be.deep.equal(70);
  
    executeStub.restore();
  });

  it('testando cadastro de sales', async function () {
    const executeStub = sinon.stub(connection, 'execute').resolves(newSale);

    const result = await salesModel.createSale(1, 1, 1);

    expect([result]).to.deep.equal(newSale);

    executeStub.restore();
  });  
});