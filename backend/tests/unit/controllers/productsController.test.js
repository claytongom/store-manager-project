const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { products } = require('./mocks/products.controller.mock');

describe('Teste Controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('testando busca por todos os produtos', function () {
    it('testantos status 200 na busca', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getAll')
        .resolves(products);
      await productsController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('testando busca unitaria por ID', function () {
    it('testando status 200 e infos produto', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductById')
        .resolves(products);
      await productsController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });

    it('testando status 404 para ID inexistente', async function () {
      const res = {};
      const req = {
        params: { id: 7070 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductById')
        .resolves({ message: 'Product not found' });
      await productsController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('testando cadastro de produtos', function () {
    it('testando dados salvos', async function () {
      const res = {};
      const req = {
        body: { name: 'ALLAN MOTO SPACE DO JASPION' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'insertProduct')
        .resolves({ id: 1, name: 'ALLAN MOTO SPACE DO JASPION' });

      await productsController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'ALLAN MOTO SPACE DO JASPION' });
    });

    it('testanto erro de qtde de caracteres', async function () {
      const res = {};
      const req = {
        body: { name: 'opa!' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'insertProduct')
        .resolves({
          message: '"name" length must be at least 5 characters long',
        });

      await productsController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('testando erro campo nome vazio', async function () {
      const res = {};
      const req = {
        body: {},
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'insertProduct')
        .resolves({
          message: '"name" is required',
        });

      await productsController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
    });

    describe('testando update de produto', function () {
      it('testando nome valido salvo', async function () {
        const res = {};
        const req = {
          params: 1,
          body: { name: 'A INIGUALÁVEL MARRETA DO  ̶T̶H̶O̶R̶ CHAPOLIN COLORADO' },
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(productsService, 'updateProduct')
          .resolves({ id: 1, name: 'A INIGUALÁVEL MARRETA DO  ̶T̶H̶O̶R̶ CHAPOLIN COLORADO' });

        await productsController.updateProduct(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({
          id: 1,
          name: 'A INIGUALÁVEL MARRETA DO  ̶T̶H̶O̶R̶ CHAPOLIN COLORADO',
        });
      });
    });
  });
});