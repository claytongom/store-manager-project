const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { products } = require('./mocks/products.service.mock');

describe('testando productSerivece', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('testando getAll', function () {
    it('testando status 200 e retorno', async function () {
      const stub = sinon.stub(productsModel, 'getAll').resolves(products);

      const result = await productsService.getAll();

      expect(result).to.deep.equal(products);

      stub.restore();
    });
  });

  describe('testando busca de unidade de produto', function () {
    it('testando status 200 e retorno', async function () {
      const stub = sinon.stub(productsModel, 'getProductById').resolves(products[0]);

      const result = await productsService.getProductById(1);

      expect(result).to.deep.equal(products[0]);

      stub.restore();
    });

    it('testando status 404 para ID inexistente', async function () {
      const stub = sinon.stub(productsModel, 'getProductById').resolves(undefined);

      const result = await productsService.getProductById(1);

      expect(result.message).to.equal('Product not found');

      stub.restore();
    });
  });

  describe('testando insert de produto', function () {
    it('testando retorno de ID', async function () {
      const stub1 = sinon.stub(productsModel, 'insertProduct').resolves(1);
      const stub2 = sinon.stub(productsModel, 'getProductById').resolves(products[0]);

      const result = await productsService.insertProduct(products[0].name);

      expect(result.name).to.deep.equal(products[0].name);

      stub1.restore();
      stub2.restore();
    });

    it('testando erro nome inválido', async function () {
      const result = await productsService.insertProduct('opa!');

      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('testando update de produto', function () {
    it('testando retorno de produto', async function () {
      const stub1 = sinon.stub(productsModel, 'updateProduct').resolves();
      const stub2 = sinon.stub(productsModel, 'getProductById').resolves(products[0]);

      const result = await productsService.updateProduct(products[0].name, products[0].id);

      expect(result.id).to.deep.equal(products[0].id);
      expect(result.name).to.deep.equal(products[0].name);

      stub1.restore();
      stub2.restore();
    });
  });
});