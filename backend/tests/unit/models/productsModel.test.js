const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/products.model.mock');

describe('testando ProductModels', function () {
    afterEach(function () {
        sinon.restore();
      });
      it('testando getAll', async function () {
        const executeStub = sinon.stub(connection, 'execute');
        executeStub.callsFake(() => Promise.resolve([products]));
      
        const result = await productsModel.getAll();
      
        expect(result).to.deep.equal(products);
      
        executeStub.restore();
      });      

      it('testando busca por Id', async function () {
        const executeStub = sinon.stub(connection, 'execute');
        executeStub.withArgs(sinon.match.string, [1]).resolves([[products[0]]]);
      
        const result = await productsModel.getProductById(1);
      
        expect(result).to.deep.equal(products[0]);
      
        executeStub.restore();
      });
});