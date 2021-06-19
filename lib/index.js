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


global.jQuery = $ = require("jquery");
require('bootstrap/dist/css/bootstrap.min.css');

const Sequence = require("../src/sequence-viewer.js");
require("biojs-events").mixin(Sequence.prototype);
module.exports = Sequence;
