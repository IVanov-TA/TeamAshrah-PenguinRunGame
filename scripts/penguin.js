window.onload = function() {
    'use strict';
    var OUTER_HEALTH_BAR_WIDTH = 32,
        OUTER_HEALTH_BAR_HEIGHT = 6,
        INNER_HEALTH_BAR_HEIGHT = 4,
        HEALTH_BAR_RADIUS = 1,
        damage = 3,
        initialHealth = 30;

    var gameboardCenter = 500,
        gameboardHeight = 400,
        speed = 1,
        score = 0,
        xNewPosition = 0,
        difficulty = 5,
        obstacles = [];


    // starts the background loop music
    activeBackgroundSound();

    var paper = Raphael(10, 10, 980, 500);
    var track = paper.path('M' + (gameboardCenter - 50) + ' 100 h 100 l ' +
        gameboardHeight + ' ' + gameboardHeight + ' h-' +
        (2 * gameboardHeight + 100) + ' l ' + gameboardHeight + ' ' +
        (-gameboardHeight) + ' Z').attr({
        'stroke': '#99FFFF',
        'fill': '#CCFFFF'
    });

    // game over windows
    var GAME_OVER_WIDTH = 400,
        GAME_OVER_HEIGHT = 400,
        GAME_OVER_POS_X = paper.width / 2 - GAME_OVER_WIDTH / 2,
        GAME_OVER_POS_Y = paper.height / 2 - GAME_OVER_HEIGHT / 2,
        GAME_OVER_RADIOUS = 20;


    var img = paper.image('pics/gameOver.png',
        GAME_OVER_POS_X,
        GAME_OVER_POS_Y,
        GAME_OVER_WIDTH,
        GAME_OVER_HEIGHT);
    img.hide();

    document.getElementsByTagName("body")[0].addEventListener("keydown", pressKey, false);
    document.getElementsByTagName("body")[0].addEventListener("keyup", releaseKey, false);

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
        x3 = (x - gameboardCenter + rectW / 2) /
            (y - 50) * (y - 50 + rectH) + gameboardCenter;
        y3 = y2 + rectH;
        x4 = (x - gameboardCenter - rectW / 2) / (y - 50) *
            (y - 50 + rectH) + gameboardCenter;
        var path = 'M' + x1 + ' ' + y1 + ' H ' +
            x2 + ' L ' + x3 + ' ' + y3 + ' H ' + x4 + ' z';
        var rect = paper.path(path).attr({
            'stroke': '#99FFFF',
            'fill': 'blue',
            'stroke-width': 2
        })
        rect.myY = 100;
        return rect;
    }

    function run() {
        generateNewObstacles();
        moveObstacles();
        penguin.walk();
        updateHealth();
        if (++score % 10 === 0) scoreDraw();
        if (initialHealth > 0) {
            window.requestAnimationFrame(run);
        } else {
            //            hideObsticales();
            penguin.hide();
            img.show();
            img.toFront()
            gameOverSound();
        }
    }

    function hideObsticales() {
        while (obstacles.length) {
            obstacles[0].remove;
            obstacles.unshift;
        }
    }

    function generateNewObstacles() {
        if (!parseInt(Math.random() * 200 / difficulty / speed)) {
            var xPos = Math.random() * 80 + 460;
            var obstacle = makeRect(xPos, 100);
            obstacle.hasPenguinInside = false;
            obstacles.push(obstacle);
        }
        return obstacle;
    }

    function moveObstacles() {
        var transformArr = ['s ', 0, ' ', 0, ' ', gameboardCenter, ' 50'];
        for (var i = 0; i < obstacles.length; i++) {
            var step = obstacles[i].myY / 100;
            transformArr[1] = step;
            transformArr[3] = step;
            obstacles[i].transform(transformArr.join(''));
            if (obstacles[i].myY > penguin.position.y && !obstacles[i].hasPenguinInside) {
                obstacles[i].hasPenguinInside = checkCollision(obstacles[i]);
                if (obstacles[i].hasPenguinInside) {
                    initialHealth -= damage;
                    console.log('Fall')
                }
            }

            obstacles[i].myY = obstacles[i].myY + step * speed;
            if (obstacles[i].myY > gameboardHeight + 450) { // this constant is not correct at all!!
                obstacles[i].remove();
                obstacles.splice(i, 1);
            }

            penguin.toFront();
        }
    }

    function checkCollision(currentObstacle) {
        var bbox = currentObstacle.getBBox(false);
        var hitted = (!penguin.inFly &&
            penguin.position.x > bbox.x &&
            penguin.position.x < bbox.x2 &&
            penguin.position.y > bbox.y &&
            penguin.position.y < bbox.y2);
        if (hitted) {
            hittedSound();
        }

        return hitted;
    }

    function makePenguin() {
        var position = {
            x: gameboardCenter,
            y: gameboardHeight - 50
        };
        var bodyPathStr = "M0,0C-19,15,-28,29,-38,45C-76,57,-105,104,-99,169C-189,225,-220,283,-92,249C-80,458,173,383,124,220C266,140,186,130,102,139C86,68,30,35,-19,41C-19,28,-7,15,0,1C0,1,0,0,0,0";
        var jumpingBodyPathStr = "M0,0C-19,15,-28,29,-38,45C-76,57,-105,104,-99,169C-489,125,-220,283,-92,249C-80,458,173,383,124,220C566,40,186,130,102,139C86,68,30,35,-19,41C-19,28,-7,15,0,1C0,1,0,0,0,0";

        var bodyPath = Raphael.transformPath(bodyPathStr, 't -13 -205 s 0.1 0.1 r10');
        var jumpingBodyPath = Raphael.transformPath(jumpingBodyPathStr, 't -13 -210 s 0.1 0.1 r10');

        var legPathStr = "M0,0C0,0,-35,1,-35,1C-35,1,-61,-10,-61,-10C-61,-10,-82,17,-82,17C-82,17,-104,25,-104,25C-25,79,11,72,1,1C1,1,0,0,0,0"

        var leftLegPath = Raphael.transformPath(legPathStr, 't 42 -25 s 0.1 0.1');
        var rightLegPath = Raphael.transformPath(legPathStr, 't 57 -25 s 0.1 0.1');


        var legTransform = -2;
        var legMovementDirection = 0.5;
        var jumpLen = 0;


        function walk() {
            penguin.position.x += penguin.step;
            if (penguin.position.x < 220) {
                penguin.position.x = 220;
                penguin.step = 0;
            }
            if (penguin.position.x > 780) {
                penguin.position.x = 780
                penguin.step = 0;
            }

            penguin[0].transform('T' + ' ' + penguin.position.x + ' ' + (penguin.position.y + legTransform));
            penguin[1].transform('T' + ' ' + penguin.position.x + ' ' + (penguin.position.y - legTransform));
            if (jumpLen > -50) {
                if (jumpLen === 1) {
                    penguin[2].attr({
                        path: bodyPath
                    });
                    penguin.inFly = false;
                }
                jumpLen--;
            }
            penguin[2].transform('T' + ' ' + penguin.position.x +
                ' ' + penguin.position.y + ' R ' + legTransform * 5);

            // healthBar moving
            var healthBarX = penguin.position.x - 15,
                healthbarY = penguin.position.y - 50;

            penguin[3].transform('T' + ' ' + healthBarX + ' ' + healthbarY);
            penguin[4].transform('T' + ' ' + healthBarX + ' ' + healthbarY);

            legTransform += legMovementDirection;
            if (legTransform > 2 || legTransform < -2) {
                legMovementDirection = -legMovementDirection;
            };
        }

        function jump() {
            if (jumpLen > -49) {
                return;
            }
            // enable jump sound of the penguin
            jumpSound();
            penguin[2].attr({
                path: jumpingBodyPath
            });
            jumpLen = 30;
            penguin.inFly = true;
        }

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
        penguin.position = position;
        penguin.walk = walk;
        penguin.jump = jump;
        penguin.step = 0;

        // [pinguin healthbar]
        var outerRect = paper.rect(0, 0,
            OUTER_HEALTH_BAR_WIDTH, OUTER_HEALTH_BAR_HEIGHT, HEALTH_BAR_RADIUS);
        outerRect.attr({
            fill: '#FF1515'
        });

        // inner rect
        var innerRect = paper.rect(1, 1,
            initialHealth, INNER_HEALTH_BAR_HEIGHT, HEALTH_BAR_RADIUS);
        innerRect.attr({
            fill: '#00FF00',
            stroke: 'none'
        });

        penguin.push(outerRect);
        penguin.push(innerRect);

        penguin.inFly = false;

        penguin.walk();
        return penguin;
    }


    function pressKey(button) {
        switch (button.keyCode) {
            case 37:
                penguin.step = -speed * 5;
                break;
            case 39:
                penguin.step = speed * 5;
                break;
            case 32:
                penguin.jump();
                button.preventDefault();
                break;
        }
    }

    function releaseKey(button) {
        switch (button.keyCode) {
            case 37:
                penguin.step = 0;
                break;
            case 39:
                penguin.step = 0;
                break;
        }
    }

    function scoreDraw() {
        paper.rect(0, 10, 100, 20)
            .attr({
                'fill': '#CCFFFF',
                'stroke': 'darkblue',
                'stroke-width': 4
            })
        paper.text(40, 20, 'SCORE: ' + score).attr({
            'fill': 'darkblue',
        });
        if (score % 100 === 0) speed += 0.2; // CHANEGE 100 WITH BIGGER NUMBER FOR NORMAL PLAY :)
    }

    function updateHealth() {
        penguin[4].attr({
            width: initialHealth
        })
    }

}