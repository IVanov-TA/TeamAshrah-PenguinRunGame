/// <reference path="E:\Telerik\Java Script 2 DOM and UL\Teamwork\BackGround\BackGround\raphael-min.js" />
var paper = Raphael(0, 10, 1015, 550);

function day(){
paper.clear();

var sky = paper.rect(10, 10, 1000, 492)
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
            }, 10000)
        }
    }, 20000);

var sun = paper.circle(100, 75, 20)
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
            }, 10000)
        }
    }, 15000);



var mountains = paper.path('M 14 100 L 100 50 L 300 150 L 250 125 L 450 30 l 80 40 l 200 30 l-100 -14 l 150 -30 l 227 40 L 1007 499 L 14 499 z')
    .attr({
        stroke: '#99FFCC',
        'stroke-width': 2,
        'fill': '#9966FF',
    });
}


function night(){
//Night Background
paper.clear();
var sky = paper.rect(10, 10, 1000, 492)
    .attr({
        'fill': '#151B8D',
        'stroke': 'darkblue',
        'stroke-width': 4
    })
.animate({
    'fill': '#306EFF',
    callback: function () {
        sky.animate({
            fill: '#3BB9FF'
        }, 10000)
    }
}, 20000);

var moon = paper.circle(100, 75, 10)
.attr({
    cx: 100,
    fill: '#FFF8DC',
    stroke: '#FFF8DC'
})
.animate({
    cx: 550,
    cy: 45,
    fill: '#FFA62F ',
    stroke: '#FBBBB9',
    'stroke-width': 1,
    r: 20
})
    .animate({
        cx: 670,
        cy: 45,
        fill: '#FFCBA4 ',
        stroke: '#FFD801',
        'stroke-width': 2,
        r: 23,
        callback: function () {
            moon.animate({
                cx: 950,
                cy: 140,
                fill: '#FFE5B4 ',
                stroke: '#FAEBD7',
            }, 10000)
        }
    }, 15000);

var mountains = paper.path('M 14 100 L 100 50 L 300 150 L 250 125 L 450 30 l 80 40 l 200 30 l-100 -14 l 150 -30 l 227 40 L 1007 499 L 14 499 z')
    .attr({
        stroke: '#57FEFF',
        'stroke-width': 2,
        'fill': '#3090C7',
    });
	}
	
	var dayBoolean=false;
	day();
	
	var dayAndNight=setInterval(function(){
		if(dayBoolean){
			day();
			dayBoolean=false;
		}
		else{
			night();
			dayBoolean=true;
		}
	},20000);
