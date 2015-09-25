# extract-require-loader
Webpack loader. Parses source and replaces content with required value.

## Usage example: 
```javascript 
    ...
    postLoaders: [
      {
        test: /.html$/,
        include: path.resolve(__dirname, 'app'),
        loader: 'extract-require-loader',
        query: {
          requireTemplate: 'require("icon/icon/source/#value#.svg");',
          markers: [{
            attribute: 'react-static=\\"Icon\\"',
            valueRegExp: 'react-glyph=."\'([a-z-]*)',
            stopWord: '>'
          }]
        }
      }
    ]
    ...
```