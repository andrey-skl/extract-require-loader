var utils = require('loader-utils');
var VALUE_MARKER = '#value#';

function getOptions() {
    return utils.parseQuery(this.query);
}

function getIndexesOf(str, searchStr) {
    var startIndex = 0, searchStrLen = searchStr.length;
    var index, indexes = [];
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();

    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indexes.push(index);
        startIndex = index + searchStrLen;
    }
    return indexes;
}

function getStopIndex(searchStr, startIndex, stopWord) {
    return searchStr.indexOf(stopWord, startIndex);
}

function getValue(source, valueRegExp, startIndex, stopIndex) {
    var searchArea = source.substring(startIndex, stopIndex);
    var match = searchArea.match(new RegExp(valueRegExp, 'i'));
    return match[1];
}


function extractStartStopIndexes(source, marker) {
    var startIndexes = getIndexesOf(source, marker.attribute);
    return startIndexes.map(function (startIndex) {
        return {
            start: startIndex,
            stop: getStopIndex(source, startIndex, marker.stopWord)
        };
    });
}

module.exports = function(source) {
    var newSource = '';

    var options = getOptions.call(this);

    options.markers.forEach(function (marker) {
        extractStartStopIndexes(source, marker).forEach(function (index) {
            var value = getValue(source, marker.valueRegExp, index.start, index.stop);
            var requireTemplate = marker.requireTemplate || options.requireTemplate;

            newSource += requireTemplate.replace(VALUE_MARKER, value) + '\n';
        });
    });

    newSource += source;

    return newSource;
};