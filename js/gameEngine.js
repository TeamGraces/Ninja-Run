/*globals $ window document */

function gameEngine() {
    const width = 924,
        height = 612,
        jumpingHeight = 0.23,
        distanceBetweenSpawningEnemies = 120,
        framesNumber = 10,
        backgroundSpeed = 9;

    //The main score
    let score = 0;

    let playerCanvas = document.getElementById('player-canvas'),
        playerContext = playerCanvas.getContext('2d'),
        playerImg = document.getElementById('ninja-sprite');

    //We select the span element witch is our score with class scoreValue
    let scoreSelector = document.getElementsByClassName('scoreValue')[0];

    playerCanvas.width = width;
    playerCanvas.height = height;

    let ninjaSprite = createSprite({
        spritesheet: playerImg,
        contex: playerContext,
        width: playerImg.width / framesNumber,
        height: playerImg.height,
        framesNumber: framesNumber,
        loopTickPerFrame: 3
    });

    let ninjaBody = createPhysicalObject({
        coordinates: {
            x: 10,
            y: height - ninjaSprite.height
        },
        defaultAcceleration: {
            x: 5,
            y: 5
        },
        speed: {
            x: 0,
            y: 0
        },
        width: ninjaSprite.width,
        height: ninjaSprite.height,
        isNinja: true
    });

    let ninjaJumpingImg = document.getElementById('ninja-jump-sprite');

    let ninjaJumpingSprite = createSprite({
        spritesheet: ninjaJumpingImg,
        contex: playerContext,
        width: ninjaJumpingImg.width / framesNumber,
        height: ninjaJumpingImg.height,
        framesNumber: framesNumber,
        loopTickPerFrame: 2
    });

    //Dead
    let playerDeadImg = document.getElementById('ninja-dead-sprite');

    let ninjaDeadSprite = createSprite({
        spritesheet: playerDeadImg,
        contex: playerContext,
        width: playerDeadImg.width / framesNumber,
        height: playerDeadImg.height,
        framesNumber: framesNumber,
        loopTickPerFrame: 3
    });

    document.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 37: // left
                if (ninjaBody.speed.x < 0) {
                    return;
                }

                ninjaBody.accelerate('x', -1);
                break;
            case 38: // up

                if (ninjaBody.coordinates.y < (height - ninjaBody.height)) {
                    return;
                }

                sounds.playJump();
                ninjaBody.accelerate('y', -1.5);
                break;
            case 39: // right
                if (ninjaBody.speed.x > 0) {
                    return;
                }

                ninjaBody.accelerate('x', 1);
                break;
            default:
                break;
        }
    });

    window.addEventListener('keyup', function(event) {
        if ((event.keyCode !== 37) && (event.keyCode !== 39)) {
            return;
        }
        ninjaBody.speed.x = 0;
    });


    function applyGravityY(physicalBody, gravity) {

        // checks if the ninja is on the ground
        if (physicalBody.coordinates.y === (height - physicalBody.height + 3.8)) {
            physicalBody.speed.y = 0;
            return;
        }

        if (physicalBody.coordinates.y > (height - physicalBody.height + 3.8)) {
            physicalBody.coordinates.y = height - physicalBody.height;
            physicalBody.speed.y = 0;
            return;
        }

        physicalBody.speed.y += gravity;

    }

    let background = createBackground({
        width: width,
        height: height,
        speedX: backgroundSpeed
    });

    let currentNinjaSprite = ninjaSprite;


    function gameLoop() {

        applyGravityY(ninjaBody, jumpingHeight);

        let lastNinjaCoordinates = ninjaBody.move();

        if ((ninjaBody.coordinates.y + ninjaBody.height) < height) {
            currentNinjaSprite = ninjaJumpingSprite;
        } else {
            currentNinjaSprite = ninjaSprite;
        }

        currentNinjaSprite.render(ninjaBody.coordinates, lastNinjaCoordinates);
        currentNinjaSprite.update();

        // update enemies
        for (let i = 0; i < enemies.length; i += 1) {
            //score 10 points for every passed ninja
            if (enemies[i].body.coordinates.x < ninjaBody.coordinates.x) {
                if ((ninjaBody.coordinates.x - enemies[i].body.coordinates.x) < 10 &&
                    (enemies[i].body.coordinates.y - ninjaBody.coordinates.y) > 2) {
                    score += 10;
                }
            }
            //change current score:
            scoreSelector.innerHTML = score;

            // removing enemies when they get out of the canvas
            if (enemies[i].body.coordinates.x < -enemies[i].body.width) {
                enemies.splice(i, 1);
                i -= 1;
                continue;
            }

            let lastEnemyCoordinates = enemies[i].body.move();

            enemies[i].sprite.render(enemies[i].body.coordinates, lastEnemyCoordinates);
            enemies[i].sprite.update();


            //end
            if (ninjaBody.colides(enemies[i].body)) {
                //reduces lifeCount and checks if ninja is dead
                if (!loseLife(ninjaBody, ninjaSprite, playerContext)) {
                    sounds.playLoseLife();
                } else {
                    return;
                }
            }
        }

        // spawning enemies
        spawnEnemies();

        background.render();
        background.update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
    sounds.playBackground();

}