const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { sales, newSale, productsSold, errorProduct } = require('./mocks/sales.service.mock');

describe('testando salesService', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('testando getAll', function () {
    it('testando status 200 e retorno', async function () {
      const stub = sinon.stub(salesModel, 'getAll').resolves(sales);

      const result = await salesService.getAll();

      expect(result).to.deep.equal(sales);

      stub.restore();
    });
  });

  describe('testando busca unitária de venda', function () {
    it('testando status 200 e os dados da venda', async function () {
      const stub = sinon.stub(salesModel, 'getProductById').resolves(sales[2]);

      const result = await salesService.getProductById(2);

      expect(result).to.deep.equal(sales[2]);

      stub.restore();
    });

    it('testando status 404 para ID inexistente', async function () {
      const stub = sinon.stub(salesModel, 'getProductById').resolves([]);

      const result = await salesService.getProductById(1);

      expect(result.message).to.equal('Sale not found');

      stub.restore();
    });
  });

  describe('testando cadastro de vendas', function () {
    it('testando status 404 sem dados inseridos', async function () {
      const stub1 = sinon.stub(salesModel, 'createSaleId').resolves(1);
      const stub2 = sinon.stub(salesModel, 'createSale').resolves(errorProduct[0]);

      const result = await salesService.createSale(errorProduct);

      expect(result.message).to.deep.equal('"quantity" is required');

      stub1.restore();
      stub2.restore();
    });

    it('testando status 200 e retorno', async function () {
      const stub1 = sinon.stub(salesModel, 'createSaleId').resolves(1);
      const stub2 = sinon.stub(salesModel, 'createSale').resolves(productsSold[0]);

      const result = await salesService.createSale(productsSold);

      expect(result).to.deep.equal(newSale);

      stub1.restore();
      stub2.restore();
    });
  });
});