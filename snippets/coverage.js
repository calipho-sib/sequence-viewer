// Display the sequence with coverage and legend
var Sequence = require("sequence-viewer");
var seq3 = new Sequence('MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
seq3.render('#seqView1');
seq3.onMouseSelection(function(elem){
        console.log(elem.detail);
    }
);
seq3.onSubpartSelected(function(elem){
        console.log(elem.detail);
    }
);
//@biojs-instance=seq3
seq3.onAll(function(name,data){
    console.log(arguments);
});

//Coverage list
var exempleSequenceCoverage = [
    {start: 0, end: 25, color: "black", underscore: false},
    {start: 25, end: 47, color: "#ff0000", underscore: false},
    {start: 47, end: 54, color: "#ff0000", underscore: true},
    {start: 54, end: 55, color: "#ff0000", underscore: false},
    {start: 55, end: 56, color: "black", underscore: false},
    {start: 56, end: 89, color: "#69CC33", underscore: false},
    {start: 89, end: 90, color: "black", underscore: false},
    {start: 90, end: 110, color: "#ff0000", underscore: false}
];
seq3.coverage(exempleSequenceCoverage);
// for coverage + highlight :
// seq3.coverage(exempleSequenceCoverage, start, end, highlightColor);

//Define Legend and color codes
var exempleLegend = [
    {name: "Mature Protein", color: "#ff0000", underscore: false},
    {name: "Proteotypic peptide", color: "#69CC33", underscore: false},
    {name: "Synthetic peptide",color: "#fff",underscore: true}
];
seq3.addLegend(exempleLegend);