
// Display the sequence with a part highlighted
var Sequence = require("sequence-viewer");
var seq2 = new Sequence('MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
seq2.render('#seqView1');
seq2.onMouseSelection(function(elem){
        console.log(elem.detail);
    }
);
seq2.onSubpartSelected(function(elem){
        console.log(elem.detail);
    }
);
//@biojs-instance=seq2
seq2.onAll(function(name,data){
    console.log(arguments);
});
seq2.selection(20, 43, 'red');