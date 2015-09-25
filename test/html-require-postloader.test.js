var expect = require('chai').expect;
var loader = require('../lib/html-require-postloader');

describe('html-require-postloader', function () {
    var defaultQuery = {
        requireTemplate: 'require("icon/icon/source/#value#.svg");',
        markers:[
            {
                attribute: 'marker',
                valueRegExp: 'value=.([a-z]*)',
                stopWord: '>'
            }
        ]
    };

    it('should exist', function () {
        expect(loader).to.be.defined;
    });

    it('should parse source and extract pieces as requires', function () {
        var query = '?' + JSON.stringify(defaultQuery);
        var source = 'module.exports = "test foo marker foo value=\'requiredValue\' foo test > bar"';

        var result = loader.call({query: query}, source);

        expect(result).to.contain('require("icon/icon/source/requiredValue.svg")');
    });
});