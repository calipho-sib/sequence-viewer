var Sequence = (function () {

    function Sequence(sequence, isoformName) {
        var self = this;
        this.events = {
            MOUSE_SELECTION_EVENT: "sequence-viewer-mouse-selection",
            SEQUENCE_SELECTED_EVENT: "sequence-viewer-substring-selected"
        };
        var isoName;
        if (isoformName !== undefined) isoName = isoformName;
        else isoName = "";
        console.log(isoName);
        var sequence = sequence;
        var seqInit = "";
        var seqCustomized = "";
        var seqCoverage = {
            data : [],
            start : null,
            end : null,
            hlColor : null
        }
//        var lineJump = 0;
        var title;
        var divID;
        var sequenceOptions = {};
        var el;
        var seqHeight;
        var showBadge;

        this.render = function (divId, options) {
            //identifier should be a string in other cases we might get strange effects
            if (typeof divId !== 'string') {
               throw new Error("Div identifier must be a string");
            }
            divID = divId;
            el = document.getElementById(divId.substring(1));
            if (el === null) {
              throw new Error("Cannot find element with id: " + divId.substring(1));
            }
//            if (typeof options === 'undefined') {
//                var options = {
//                    'showLineNumbers': true,
//                    'wrapAminoAcids': true,
//                    'charsPerLine': 30,
//                    'search': false,
//                    'toolbar': false,
//                    'title': "Protein Sequence",
//                    'sequenceMaxHeight': "400px",
//                    'badge': true
//                     'header' : {
//                         display: true or false,
//                         searchInTitle : true or false
//                     }
//                }
//            }
//            
//            else sequenceOptions = options;
            if (!options) options = {};
            
            
            sequenceOptions.showLineNumbers = options.showLineNumbers === undefined ? true : options.showLineNumbers;
            sequenceOptions.wrapAminoAcids = options.wrapAminoAcids === undefined ? true : options.wrapAminoAcids;
            sequenceOptions.sequenceMaxHeight = options.sequenceMaxHeight === undefined ? "400px" : options.sequenceMaxHeight;
            sequenceOptions.title = options.title === undefined ? "Protein Sequence" : options.title;
            sequenceOptions.charsPerLine = options.charsPerLine === undefined ? 30 : options.charsPerLine;
            sequenceOptions.search = options.search === undefined ? false : options.search;
            sequenceOptions.toolbar = options.toolbar === undefined ? false : options.toolbar;
            sequenceOptions.badge = options.badge === undefined ? true : options.badge;
            
            sequenceOptions.header = options.header ? {
                display : options.header.display === undefined ? true : options.header.display,
                searchInTitle : options.header.searchInTitle === undefined ? true : options.header.searchInTitle,
                unit : options.header.unit === undefined ? "Char" : options.header.unit,
                showCpl : options.header.showCpl === undefined ? true : options.header.showCpl,
                badgeWithUnit : options.header.badgeWithUnit === undefined ? false : options.header.badgeWithUnit
            } : {display : true, searchInTitle : true, unit : "Char", showCpl: true, badgeWithUnit: false};


            var badge = "<div style=\"display:inline-block;\">" +
                "<span class=\"badge\" style=\"border-radius:70%;border: 2px solid black;color:#C50063;padding:8px 5px;background-color:white;margin-right:10px;vertical-align:middle;min-width:32px;\">" + sequence.length + "</span>" +
                "</div>";
            
            var badgeWithUnit = "<div style=\"display:inline-block;\">" +
                "<span class=\"badge\" style=\"border-radius:70%;border: 2px solid black;color:#C50063;padding:5px 5px;background-color:white;margin-right:10px;vertical-align:middle;min-width:32px;font-size:11px;\">" + sequence.length + "<div style='margin-top:-2px;font-size:9px;color:black;text-transform:lowercase;'>" + sequenceOptions.header.unit + "</div></span>" +
                "</div>";

            var displayBadge = sequenceOptions.badge ? sequenceOptions.header.badgeWithUnit ? badgeWithUnit : badge : "";
            
            var header = sequenceOptions.header.display ? "<div class=\"sequenceHeader row\" style=\"border-bottom: 1px solid #E7EAEC;padding-bottom:5px;margin:0px 0px 10px\">" +
                displayBadge + "<h4 style=\"display:inline-block;vertical-align:middle;\">" + sequenceOptions.title + "</h4>" +
                "</div>" : "";

            var sources = header +
                "<div class=\"sequenceBody\" style=\"margin-top: 5px;\">" +
                "<div class=\"scroller\" style=\"max-height:" + sequenceOptions.sequenceMaxHeight + ";overflow:auto;white-space: nowrap;padding-right:20px;margin-right:10px;\">" +
                "<div class=\"charNumbers\" style=\"font-family: monospace;font-size: 13px;display:inline-block;text-align:right; padding-right:5px; border-right:1px solid LightGray;\"></div>" +
                "<div class=\"fastaSeq\" display-option=\"" + sequenceOptions.charsPerLine + "\" style=\"font-family: monospace;font-size: 13px;display:inline-block;padding:5px;\">" + sequence + "</div></div>" +
                "<div class=\"coverageLegend\" style=\"margin-top: 10px;margin-left:15px;\"></div>" +
                "</div>";

            $(divId).html(sources);
	
            if (sequenceOptions.wrapAminoAcids) {
                sequenceLayout(divId + " .fastaSeq");
            }
            else $(divId + " .scroller").css("overflow-x", "auto");
            
            if (sequenceOptions.showLineNumbers)
                lineNumbers(divId + " .fastaSeq", divId + " .charNumbers");

            if (sequenceOptions.toolbar) {
                if (sequenceOptions.header.showCpl){
                    addToolbar();
                }
                else {
                    var source = "<form class=\"form-inline\" style=\"margin-bottom:5px;\">" +
                    "<div class=\"form-group form-group-sm sequenceToolbar\" style=\"\"> "+
                        "</div></form>";
                    $(divID + " .sequenceBody").prepend(source);
                }
                if (isoName !== "") {
                    $(divID + " .sequenceToolbar").append(
                        "<a class=\"btn btn-default btn-sm fasta-link\" href=\"http://www.nextprot.org/entry/" + isoName.split("-")[0] + "/fasta?isoform=" + isoName.slice(3) + "\" target='_blank'>View FASTA</a>" +
//                        "<a class=\"btn btn-default btn-sm disabled\" href=\"\" style=\"margin-left:5px;\">Blast sequence</a>" +
//                        "<a class=\"btn btn-default btn-sm disabled\" href=\"\" style=\"margin-left:5px;\">Blast selection</a>"
                        '<div class="btn-group" role="group" aria-label="..." style="margin-left:5px;" data-toggle="tooltip" data-placement="top" title="Soon to be implemented">' +
                          '<a class=\"btn btn-default btn-sm disabled\" style="margin-left:-1px;" href=\"\">BLAST sequence</a>' +
                          '<a class=\"btn btn-default btn-sm disabled\" href=\"\">BLAST selection</a>' +
                        '</div>'
                    );
                }
            }
            
            if (sequenceOptions.search) {
                var inHeader = sequenceOptions.header.searchInTitle;
                addSequenceSearch(inHeader);
            }

            seqInit = $(divId + " .fastaSeq").html();
            mouseSelectionListener();
        };

        this.selection = function (start, end, color, options) {
            var positions = [start, end];
            var hlSeq = seqInit;
            subpartSelection([{start:start,end:end}]);
            positions[0] = positions[0] + ~~(positions[0] / 10) + 4 * (~~(positions[0] / sequenceOptions.charsPerLine));
            positions[1] = positions[1] + ~~(positions[1] / 10) + 4 * (~~(positions[1] / sequenceOptions.charsPerLine));
            var highlightColor = color;
            hlSeq = hlSeq.substring(0, positions[0]) +
            "<span class='stringSelected' style=\"background:" + color + ";color:white;\">" +
            hlSeq.substring(positions[0], positions[1]) +
            "</span>" +
            hlSeq.substring(positions[1], hlSeq.length);
            $(divID + " .fastaSeq").html(hlSeq);
        };

        function multiHighlighting(ArrayHL, color, options) {
            var startTime2 = new Date().getTime();
            if (ArrayHL.length === 0) {
                $(divID + " .fastaSeq").html(seqInit);
            }
            var hlSeq = seqInit;
            var seqTemp = hlSeq.toString();
            var positionStart = 0;
            var positionEnd = 0;
            for (i in ArrayHL) {
                positionStart = jTranslation(ArrayHL[i].start);
                positionEnd = jTranslation(ArrayHL[i].end);
                seqTemp = seqTemp.substring(0, positionStart) +
                "<span class='stringsSelected' style=\"background:" + color + ";color:white;\">" +
                seqTemp.substring(positionStart, positionEnd) +
                "</span>" +
                seqTemp.substring(positionEnd, seqTemp.length);
            }
            $(divID + " .fastaSeq").html(seqTemp);
        }

        this.addLegend = function (hashLegend) {
            for (var i = 0; i < hashLegend.length; i++) {
                if (hashLegend[i].underscore === true) {
                    $(divID + " .coverageLegend").append("<div style=\"display:inline-block;background:" + hashLegend[i].color + ";width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;border-radius:50%; border: 1px solid grey;text-align:center; line-height:0.8;\">_</div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\">" + hashLegend[i].name + "</p></div>");
                }
                else {
                    $(divID + " .coverageLegend").append("<div style=\"display:inline-block;background:" + hashLegend[i].color + ";width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;border-radius:50%;\"></div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\">" + hashLegend[i].name + "</p>");
                }
            }
        };

        function jTranslation(i) {
            var j = i + ~~(i / 10) + 4 * (~~(i / sequenceOptions.charsPerLine));
            return j;
        }
        function fillGap(list) {
            var listCloned = list.slice();
            for (var i=0;i<=list.length-1;i++) {
                if (i===0){
                    if (list[0].start > 0) {
                        listCloned.unshift({start: 0, end: list[0].start, color: "black", underscore: false});
                    }
                    if (i === list.length-1) {
                        listCloned.push({start: list[i].end, end: sequence.length, color: "black", underscore: false});
                    }
                }
                else if (i === list.length-1){
                    if (list[i-1].end < list[i].start){
                        listCloned.push({start: list[i-1].end, end: list[i].start, color: "black", underscore: false});
                    }
                    if (list[i].end < sequence.length-1){
                        listCloned.push({start: list[i].end, end: sequence.length, color: "black", underscore: false});
                    }
                }
                else {
                    if (list[i-1].end < list[i].start){
                        listCloned.push({start: list[i-1].end, end: list[i].start, color: "black", underscore: false});
                    }
                }
                if (i !== 0 && list[i-1].end > list[i].start){
                    console.warn("WARNING (error): Some positions in the coverage list are overlapping");
                }
            }
            listCloned.sort(function (a, b) {
                return a.start - b.start;
            });
            return listCloned;
        }

        this.coverage = function (HashAA, start, end, highlightColor) {
            seqCoverage.data = jQuery.extend(true, [], HashAA);
            seqCoverage.start = start;
            seqCoverage.end = end;
            seqCoverage.hlColor = highlightColor;
            
            HashAA.sort(function (a, b) {
                return a.start - b.start;
            });
            HashAA=fillGap(HashAA);
            var timestart = new Date().getTime();
            if (!start) var start = 0;
            if (!end) var end = 0;
            if (!highlightColor) var highlightColor = "#FFE5A3";
            var source = "";
            var pre = "";
            for (var i = 0; i < HashAA.length; i++) {
                var tooltipStr = "";
                if (HashAA[i].tooltip !== undefined) {
                    tooltipStr = " title=\""+HashAA[i].tooltip+"\"";
                }
                var bgcolorStr = "";
                if (HashAA[i].bgcolor !== undefined) {
                    bgcolorStr = "background:"+HashAA[i].bgcolor+";";
                }
                //in html string there is no easy way to put function, therefore
                //assign to onclick event handler identifier of the region,
                //and after all DOM objects will be created we will replace this handlers
                //with proper functions
                var onclickStr = "";
                var cursorStr = "";
                if (HashAA[i].onclick !== undefined) {
                    onclickStr = " onclick=\" return "+i+";\" ";
                    cursorStr = "cursor: pointer;";
                }
                
                if (HashAA[i].underscore) {
                    pre = "<span style=\"text-decoration:underline;color:" + HashAA[i].color + ";" + bgcolorStr + cursorStr+ "\"" + tooltipStr + onclickStr + ">";
                    source += pre;
                }
                else {
                    pre = "<span style=\"color:" + HashAA[i].color + ";" + bgcolorStr + cursorStr + "\"" + tooltipStr + onclickStr + ">";
                    source += pre;
                }
                if (end) {
                    if (start >= HashAA[i].start && start < HashAA[i].end && end >= HashAA[i].start && end < HashAA[i].end) {

                        source += seqInit.substring(jTranslation(HashAA[i].start), jTranslation(start)) + "<span class=\"peptideHighlighted\" style=\"background:" + highlightColor + ";\">" + seqInit.substring(jTranslation(start), jTranslation(end + 1));

                        source += "</span>" + seqInit.substring(jTranslation(end + 1), jTranslation(HashAA[i].end)) + "</span>";
                    }
                    else if (start >= HashAA[i].start && start < HashAA[i].end) {
                        source += seqInit.substring(jTranslation(HashAA[i].start), jTranslation(start)) + "</span><span class=\"peptideHighlighted\" style=\"background:" + highlightColor + ";\">" + pre + seqInit.substring(jTranslation(start), jTranslation(HashAA[i].end)) + "</span>";
                    }
                    else if (end >= HashAA[i].start && end < HashAA[i].end) {
                        source += seqInit.substring(jTranslation(HashAA[i].start), jTranslation(end + 1)) + "</span></span>" + pre + seqInit.substring(jTranslation(end + 1), jTranslation(HashAA[i].end)) + "</span>";
                    }
                    else {
                        source += seqInit.substring(jTranslation(HashAA[i].start), jTranslation(HashAA[i].end)) + "</span>";
                    }
                }
                else {
                    source += seqInit.substring(jTranslation(HashAA[i].start), jTranslation(HashAA[i].end)) + "</span>";
                }
            }
            var fastaDiv = $(divID + " .fastaSeq");
            fastaDiv.html(source);
            seqCustomized = source;

            //and now (after we created dom objects) we can assign onclick events
            var onclickObjects = $("[onclick]",fastaDiv);
            for (var i=0;i<onclickObjects.length;i++) {
              //get the id that was assigned to onclick event in the simple html
              var onclickId = onclickObjects[i].onclick();
              //and replace it with proper function
              onclickObjects[i].onclick = HashAA[onclickId].onclick;
            }

        };

        function lineNumbers(textAreaID, lineNumberID) {
            var textContent = $(textAreaID).html().split("<br>");
            var NBC = parseInt($(textAreaID).attr("display-option"));
            var newTextContent = [];
            var charPerLine = 0;
            for (var i = 0; i < textContent.length; i++) {
                newTextContent.push((charPerLine + 1) + ("<br>"));
                charPerLine += NBC;
            }
            $(lineNumberID).html(newTextContent.join(""));

        };

        function sequenceLayout(textAreaID) {
            var newLines = parseInt($(textAreaID).attr("display-option"));
            newLines = (newLines + (newLines / 10)).toString();
            var seqFormat = $(textAreaID).html();
            seqFormat = seqFormat.toString().match(/.{1,10}/g).join(' ').match(new RegExp('.{1,' + newLines + '}', 'g')).join('<br>');
            
            seqCustomized = seqFormat;
            $(textAreaID).html(seqFormat);
        }

        function addSequenceSearch(inHeader) {
            if (inHeader){
                $(divID + " .sequenceHeader").append('<input class=\"inputSearchSeq form-control pull-right\" type=\"text\" style=\"width:40%;margin-top: 3px;\" placeholder=\"Search in sequence.. (Regex supported)\">');
            }
            else{
                $(divID + " .sequenceBody").prepend('<input class=\"inputSearchSeq form-control\" type=\"text\" style=\"width:100%;margin:3px auto 10px;\" placeholder=\"Search in sequence.. (Regex supported)\">');
            }
            sequenceSearch();

        }

        function sequenceSearch() {
            $(divID + " .inputSearchSeq").keyup(function () {
                var text = $(this).val();
                var containsLetter = (/\S/.test(text));
                if (containsLetter) {
//                if (text !== "") {
                    var text2 = new RegExp(text, "gi");
                    var match;
                    var matches = [];
                    while ((match = text2.exec(sequence)) != null) {
                        matches.push({start: match.index, end: match.index + match[0].length});
                    }
                    matches.sort(function (a, b) {
                        return b.start - a.start;
                    });
                    subpartSelection(matches);
                    multiHighlighting(matches, "#C50063");
                }
                else {
                    $(divID + " .fastaSeq").html(seqCustomized);
                }
            });
        }

        function subpartSelection(list) {
            var selectedParts = getSequenceOfSelection(list, sequence);
            if (selectedParts) triggerSequenceSelectedEvent(selectedParts);
        }

        function getSequenceOfSelection(selection, sequence) {
            var selectionList = [];
            if (selection.length)
            {
                selection.forEach(function (s) {
                    selectionList.push({
                        start: s.start + 1,
                        end: s.end,
                        sequence: sequence.substring(s.start, s.end)
                    });
                });
            }
            return selectionList;
        }

        function triggerSequenceSelectedEvent(selection) {
            if (CustomEvent) {
                var event = new CustomEvent(self.events.SEQUENCE_SELECTED_EVENT, {
                    detail: selection
                });
                el.dispatchEvent(event);

            } else {
                console.warn("CustomEvent is not defined....");
            }
            if (self.trigger) self.trigger(self.events.SEQUENCE_SELECTED_EVENT, selection);
        }

        function mouseSelectionListener() {
            $(divID + " .fastaSeq").mouseup(function () {
                var selectedSubpart = getSelectedText();
                if (selectedSubpart) triggerMouseSelectionEvent(selectedSubpart);
            });
        }

        this.onMouseSelection = function (listener) {
            el.addEventListener(self.events.MOUSE_SELECTION_EVENT, listener);
            //$(document).on(self.events.FEATURE_SELECTED_EVENT, listener);
        };
        this.onSubpartSelected = function (listener) {
            el.addEventListener(self.events.SEQUENCE_SELECTED_EVENT, listener);
            //$(document).on(self.events.FEATURE_SELECTED_EVENT, listener);
        };

        function getSelectedText() {
            var text = window.getSelection().toString().replace(/\s+/g, '');
            var selection = window.getSelection();
            var element = $(divID + " .fastaSeq")[0];
            var caretOffset = 0;
            var seqText = $(divID + " .fastaSeq").text();
            
            var range = selection.getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
            
            var pos_end_parsed = seqText.substring(0,caretOffset).replace(/\s+/g, '').length;
            
            var pos_start_parsed = pos_end_parsed - (text.length -1);
            
            var text_selected = {
                text: text,
                start: pos_start_parsed,
                end: pos_end_parsed
            }
            
            return text_selected;
        }

        function triggerMouseSelectionEvent(subseq) {
            if (CustomEvent) {
                var event = new CustomEvent(self.events.MOUSE_SELECTION_EVENT, {
                    detail: {
                        'selection': subseq.text,
                        'start':subseq.start,
                        'end':subseq.end
                    }
                });
                el.dispatchEvent(event);

            } else {
                console.warn("CustomEvent is not defined....");
            }
            if (self.trigger) self.trigger(self.events.MOUSE_SELECTION_EVENT, {'selection': subseq});
        }

        function changeCharsPerLine(selection) {
            sequenceOptions.charsPerLine = selection.value;
            self.render(divID, sequenceOptions);
            if (seqCoverage.data.length){
                self.coverage(seqCoverage.data, seqCoverage.start, seqCoverage.end, seqCoverage.hlColor);
            }
        }

        function addToolbar() {
            var listOfCharsPerLine = ["50", "60", "70", "80", "90", "100"];
//            var source = "<form class=\"form-inline\" role=\"form\">" +
//                "<div class=\"sequenceToolbar row\" style=\"margin-bottom:15px;\">" +
//                "<div class=\"input-group input-group-sm\" style=\"margin-left:20px;\"> <span class=\"input-group-addon charPerLine-label\">Char per line</i></span>" +
//
//                "<select class=\"CPLChoice form-control\" style=\"border-top-left-radius: 0px;border-bottom-left-radius: 0px;\">" +
//                "<option>Select</option>" +
//                "<option value=50>50</option>" +
//                "<option value=60>60</option>" +
//                "<option value=70>70</option>" +
//                "<option value=80>80</option>" +
//                "<option value=90>90</option>" +
//                "<option value=100>100</option>" +
//                "</select>" +
//                "</div>" +
//                "</div>" +
//                "</form>";         
            var hidexsCharPerLine = isoName ? "hidden-xs" : "";
            var source = "<form class=\"form-inline\" style=\"margin-bottom:5px;\">" +
//                "<div class=\"sequenceToolbar row\" style=\"margin-bottom:15px;\">" +
                "<div class=\"form-group form-group-sm sequenceToolbar\" style=\"\"> "+
                    "<label class=\"control-label charPerLine-label " + hidexsCharPerLine + "\" for='"+ divID.substring(1) +"-cpl' style='margin-right:5px;'>" + sequenceOptions.header.unit + " per line</label>" +
                    "<select class=\"CPLChoice form-control " + hidexsCharPerLine + "\" id='"+ divID.substring(1) +"-cpl' style='display:inline-block;width:auto;margin-right:10px;'>" +
                        "<option>Select</option>" +
                        "<option value=50>50</option>" +
                        "<option value=60>60</option>" +
                        "<option value=70>70</option>" +
                        "<option value=80>80</option>" +
                        "<option value=90>90</option>" +
                        "<option value=100>100</option>" +
                    "</select>" +
                "</div>" +
                "</form>";
//            var template = Handlebars.compile(source);
//            var html = template({
//                "CPL": listOfCharsPerLine
//            });
            $(divID + " .sequenceBody").prepend(source);
            $(divID + " .CPLChoice").change(function () {
                changeCharsPerLine(this);
                $(divID + " .CPLChoice" + " option:selected").text($(this).val());
            });
        }
    }
    return Sequence;
})();
if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = Sequence;
}
