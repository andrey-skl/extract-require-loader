var expect = require('chai').expect;
var loader = require('../lib/extract-require-loader');

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

    it('should support html markup', function () {
        var query = {
            requireTemplate: 'require("some/#value#.svg");',
            markers:[
                {
                    attribute: 'react-static=\\"Icon\\"',
                    valueRegExp: 'react-glyph=."\'([a-z-]*)',
                    stopWord: '>'
                }
            ]
        };
        var query = '?' + JSON.stringify(query);
        var source = "module.exports = \"<span foo react-static=\\\"Icon\\\" foo react-glyph=\\\"'some-glyph-name'\\\" bar='test'></span>\"";

        var result = loader.call({query: query}, source);

        expect(result).to.contain('require("some/some-glyph-name.svg")');
    });
});