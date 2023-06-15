const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { sales, itemsSold, newSale } = require('./mocks/sales.controller.mock');

describe('testando SalesController', function () {
    afterEach(function () {
        sinon.restore();
    });
    describe('testando busca de vendas', function () {
        it('testando status 200 e o retorno da busca', async function () {
            const res = {};
            const req = {};

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon
                .stub(salesService, 'getAll')
                .resolves(sales);

            await salesController.getAll(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(sales);
        });
    });

    describe('testando busca unit de venda', function () {
        it('testando status 200 e retorno de busca', async function () {
            const res = {};
            const req = {
                params: { id: 2 },
            };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon
                .stub(salesService, 'getProductById')
                .resolves(sales);

            await salesController.getProductById(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(sales);
        });

        it('testando status 404 busca inexistente', async function () {
            const res = {};
            const req = {
                params: { id: 9999 },
            };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon
                .stub(salesService, 'getProductById')
                .resolves({ message: 'Product not found' });

            await salesController.getProductById(req, res);

            expect(res.status).to.have.been.calledWith(404);
            expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
        });
    });

    describe('testando cadastro de vendas', function () {
        it('testando status 200 e resutlado da busca', async function () {
            const res = {};
            const req = {
                body: itemsSold,
            };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();
            sinon
                .stub(salesService, 'createSale')
                .resolves(newSale);

            await salesController.createSale(req, res);

            expect(res.status).to.have.been.calledWith(201);
            expect(res.json).to.have.been.calledWith(newSale);
        });
    });
});