
1) Include the library using bower or simple by including the javascript protein-sequence.js (note that if you choose the later approach you should also include the dependencies, jquery and handlebars)
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
![Sequence viewer](/assets/sequence-viewer.png)


Examples: 
* http://calipho-sib.github.io/sequence-viewer/demo?sequence=JKBJBDJA
* http://calipho-sib.github.io/sequence-viewer/demo?sequence=JKBJBDJA
* http://calipho-sib.github.io/sequence-viewer/demo?sequence=JKBJBDJA

# Options
* Line numbers
* Column size
* Labels text and color


