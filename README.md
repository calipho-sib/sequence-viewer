#Sequence viewer
The sequence viewer is a super easy javascript library to use in order to draw a protein sequence in a readable way.
![Sequence viewer](/assets/sequence-viewer.png)

#How to run

1) Include the library using bower or simply by including the javascript sequence-viewer.js
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
seq.render('sequence-viewer')
```
4) Et voila!

![Sequence viewer](/assets/sequence-viewer.png)


Note: that if you choose the later approach you should also include the dependencies, jquery,handlebars and bootstrap.min.css

Check out this page for a better understanding of how to use the sequence viewer and its possibilities :
* http://calipho-sib.github.io/sequence-viewer/demo/


# Options
* Line numbers
* Column size
* Highlight
* Coverage
* Labels text and color


