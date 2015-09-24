
var expect = require('chai').expect;
var loader = require('../lib/html-require-postloader');

describe('html-require-postloader', function () {

    it('should exist', function () {
        expect(loader).to.be.defined;
    });

    it('should parse source and extract pieces as requires', function () {
        var source = 'module.exports = "test foo marker foo value=\'requiredValue\' foo"';
        var result = loader(source);

        expect(result).to.contain('require(\'requiredValue\')');
    });
});