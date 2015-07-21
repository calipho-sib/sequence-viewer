var Sequence = require("sequence-viewer");
var seq1= new Sequence('MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
seq1.render("#seqView1", {
    'showLineNumbers': true,
    'wrapAminoAcids': true,
    'charsPerLine': 30,
    'search': true,
    'toolbar': true
});