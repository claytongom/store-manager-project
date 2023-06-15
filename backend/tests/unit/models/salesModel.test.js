const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales } = require('./mocks/sales.model.mock');

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
});