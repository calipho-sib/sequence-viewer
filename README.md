
1) Include the library
```
bower install sequence-viewer
```
2) Specify a div in your html
```
<div id="sequence-viewer"></div>
```

3) Create an instance of Sequence in javascript and apply the render method
```
var seq= new Sequence('MALWMRLLPLLALLALWGPGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN');
seq.render('#protein-sequence-viewer')
```
4) Et voila!

<div id="protein-sequence-viewer" class="row" style="width:300px;display:inline-block;height:250px;vertical-align:top;padding:15px 0px 10px 15px;margin-left:0px;border-top: 1px solid #eee;"><div><h4>Protein Sequence (110)</h4></div><div style="margin-top: 5px;"><div id="charNumbers" style="font-family: monospace;font-size: 12px;display:inline-block;text-align:right; padding-right:5px; border-right:1px solid LightGray;">1<br>31<br>61<br>91<br></div><div id="fastaSeq" display-option="30" style="font-family: monospace;font-size: 12px;display:inline-block;padding:5px;">MALWMRLLPL LALLALWGPD PAAAFVNQHL <br>CGSHLVEALY LVCGERGFFY TPKTRREAED <br>LQVGQVELGG GPGAGSLQPL ALEGSLQKRG <br>IVEQCCTSIC SLYQLENYCN</div><div><div style="display:inline-block;background:#C50063;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;" class="img-circle"></div><p style="display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;"> natural</p><div style="display:inline-block;background:#F83919;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;" class="img-circle"></div><p style="display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;"> synthetic</p><div style="display:inline-block;background:#69CC33;width:20px;height:20px;vertical-align:middle;margin:0px 5px 0px 10px;" class="img-circle"></div><p style="display:inline-block;font-weight:bold;font-size:11px;font-style:italic;margin:0;padding-top:3px;vertical-align:top;"> proteotypic</p></div></div></div>

Examples: 
* http://calipho-sib.github.io/sequence-viewer/demo?sequence=JKBJBDJA
* http://calipho-sib.github.io/sequence-viewer/demo?sequence=JKBJBDJA
* http://calipho-sib.github.io/sequence-viewer/demo?sequence=JKBJBDJA

# Options
* Line numbers
* Column size
* Labels text and color


