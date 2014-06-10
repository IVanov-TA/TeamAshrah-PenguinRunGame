/// <reference path="E:\Telerik\Java Script 2 DOM and UL\Teamwork\BackGround\BackGround\raphael-min.js" />
var paper2 = Raphael(0, 10, 1015, 550);
var sky = paper2.rect(10, 10, 1000, 492)
    .attr({
        'fill': '#FFFFCC',
        'stroke': 'darkblue',
        'stroke-width': 4
    })
    .animate({
        'fill': '#FFFF00',
        callback: function() {
            sky.animate({
                fill: '#6633CC'
            }, 20000)
        }
    }, 20000);

var sun = paper2.circle(100, 75, 20)
    .attr({
        cx: 100,
        fill: 'yellow',
        stroke: 'orange'
    })
    .animate({
        cx: 550,
        cy: 45,
        fill: '#FF6600 ',
        stroke: '#FBBBB9',
        'stroke-width': 1,
        r: 30
    })
    .animate({
        cx: 670,
        cy: 45,
        fill: '#FAAFBE ',
        stroke: '#FF6666',
        'stroke-width': 2,
        r: 32,
        callback: function() {
            sun.animate({
                cx: 950,
                cy: 140,
                fill: '#FF6600 ',
                stroke: '#FF6666',
            }, 23000)
        }
    }, 35000);



var mountains = paper2.path('M 14 100 L 100 50 L 300 150 L 250 125 L 450 30 l 80 40 l 200 30 l-100 -14 l 150 -30 l 227 40 L 1007 499 L 14 499 z')
    .attr({
        stroke: '#99FFCC',
        'stroke-width': 2,
        'fill': '#9966FF',
    });

//paper2.setStart();
//var ice = paper2.rect(60, 280, 30, 15);
//var ice1 = paper2.path('M 110 280 L 130 280 L 150 230');
//var ice2 = paper2.path('M 130 300 L 220 290 L 200 320');
//var ice3 = paper2.path('M 30 250 L 80 240 L 100 280');
//var lake = paper2.ellipse(100, 330, 40, 15);
//    var set = paper2.setFinish()
//.attr({
//    stroke: '#99FFCC',
//    'stroke-width': 2,
//    'fill': '#CCFFFF',
//})