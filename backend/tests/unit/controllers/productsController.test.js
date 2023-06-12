const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const { products } = require('./mocks/productsController.mock');

describe('Testando Controller', function () {
    afterEach(function () {
        sinon.restore();
    });
    describe('Listando todos os produtos', function () {
        it('testando retorno de status 200', async function () {
          // arrange
          const req = {};
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
          const getAllStub = sinon.stub(productsService, 'getAll').resolves(products);
      
          await productsController.getAll(req, res);

          sinon.assert.calledWith(res.status, 200);
          sinon.assert.calledWith(res.json, products);
      
          getAllStub.restore();
        });
      });

    describe('Testando a busca de unidade', function () {
        it('testando status 200 por ID', async function () {
            const res = {};
            const req = {
                params: {
                    id: 1,
                },
            };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon
                .stub(productsService, 'getById')
                .resolves(products);

            await productsController.getById(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(products);
        });

        it('Testando erro de produto nao localizado pelo ID', async function () {
            const req = {
              params: { id: 17987547 },
            };
            const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub(),
            };
            sinon.stub(productsService, 'getById').resolves({ message: 'Product not found' });
          
            await productsController.getById(req, res);
          
            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
          
            sinon.restore();
          });
    });
});
