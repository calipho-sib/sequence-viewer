var simpleRender;
var highlightCode;
var coverageCode;

var executeCode = function (outputDiv, mirrorCode) {
    var code = mirrorCode.getValue();
    eval(code);
    $(outputDiv).animate({opacity: "100"}, 2000);
};

window.onload = function () {
    simpleRender = CodeMirror.fromTextArea(code1, {
        mode: "javascript",
        lineNumbers: true,
        lineWrapping: true
    });
    highlightCode = CodeMirror.fromTextArea(code2, {
        mode: "javascript",
        lineNumbers: true,
        lineWrapping: true
    });
    coverageCode = CodeMirror.fromTextArea(code3, {
        mode: "javascript",
        lineNumbers: true,
        lineWrapping: true
    });
    $(function () {
        executeCode("#protein-sequence-viewer1", simpleRender);
        executeCode("#protein-sequence-viewer2", highlightCode);
        executeCode("#protein-sequence-viewer3", coverageCode);
    });
};


//    $(function () {

// For the example

// Classic display of the sequence
//        var seq1 = new Sequence('MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN' +
//        'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
// You can add some rendering options
//        seq1.render('#protein-sequence-viewer', {
//                    'showLineNumbers': true,
//                    'wrapAminoAcids': true,
//                    'charsPerLine': 50
//                }
//        );

//        var myCodeMirror = CodeMirror($("#highlightCode")[0], {
//            value: "var seq2 = new Sequence('MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEAL" +
//            "YLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');\n" +
//            "seq2.render('#protein-sequence-viewer2');\n" +
//            "seq2.selection(20, 43, 'red');",
//            mode: "javascript"
//        });


// Display the sequence with a part highlighted
//        var seq2 = new Sequence('MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
//        seq2.render('#protein-sequence-viewer2');
//        seq2.selection(20, 43, 'red');


// Display the sequence with coverage and legend
//        var seq3 = new Sequence('MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
//        seq3.render('#protein-sequence-viewer3');
//        //Coverage list
//        var dataCoverage = [
//            {start: 0, end: 25, color: "black", underscore: false},
//            {start: 25, end: 47, color: "#ff0000", underscore: false},
//            {start: 47, end: 54, color: "#ff0000", underscore: true},
//            {start: 54, end: 55, color: "#ff0000", underscore: false},
//            {start: 55, end: 56, color: "black", underscore: false},
//            {start: 56, end: 89, color: "#69CC33", underscore: false},
//            {start: 89, end: 90, color: "black", underscore: false},
//            {start: 90, end: 110, color: "#ff0000", underscore: false}
//        ];
//        //IMPORTANT : You need to be sure the the Coverage array is sorted before drawing
////        ExempleSequenceCoverage.sort(function (a, b) {
////            return a.start - b.start;
////        });
//        seq3.coverage(dataCoverage);
//        //Legend
//        var ExempleLegend = [{
//            name: "Mature Protein",
//            color: "#ff0000",
//            underscore: false
//        }, {name: "Proteotypic peptide", color: "#69CC33", underscore: false}, {
//            name: "Synthetic peptide",
//            color: "#fff",
//            underscore: true
//        }];
//        seq3.addLegend(ExempleLegend);
//
//
//    });
