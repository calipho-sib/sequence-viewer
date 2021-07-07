# neXtProt - The knowledge resource on human proteins

This is a code repository for the SIB - Swiss Institute of Bioinformatics CALIPHO group neXtProt project

See: https://www.nextprot.org/

# neXtProt sequence viewer

[![Build Status](https://travis-ci.org/calipho-sib/sequence-viewer.svg?branch=master)](https://travis-ci.org/calipho-sib/sequence-viewer)

> The sequence viewer is a super easy javascript library to use in order to draw a protein sequence in a readable way.

![Sequence viewer1](/assets/sequence-viewer-complete.png)

Live demo: https://cdn.rawgit.com/calipho-sib/sequence-viewer/master/examples/index.html

Simple example: https://cdn.rawgit.com/calipho-sib/sequence-viewer/master/examples/simple.html

## Getting Started

1) Include the library using NPM/Yarn
```
//NPM//
npm install sequence-viewer

//YARN//
yarn add sequence-viewer
```
Or Include the feature-viewer from jsDelivr CDN in the header of your html
```html
<script src="https://cdn.jsdelivr.net/gh/calipho-sib/sequence-viewer@v1.0.0/dist/sequence-viewer.bundle.js"></script>
```

**NOTE** : If you already got the dependencies (Bootstrap & Jquery) in your project, use the simple minified version instead of the bundle :
```html
<script src="https://cdn.jsdelivr.net/gh/calipho-sib/sequence-viewer@v1.0.0/dist/sequence-viewer.min.js"></script>
```

2) Specify a div in your html
```
<div id="sequence-viewer"></div>
```
3) Create an instance of Sequence in JavaScript and apply the render method
```javascript
var seq = new Sequence('MALWMRLLPLLALLALWGPGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
// Render the sequence with or without rendering options
// (Check the interactive documentation)
seq.render('#sequence-viewer');

```
To import Sequence Viewer into an ES2015 application, you can import specific symbols from specific Sequence Viewer modules:
```javascript
import Sequence from "sequence-viewer";
```

4) Et voila!

![Sequence viewer2](/assets/sequence-viewer-simple.png)


Note: if you choose the later approach with only the main javascript you should also include the dependencies, jquery,handlebars and bootstrap.min.css

## Documentation

Check out this interactive page for a better understanding of how to use the sequence viewer and its possibilities :
* https://cdn.rawgit.com/calipho-sib/sequence-viewer/master/examples/index.html


## Options
* Show chars per line
* Wrap lines
* Highlight
* Coverage
* Labels
* Toolbar (chars per line)
* Search
* Title
* sequenceMaxHeight
* Events
* Badge

## Examples 

[https://search.nextprot.org/entry/NX_P01308/structures](https://search.nextprot.org/entry/NX_P01308/structures)

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/calipho-sib/sequence-viewer/issues).

## Development

`git clone https://github.com/calipho-sib/sequence-viewer.git` 

`npm install`  (will install the development dependencies)

`npm start`  (will start the development server on localhost:8080)

...make your changes and modifications...

`npm run build` (will create the bundle js & css in build/)

`npm publish` (will publish in npm)



## License 
This software is licensed under the GNU GPL v2 license, quoted below.

Copyright (c) 2015, SIB Swiss Institute of Bioinformatics



