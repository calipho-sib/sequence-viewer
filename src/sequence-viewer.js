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
        var lineJump = 0;
        var title;
        var divID;
        var sequenceOptions;
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
            if (typeof options === 'undefined') {
                var options = {
                    'showLineNumbers': true,
                    'wrapAminoAcids': true,
                    'charsPerLine': 30,
                    'search': false,
                    'toolbar': false,
                    'title': "Protein Sequence",
                    'sequenceMaxHeight': "400px",
                    'badge': true
                }
            }
            else sequenceOptions = options;

            (typeof options.charsPerLine === 'undefined') ? lineJump = 30 : lineJump = options.charsPerLine;
            (typeof options.title === 'undefined') ? title = "Protein Sequence" : title = options.title;
            (typeof options.sequenceMaxHeight === 'undefined') ? seqHeight = "400px" : seqHeight = options.sequenceMaxHeight;
            (typeof options.badge === 'undefined') ? showBadge = true : showBadge = options.badge;


            var badge = "<div style=\"display:inline-block;\">" +
                "<span class=\"badge\" style=\"border-radius:70%;border: 2px solid black;color:#C50063;padding:8px 5px;background-color:white;margin-right:10px;vertical-align:middle;\">{{sequenceLength}}</span>" +
                "</div>";

            var displayBadge = showBadge ? badge : "";

            var sources = "<div class=\"sequenceHeader row\" style=\"border-bottom: 1px solid #E7EAEC;padding-bottom:5px;margin:0px 0px 15px\">" +
                displayBadge + "<h4 style=\"display:inline-block;vertical-align:middle;\">" + title + "</h4>" +
                "</div>" +
                "<div class=\"sequenceBody\" style=\"margin-top: 5px;\">" +
                "<div class=\"scroller\" style=\"max-height:" + seqHeight + ";overflow:auto;white-space: nowrap;padding-right:20px;margin-right:10px;s\">" +
                "<div class=\"charNumbers\" style=\"font-family: monospace;font-size: 13px;display:inline-block;text-align:right; padding-right:5px; border-right:1px solid LightGray;\"></div>" +
                "<div class=\"fastaSeq\" display-option=\"" + lineJump + "\" style=\"font-family: monospace;font-size: 13px;display:inline-block;padding:5px;\">{{{sequence}}}</div></div>" +
                "<div class=\"coverageLegend\" style=\"margin-top: 10px;margin-left:15px;\"></div>" +
                "</div>";

            var template = Handlebars.compile(sources);
            var html = template({
                "sequence": sequence,
                "sequenceLength": sequence.length
            });
            $(divId).html(html);
	
            if (!(options.wrapAminoAcids === false)) {
                sequenceLayout(divId + " .fastaSeq");
            }
            else $(divId + " .scroller").css("overflow-x", "auto");
            if (!(options.showLineNumbers === false))
                lineNumbers(divId + " .fastaSeq", divId + " .charNumbers");

            if (options.search) {
                addSequenceSearch();
            }
            if (options.toolbar) {
                addToolbar();
                if (isoName !== "") {
                    $(".sequenceToolbar").append(
                        "<a class=\"btn btn-default\" href=\"http://www.nextprot.org/db/entry/" + isoName.split("-")[0] + "/fasta?isoform=" + isoName.slice(3) + "\" style=\"margin-left:15px;\">view Fasta</a>" +
                        "<a class=\"btn btn-default disabled\" href=\"\" style=\"margin-left:15px;\">Blast sequence</a>" +
                        "<a class=\"btn btn-default disabled\" href=\"\" style=\"margin-left:15px;\">Blast selection</a>"
                    );
                }
            }

            seqInit = $(divId + " .fastaSeq").html();
            mouseSelectionListener();
        };

        this.selection = function (start, end, color, options) {
            var positions = [start, end];
            var hlSeq = seqInit;
            subpartSelection([{start:start,end:end}]);
            positions[0] = positions[0] + ~~(positions[0] / 10) + 4 * (~~(positions[0] / lineJump));
            positions[1] = positions[1] + ~~(positions[1] / 10) + 4 * (~~(positions[1] / lineJump));
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
            var j = i + ~~(i / 10) + 4 * (~~(i / lineJump));
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
            HashAA.sort(function (a, b) {
                return a.start - b.start;
            });
            HashAA=fillGap(HashAA);
            console.log(HashAA);
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

            $(textAreaID).html(seqFormat);
        }

        function addSequenceSearch() {
            $(divID + " .sequenceHeader").append('<input class=\"inputSearchSeq form-control pull-right\" type=\"text\" style=\"width:40%;margin-top:3px;\" placeholder=\"Search in sequence.. (Regex supported)\">');
            sequenceSearch();

        }

        function sequenceSearch() {
            $(divID + " .inputSearchSeq").keyup(function () {
                var text = $(this).val();
                if (text !== "") {
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
                    $(divID + " .fastaSeq").html(seqInit);
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
            var options = sequenceOptions;
            options.charsPerLine = selection.value;
            self.render(divID, options);
        }

        function addToolbar() {
            var listOfCharsPerLine = ["50", "60", "70", "80", "90", "100"];
            var source = "<form class=\"form-inline\" role=\"form\">" +
                "<div class=\"sequenceToolbar row\" style=\"margin-bottom:15px;\">" +
                "<div class=\"input-group\" style=\"margin-left:20px;\"> <span class=\"input-group-addon\">Char per line</i></span>" +

                "<select class=\"CPLChoice form-control\" style=\"border-top-left-radius: 0px;border-bottom-left-radius: 0px;\">" +
                "<option>Select</option>" +
                "{{#each CPL}}<option value={{this}}>{{this}}</option>{{/each}}" +
                "</select>" +
                "</div>" +
                "</div>" +
                "</form>";
            var template = Handlebars.compile(source);
            var html = template({
                "CPL": listOfCharsPerLine
            });
            $(divID + " .sequenceBody").prepend(html);
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
