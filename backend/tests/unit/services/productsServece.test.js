const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');

const { products } = require('./mocks/productsService.mock');

describe('Testando Serive', function () {
    afterEach(function () {
        sinon.restore();
    });

    describe('Testando getAll', function () {
        it('testando status 200 e lista de produtos', async function () {
            const getAllStub = sinon.stub(productsModel, 'getAll').resolves(products);

            const result = await productsService.getAll();

            expect(result).to.deep.equal(products);

            getAllStub.restore();
        });
    });

    describe('Testando busca unidade de produto', function () {
        it('testando ID errado', async function () {
            const getByIdStub = sinon.stub(productsModel, 'getById').resolves(undefined);

            const result = await productsService.getById(1);

            expect(result.message).to.equal('Product not found');

            sinon.assert.calledOnce(getByIdStub);

            getByIdStub.restore();
        });

        it('Testando status 200 e produto buscado por ID', async function () {
            const getByIdStub = sinon.stub(productsModel, 'getById').resolves(products[0]);

            const result = await productsService.getById(1);

            expect(result).to.deep.equal(products[0]);

            sinon.assert.calledOnce(getByIdStub);

            getByIdStub.restore();
        });
    });
});