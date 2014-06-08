window.onload = function() {
    'use strict';
    var gameboardCenter = 500;
    var gameboardHeight = 400;
    var obstacleInitialWidth = 20;
    var speed = 1;
    var xNewPosition = 0;
    var difficulty = 5;
    var obstacles = [];
    var legTransform = -2;
    var legMovementDirection = 0.25;
    var bodyPath = "M0,0C-19,15,-28,29,-38,45C-76,57,-105,104,-99,169C-189,225,-220,283,-92,249C-80,458,173,383,124,220C266,140,186,130,102,139C86,68,30,35,-19,41C-19,28,-7,15,0,1C0,1,0,0,0,0";
    var legPath = "M0,0C0,0,-35,1,-35,1C-35,1,-61,-10,-61,-10C-61,-10,-82,17,-82,17C-82,17,-104,25,-104,25C-25,79,11,72,1,1C1,1,0,0,0,0"
    bodyPath = Raphael.transformPath(bodyPath, 't 500,200 s 0.1 0.1 r10');
    var leftLegPath = Raphael.transformPath(legPath, 't 555,380 s 0.1 0.1');
    var rightLegPath = Raphael.transformPath(legPath, 't 570,380 s 0.1 0.1');


    /*    var bgSound = new Audio('sounds/background.mp3');
    bgSound.loop = true;
    bgSound.volume = 0.50;
    bgSound.play(); */

    var paper = Raphael(10, 10, 1000, 800);
    var track = paper.path('M' + (gameboardCenter - 50) + ' 100 h 100 l ' + gameboardHeight + ' ' + gameboardHeight +
        ' h-' + (2 * gameboardHeight + 100) + ' l ' + gameboardHeight + ' ' + (-gameboardHeight) + ' Z').attr({
        //        'stroke': 'black'
        'stroke': '#99FFFF',
        'fill': '#CCFFFF'

    });
    var penguin = makePenguin();
    run();

    function makeRect(x, y) {
        var rectW = 20,
            rectH = 4,
            angle,
            x1, y1, x2, y2, x3, y3, x4, y4;

        x1 = x - rectW / 2;
        y1 = y;
        x2 = x1 + rectW;
        y2 = y;
        x3 = (x - gameboardCenter + rectW / 2) / (y - 50) * (y - 50 + rectH) + gameboardCenter;
        y3 = y2 + rectH;
        x4 = (x - gameboardCenter - rectW / 2) / (y - 50) * (y - 50 + rectH) + gameboardCenter;
        var path = 'M' + x1 + ' ' + y1 + ' H ' + x2 + ' L ' + x3 + ' ' + y3 + ' H ' + x4 + ' z';
        var rect = paper.path(path).attr({
            'stroke': '#99FFFF',
            'fill': 'blue',
            'stroke-width': 2

            //            'stroke': 'blue',
            //            'fill': 'blue'
        })
        rect.myY = 100;
        return rect;
    }

    function run() {
        generateNewObstacles();
        moveObstacles();
        penguin[0].transform('T' + ' ' + xNewPosition * speed * 3 + ' ' + legTransform);
        penguin[1].transform('T' + ' ' + xNewPosition * speed * 3 + ' ' + (-legTransform));
        penguin[2].transform('R ' + legTransform * 5);
        legTransform += legMovementDirection;
        //console.log(legTransform);
        if (legTransform > 2 || legTransform < -2) {
            legMovementDirection = -legMovementDirection;
        };
        document.getElementsByTagName("body")[0].addEventListener("keydown", getKey, false);
        window.requestAnimationFrame(run);
    }

    function generateNewObstacles() {
        if (!parseInt(Math.random() * 500 / difficulty / speed)) {
            var xPos = Math.random() * 80 + 460;
            //xPos = 455;
            //xPos = 520;
            var obstacle = makeRect(xPos, 100);
            obstacles.push(obstacle);
        }
        return obstacle;
    }

    function moveObstacles() {
        for (var i = 0; i < obstacles.length; i++) {
            var transformString = 't ' + (obstacles[i].myY + 50) + ' ' + obstacles[i].myY - 50 +
                ' s ' + obstacles[i].myY / 100 + ' ' + obstacles[i].myY / 100 + ' 500 50 ';
            obstacles[i].transform(transformString);
            obstacles[i].myY = obstacles[i].myY + obstacles[i].myY / 100 * speed;
            if (obstacles[i].myY > gameboardCenter + gameboardHeight) {
                obstacles[i].remove();
                obstacles.splice(i, 1);
            }
            penguin.toFront();
        }
    }

    /*    function makePenguin() {
        var penguin = paper.set();
        var path = 'm 130,294 -35,1 -26,-11 -21,27 -22,8 c 79,54 115,47 105,-24 z';
        var rightLeg = paper.path(path).attr({
            'stroke': '#ffcc00',
            'fill': '#ffcc00'
        })

        path = 'm 20,343 -35,1 -26,-11 -21,27 -22,8 c 79,54 115,47 105,-24 z';
        var leftLeg = paper.path(path).attr({
            'stroke': '#ffcc00',
            'fill': '#ffcc00'
        })

        path = 'm 0,0 c -19,15 -28,29 -38,45 -38,12 -67,59 -61,124 -90,56 -121,114 7,80 12,209 265,134 216,-29 142,-80 62,-90 -22,-81 -16,-71 -72,-104 -121,-98 0,-13 12,-26 19,-40 z';
        var body = paper.path(path).attr({
            'stroke': '#000000',
            'fill': '#000000'
        })
        body.node.id = 'body';
        penguin.push(leftLeg);
        penguin.push(rightLeg);
        penguin.push(body);
        penguin.transform('T 100 300 s 0.1 0.1 500 100');
        penguin.toFront();
        return penguin;
    } */

    function makePenguin() {
        var penguin = paper.set();
        var rightLeg = paper.path(rightLegPath).attr({
            'stroke': '#ffcc00',
            'fill': '#ffcc00'
        })
        var leftLeg = paper.path(leftLegPath).attr({
            'stroke': '#ffcc00',
            'fill': '#ffcc00'
        })
        var body = paper.path(bodyPath).attr({
            'stroke': '#000000',
            'fill': '#000000'
        })
        penguin.push(leftLeg);
        penguin.push(rightLeg);
        penguin.push(body);
        return penguin;
    }

    function getKey(button) {
        switch (button.keyCode) {
            case 37:
                xNewPosition += -1;
                break;
            case 39:
                xNewPosition += 1;
                break;
        }
    }
}

//penguin[0].attrs.path[1]

/*
        var path = [
            ["M", x, y],
            ["C", ax, ay, bx, by, zx, zy]
        ],
            path2 = [
                ["M", x, y],
                ["L", ax, ay],
                ["M", bx, by],
                ["L", zx, zy]
            ],

            curve = r.path(path);
            controls = r.set(
                r.path(path2),
                r.circle(x, y, 5),
                r.circle(ax, ay, 5),
                r.circle(bx, by, 5),
                r.circle(zx, zy, 5)
            );

            curve.attr({
            path: path
            });
            
            controls[0].attr({
                path: path2
            });
*/