/////////////

function Sequence(sequence) {
    var sequence = sequence;
    var seqInit = "";
    var lineJump = 0;
    var divID;

    function renderHtml(divId, options){
        divID=divId;
        if (typeof options === 'undefined') {
            var options = {
            'showLineNumbers': true,
                'wrapAminoAcids': true,
                'charsPerLine': 30
            }
        }
        if(typeof options.charsPerLine === 'undefined') {
            lineJump=30;
        }
        else lineJump = options.charsPerLine;

        var sources = "<div style=\"border-bottom: 1px solid #E7EAEC;padding-bottom:5px;margin-bottom: 15px;\">" +
            "<div style=\"display:inline-block;\">" +
            "<span class=\"badge\" style=\"background:#C50063;color:white;padding:8px 5px;border-radius:70%;margin-right:10px;vertical-align:middle;\">{{sequenceLength}}</span>" +
            "</div><h4 style=\"display:inline-block;vertical-align:middle;\">Protein Sequence</h4>" +
            "<div class=\"pull-right\" style=\"margin-right:20px;font-style:italic;text-align: center;\"><span id=\"proteoCover\" style=\"font-size:18px;color:#69CC33;\"></span><br><span style=\"font-size:10px;font-weight:bold;\">proteotypicity</span></div></div>" +
            "<div style=\"margin-top: 5px;\">" +
            "<div id=\"scroller\" style=\"max-height:150px;overflow:auto;white-space: nowrap;overflow-x:hidden; padding-right:20px;margin-right:10px;s\"><div id=\"charNumbers\" style=\"font-family: monospace;font-size: 10px;display:inline-block;text-align:right; padding-right:5px; border-right:1px solid LightGray;\"></div>" +
            "<div id=\"fastaSeq\" display-option=\"" + lineJump + "\" style=\"font-family: monospace;font-size: 10px;display:inline-block;padding:5px;\">{{{sequence}}}</div></div>" +
            "<div style=\"margin-top: 10px;margin-left:15px;\"><div style=\"display:inline-block;background:#4A57D4;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;border-radius:50%;\"></div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\">non-proteotypic</p>" +
            "<div style=\"display:inline-block;background:#007800;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;border-radius:50%;\"></div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\">single proteotypic</p>" +
            "<div style=\"display:inline-block;background:#69CC33;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;border-radius:50%;\"></div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\">several proteotypic</p>" +
            "<div style=\"display:inline-block;background:#fff;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;border-radius:50%; border: 1px solid grey;text-align:center; line-height:0.8;\">_</div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\">synthetic</p></div>" +
            "</div>";

        var template = Handlebars.compile(sources);
        var html = template({
            "sequence": sequence,
            "sequenceLength": sequence.length
        });
        $(divId).html(html);
        //console.log($(divId + #fastaSeq').text());

        if(!(options.wrapAminoAcids === false))
            sequenceLayout(divId +" #fastaSeq");

        if(!(options.showLineNumbers === false))
            lineNumbers(divId +" #fastaSeq",divId +" #charNumbers");

        seqInit = $(divId +" #fastaSeq").html();
    }

    function highlighting (start,end, color, options){
        var positions = [start,end];
        var hlSeq = seqInit;
        positions[0]=positions[0]+~~(positions[0]/10)+4*(~~(positions[0]/lineJump));
        positions[1]=positions[1]+~~(positions[1]/10)+4*(~~(positions[1]/lineJump));
        var highlightColor=color;
        hlSeq = hlSeq.substring(0,positions[0])+
        "<span style=\"background:" + color + ";color:white;\">" +
        hlSeq.substring(positions[0],positions[1]) +
        "</span>" +
        hlSeq.substring(positions[1],hlSeq.length);
        $(divID +" #fastaSeq").html(hlSeq);
    }
    function applyAAFormating (list) {
        var datestart = new Date().getTime();
        var HashAA = [];
        var proteoCoverage=0;
        var jMin=0;
        var begin = 1;
        var subseqColor = "";
        var subseq_;
        for (var i=1;i<sequence.length+1;i++) {
            var naturalPep = 0;
            var syntheticPep = 0;
            var proteotypicPep = 0;

            for (var j=jMin;j<list.length;j++) {
                if (i >= list[j].position.first && i <= list[j].position.second) {
                    if (list[j].properties.natural) naturalPep += 1;
                    if (list[j].properties.synthetic) syntheticPep += 1;
                    if (list[j].properties.proteotypic) proteotypicPep += 1;
                }
                if (i > list[j].position.second) jMin=j;
                if (list[j].position.first > i) break;
            }
            var clr = "black";
            var underscore = false;
            if (syntheticPep > 0) underscore = true;
            if (naturalPep > 0) clr = "#4A57D4";
            if (proteotypicPep > 0) {
                proteoCoverage += 1;
                if (proteotypicPep === 1) clr = "#007800";
                else clr = "#00C500";
            }
            if (i === 1) {
                subseqColor = clr;
                subseq_=underscore;
            }
            if (!(clr === subseqColor && underscore === subseq_)) {
                HashAA.push({"start": begin-1, "end": i-1, "color": subseqColor, "underscore": subseq_});
                begin=i;
                subseqColor = clr;
                subseq_=underscore;
            }
            if (i === sequence.length) {
                HashAA.push({"start": begin-1, "end": i, "color": subseqColor, "underscore": subseq_});
            }

        }
        var intermediate = new Date().getTime();

        console.log('Time to execute AAproperties part (1600 before): ', (intermediate - datestart));
        proteoCoverage = ((proteoCoverage/sequence.length)*100).toFixed(2);
        $("#proteoCover").text(proteoCoverage + "%");
        return HashAA;
    }
    function coverage(HashAA,start, end){
        var jTranslation = function (i) {
            var j=i+~~(i/10)+4*(~~(i/lineJump));
            return j;
        };
        var timestart = new Date().getTime();
        if (!start) var start=0;
        if (!end) var end=0;
        var source = "";
        var pre ="";
        for (var i=0;i<HashAA.length;i++){
            if (HashAA[i].underscore) {
                pre = "<span style=\"text-decoration:underline;color:" + HashAA[i].color + ";\">";
                source+= pre;
            }
            else {
                pre = "<span style=\"color:" + HashAA[i].color + ";\">";
                source+= pre;
            }
            if (end) {
                if (start >= HashAA[i].start && start < HashAA[i].end && end >= HashAA[i].start && end < HashAA[i].end) {

                    source += seqInit.substring(jTranslation(HashAA[i].start), jTranslation(start)) + "<span id=\"peptideHighlighted\" style=\"background:#FFE5A3;\">" + seqInit.substring(jTranslation(start), jTranslation(end + 1));

                    source += "</span>" + seqInit.substring(jTranslation(end + 1), jTranslation(HashAA[i].end)) + "</span>";
                }
                else if (start >= HashAA[i].start && start < HashAA[i].end) {
                    source += seqInit.substring(jTranslation(HashAA[i].start), jTranslation(start)) + "</span><span id=\"peptideHighlighted\" style=\"background:#FFE5A3;\">"+ pre + seqInit.substring(jTranslation(start), jTranslation(HashAA[i].end)) + "</span>";
                }
                else if (end >= HashAA[i].start && end < HashAA[i].end) {
                    source += seqInit.substring(jTranslation(HashAA[i].start), jTranslation(end + 1)) + "</span></span>"+ pre + seqInit.substring(jTranslation(end+1), jTranslation(HashAA[i].end)) + "</span>";
                }
                else {
                    source += seqInit.substring(jTranslation(HashAA[i].start), jTranslation(HashAA[i].end)) + "</span>";
                }
            }
            else {
                source += seqInit.substring(jTranslation(HashAA[i].start), jTranslation(HashAA[i].end)) + "</span>";
            }
        }
        $(divID +" #fastaSeq").html(source);
        var timeend = new Date().getTime();

        console.log('Time to execute all: ', (timeend - timestart));
    }

    var lineNumbers = function(textAreaID,lineNumberID){
        var textContent = $(textAreaID).html().split("<br>");
        var NBC = parseInt($(textAreaID).attr("display-option"));
        var newTextContent = [];
        var charPerLine = 0;
        for (var i=0; i < textContent.length;i++){
            newTextContent.push((charPerLine + 1) + ("<br>"));
            charPerLine += NBC;
        }
        $(lineNumberID).html(newTextContent.join(""));

    };

    var sequenceLayout = function(textAreaID){

        var newLines = parseInt($(textAreaID).attr("display-option"));
        newLines = (newLines+(newLines/10)).toString();
        var seqFormat = $(textAreaID).html();
        seqFormat = seqFormat.toString().match(/.{1,10}/g).join(' ').match(new RegExp('.{1,'+newLines+'}','g')).join('<br>');

        $(textAreaID).html(seqFormat);
    };


    return {
        render:renderHtml,
        selection:highlighting,
        coverage:coverage,
        applyAAFormating:applyAAFormating
    }
}