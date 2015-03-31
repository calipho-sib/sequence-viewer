/////////////

function Sequence(sequence) {
    var sequence = sequence;
    var seqInit = "";
    var lineJump = 0;

    function renderHtml(divId, options){

        if(typeof options.charsPerLine === 'undefined') {
            lineJump=30;
        }
        else lineJump = options.charsPerLine;

        var sources = "<div style=\"border-bottom: 1px solid #E7EAEC;padding-bottom:5px;margin-bottom: 15px;\">" +
            "<div style=\"display:inline-block;\">" +
            "<span class=\"badge\" style=\"background:#C50063;color:white;padding:8px 5px;border-radius:70%;margin-right:10px;vertical-align:middle;\">{{sequenceLength}}</span>" +
            "</div><h4 style=\"display:inline-block;vertical-align:middle;\">Protein Sequence</h4></div>" +
            "<div style=\"margin-top: 5px;\">" +
            "<div id=\"scroller\" style=\"max-height:150px;overflow:auto;white-space: nowrap;overflow-x:hidden; padding-right:20px;margin-right:10px;s\"><div id=\"charNumbers\" style=\"font-family: monospace;font-size: 11px;display:inline-block;text-align:right; padding-right:5px; border-right:1px solid LightGray;\"></div>" +
            "<div id=\"fastaSeq\" display-option=\"" + lineJump + "\" style=\"font-family: monospace;font-size: 11px;display:inline-block;padding:5px;\">{{{sequence}}}</div></div>" +
            "<div style=\"margin-top: 10px;margin-left:15px;\"><div style=\"display:inline-block;background:#C50063;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;border-radius:50%;\"></div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\">single</p>" +
            "<div style=\"display:inline-block;background:#007800;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;border-radius:50%;\"></div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\">multiple</p>" +
            "<div style=\"display:inline-block;background:#69CC33;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;border-radius:50%;\"></div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\">proteotypic</p>" +
            "<div style=\"display:inline-block;background:#fff;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;border-radius:50%; border: 1px solid grey;text-align:center; line-height:0.8;\">_</div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\">synthetic</p></div>" +
            "</div>";

        var template = Handlebars.compile(sources);
        var html = template({
            "sequence": sequence,
            "sequenceLength": sequence.length
        });
        $(divId).html(html);

        if(!(options.wrapAminoAcids === false))
            sequenceLayout("#fastaSeq");

        if(!(options.showLineNumbers === false))
            lineNumbers("#fastaSeq","#charNumbers");

        seqInit = $("#fastaSeq").html();
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
        $("#fastaSeq").html(hlSeq);
    }

    function coverage(list,start, end){
        if (!start) var start=0;
        if (!end) var end=0;
        var HashAA = [];
        for (var i=0;i<sequence.length;i++) {
            var properties = [];
            for (var j=0;j<list.length;j++) {
                if (i >= list[j].position.first && i <= list[j].position.second) {
                    properties.push(list[j].properties.join(""));
                }
            }
            var clr = "black";
            var underscore = false;
            if (properties.length > 0) {
                properties=properties.join("");
                if (properties.match("synthetic")) underscore = true;
                if (properties.match("natural")) {
                    clr = "#C50063";
                }
                if (properties.match("proteotypic")) {
                    if (properties.match(/proteotypic/gi).length === 1) clr = "#007800";
                    else clr = "#00C500";
                }

            }
            HashAA.push({"id": i, "property": properties, "color": clr, "underscore": underscore});
        }

        var HLon = false;
        var HLcut = false;
        var initStart=0;
        var init="";
        var initUnder=false;
        var source = "<span>";
        var q=0;
        for (var i=0;i<HashAA.length;i++){
            j=i+~~(i/10)+4*(~~(i/lineJump));
            if (i === end && i!==0) {
                source+= seqInit.substring(initStart, j) +"</span>";
                HLon=false;
                initStart=j;
            }
            if (HLon === true && i !== (HashAA.length -1)){
                if (HashAA[i+1].color !== init || HashAA[i+1].underscore !== initUnder) {
                    source+=seqInit.substring(initStart, j) +"</span>";
                    HLcut=true;
                    initStart=j;
                }
            }
            if (i === (HashAA.length -1)) {
                if (initUnder === true && HLon === true) {
                    source += seqInit.substring(initStart, seqInit.length) + "</span></span></span>";
                }
                else if (initUnder === true) {
                    source += seqInit.substring(initStart, seqInit.length) + "</span></span>";
                }
                else {
                    source += seqInit.substring(initStart, seqInit.length) + "</span>";
                }
            }
            else if (HashAA[i+1].color !== init && HashAA[i+1].underscore == initUnder) {
                init=HashAA[i+1].color;
                if (initUnder === true) {
                    source += seqInit.substring(initStart, j) + "</span></span><span style=\"color:" + HashAA[i + 1].color + ";\"><span style=\"text-decoration:underline;\">";
                }
                else {
                    source += seqInit.substring(initStart, j) + "</span><span style=\"color:" + HashAA[i + 1].color + ";\">";
                }
                initStart=j;
            }
            else if (HashAA[i+1].color !== init && HashAA[i+1].underscore !== initUnder) {
                init=HashAA[i+1].color;
                initUnder=HashAA[i+1].underscore;
                if (initUnder === true) {
                    source += seqInit.substring(initStart, j) + "</span><span style=\"color:" + HashAA[i + 1].color + ";\"><span style=\"text-decoration:underline;\">";
                }
                else{
                    source += seqInit.substring(initStart, j) + "</span></span><span style=\"color:" + HashAA[i + 1].color + ";\">";
                }
                initStart=j;
            }
            else if (HashAA[i+1].color == init && HashAA[i+1].underscore !== initUnder) {
                init=HashAA[i+1].color;
                initUnder=HashAA[i+1].underscore;
                if (initUnder === true) {
                    source += seqInit.substring(initStart,j) + "<span style=\"text-decoration:underline;\">";
                }
                else{
                    source += seqInit.substring(initStart,j) + "</span>";
                }
                initStart=j;
            }
            if (HLcut===true) {
                source+= "<span style=\"background:#FFE5A3;\">";
                HLcut=false;
            }
            if (i+1 === start && i!==end) {
                source+= seqInit.substring(initStart, j) +"<span id=\"peptideHighlighted\" style=\"background:#FFE5A3;\">";
                HLon=true;
                initStart = j;
            }
        }
        $("#fastaSeq").html(source);

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
        coverage:coverage
    }
}