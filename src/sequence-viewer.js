
    /////////////
 
    function Sequence(sequence) {
        var sequence = sequence;
 
        function renderHtml(divId){
 
 
            var sources = "<div><h4>Protein Sequence ({{sequenceLength}})</h4></div>" +
                "<div style=\"margin-top: 5px;\">" +
                "<div id=\"charNumbers\" style=\"font-family: monospace;font-size: 12px;display:inline-block;text-align:right; padding-right:5px; border-right:1px solid LightGray;\"></div>" +
                "<div id=\"fastaSeq\" display-option=\"30\" style=\"font-family: monospace;font-size: 12px;display:inline-block;padding:5px;\">{{{sequence}}}</div>" +
                "<div><div style=\"display:inline-block;background:#C50063;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;\" class=\"img-circle\"></div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\"> natural</p>" +
                "<div style=\"display:inline-block;background:#F83919;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;\" class=\"img-circle\"></div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\"> synthetic</p>" +
                "<div style=\"display:inline-block;background:#69CC33;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;\" class=\"img-circle\"></div><p style=\"display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;\"> proteotypic</p></div>" +
                "</div>";
 
            var template = Handlebars.compile(sources);
            var html = template({
                "sequence": sequence,
                "sequenceLength": sequence.length
            });
            $(divId).append(html);
 
            sequenceLayout("#fastaSeq");
            charNumberTwo("#fastaSeq","#charNumbers");
 
 
        }
 
        var charNumberTwo = function(textAreaID,lineNumberID){
            console.log(textAreaID);
            var textContent = $(textAreaID).html().split("<br>");
            var NBC = parseInt($(textAreaID).attr("display-option"));
            console.log(NBC);
            var newTextContent = [];
            var charPerLine = 0;
            console.log(textContent);
            for (var i=0; i < textContent.length;i++){
                newTextContent.push((charPerLine + 1) + ("<br>"));
                charPerLine += NBC;
            }
            console.log(newTextContent);
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
            render:renderHtml
        }
    }
 
 
 
