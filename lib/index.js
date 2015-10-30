/*
 * sequence-viewer
 * https://github.com/calipho-sib/sequence-viewer
 *
 * Copyright (c) 2015 Calipho - SIB
 * Licensed under the MIT license.
 */

/**
 @class sequenceviewer
 */


//var  sequenceviewer;
//module.exports = sequenceviewer = function(opts){
//    this.el = opts.el;
//    this.el.textContent = sequenceviewer.hello(opts.text);
//};
Handlebars = require("handlebars");
var jQuery = $ = require("jquery");

var Sequence = require("../src/sequence-viewer.js");
require("biojs-events").mixin(Sequence.prototype);
module.exports = Sequence;