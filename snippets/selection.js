
// Display the sequence with a part highlighted
var Sequence = require("sequence-viewer");
var seq2 = new Sequence('MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
seq2.render('#seqView1');
seq2.selection(20, 43, 'red');