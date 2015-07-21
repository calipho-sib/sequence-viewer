var Sequence = require("sequence-viewer");
var seq1= new Sequence('MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
var divi = "#" + $(rootDiv).attr("id");
seq1.render(divi, {
    'showLineNumbers': true,
    'wrapAminoAcids': true,
    'charsPerLine': 30,
    'search': true,
    'toolbar': true
});
