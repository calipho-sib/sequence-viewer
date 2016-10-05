// Display the sequence with coverage and legend
var Sequence = require("sequence-viewer");
var seq3 = new Sequence('MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
seq3.render('#seqView1',{title:"Genomic Variants of XYZ gene"});

//click function for highlighted element
var onclickFun = function(e) {
    console.log("Region clicked");
}
//Coverage list
var exempleSequenceCoverage = [
    {start: 28, end: 50, color: "black", underscore: false, bgcolor: "#00ff00", tooltip: "Substitution HLCG->EAD", onclick: onclickFun},
    {start: 65, end: 67, color: "black", underscore: false, bgcolor: "#ff0000", tooltip: "Deletion VE"},
];
seq3.coverage(exempleSequenceCoverage);
// for coverage + highlight :
// seq3.coverage(exempleSequenceCoverage, start, end, highlightColor);

//Define Legend and color codes
var exempleLegend = [
    {name: "Clickable region",color: "#00ff00"},
    {name: "Another region",color: "#ff0000"}
];
seq3.addLegend(exempleLegend);

