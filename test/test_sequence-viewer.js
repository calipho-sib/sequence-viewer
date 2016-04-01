/*
 * Copyright (c) 2015 piotr.gawron
 * Licensed under the Apache-2.0 license.
 */


// chai is an assertion library
var chai = require('chai');

// @see http://chaijs.com/api/assert/
var assert = chai.assert;
var expect = chai.expect;

// register alternative styles
// @see http://chaijs.com/api/bdd/
chai.expect();
chai.should();

// requires your main app (specified in index.js)
Handlebars = require("handlebars");
var Sequence = require('../src/sequence-viewer.js');

// Create mock document object
// Sequence viewer will attach visualization to the object inside it
var jsdom = require('jsdom');

describe('sequence-viewer module', function(){
  describe('test coverage', function(){
    before(function () {
      //set global docuemnt and window variables
      global.document = jsdom.jsdom();
      global.window = document.defaultView;

      // jquery library
      global.jQuery = global.$ = require('jquery');
    })

    it('unknown id', function(){
      var mockDivId = "mockDivId";

			var html = "<div id=\""+mockDivId+"\"/>";

			//append mock html
			$("body").append(html);

      var sequenceViewer = new Sequence('ACGTTTTT');
        
			var renderCall = function() {
				sequenceViewer.render("#unknown_id");
			};
		
			//Unknown id should cause an Error
			expect(renderCall).to.throw(Error);

    });
    it('invalid id', function(){
      var mockDivId = "mockDivId";

			var html = "<div id=\""+mockDivId+"\"/>";

			//append mock html
			$("body").append(html);

      var sequenceViewer = new Sequence('ACGTTTTT');
			var renderCall = function() {
        sequenceViewer.render(16);
      }
			//Identifier that is not a string should cause an Error
			expect(renderCall).to.throw(Error);

    });

    it('on click', function(){
      var mockDivId = "mockDivId";

			var html = "<div id=\""+mockDivId+"\"/>";

			//append mock html
			$("body").append(html);

      var clickEvents = 0;
			var onclickFun = function(e) {
        console.log('element clicked');
        clickEvents++;
      }

      var sequenceViewer = new Sequence('ACGTTTTT');
      sequenceViewer.render("#"+mockDivId);

			var exempleSequenceCoverage = [
				{start: 2, end: 6, color: "black", onclick:onclickFun}
			];
			sequenceViewer.coverage(exempleSequenceCoverage);

			//check if we can click on the sequence
			var onclickObjects = $("[onclick]");
			assert.ok(onclickObjects.length>0,"no html element have onclick event handler set");
			for (var i=0;i<onclickObjects.length;i++) {
			  onclickObjects[i].onclick();
			}
			assert.equal(1,clickEvents,"Our event handle wasn't called appropriate number of times");

    });

    it('tooltip and background', function(){
      var mockDivId = "mockDivId";

			var html = "<div id=\""+mockDivId+"\"/>";

			//append mock html
			$("body").append(html);

      var sequenceViewer = new Sequence('ACGTTTTT');
      sequenceViewer.render("#"+mockDivId);
			var resultHtml = $("#"+mockDivId).html();
			assert.ok(resultHtml.indexOf("title")<0,"title field found, but is not expected");

			var exempleSequenceCoverage = [
				{start: 2, end: 6, color: "black", bgcolor: "#0f0fff", tooltip: "Substitution HLCG->EAD"}
			];
			sequenceViewer.coverage(exempleSequenceCoverage);

			resultHtml = $("#"+mockDivId).html();

			assert.ok(resultHtml.indexOf("title")>=0, "no tooltip field found");
			assert.ok(resultHtml.indexOf("Substitution HLCG->EAD")>=0, "no tooltip found in the html");
			assert.ok(resultHtml.indexOf("#0f0fff")>=0, "background color wasn't used in html");

    });
  });
});

