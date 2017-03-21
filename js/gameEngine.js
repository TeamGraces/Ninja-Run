/*globals window document */

function gameEngine() {
    const width = 924,
        height = 612,
        jumpingHeight = 0.27,
        distanceBetweenSpawningEnemies = 100,
        framesNumber = 10,
        backgroundSpeed = 10;

    let playerCanvas = document.getElementById('player-canvas'),
        playerContext = playerCanvas.getContext('2d'),
        playerImg = document.getElementById('ninja-sprite');

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
        height: ninjaSprite.height
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

    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 37: // left
                if (ninjaBody.speed.x < 0) {
                    return;
                }

                ninjaBody.accelerate('x', -1);
                break;
            case 38: // up
                event.keyCode = false;
                if (ninjaBody.coordinates.y < (height - ninjaBody.height)) {
                    return;
                }                

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

    window.addEventListener('keyup', function (event) {
        if ((event.keyCode !== 37) && (event.keyCode !== 39)) {
            return;
        }
        ninjaBody.speed.x = 0;
    });
   

    function applyGravityY(physicalBody, gravity) {

        // checks if the ninja is on the ground
        if (physicalBody.coordinates.y === (height - physicalBody.height)) {
            return;
        }

        if (physicalBody.coordinates.y > (height - physicalBody.height)) {
            physicalBody.coordinates.y = height - physicalBody.height;
            return;
        }

        physicalBody.speed.y += gravity;

    }

    let background = createBackground({
        width: width,
        height: height,
        speedX: backgroundSpeed
    });

    let enemies = [];

    let currentNinjaSprite = ninjaSprite;

    function gameLoop() {

         

        applyGravityY(ninjaBody, jumpingHeight); //jumping height

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

                //TODO: fix the dead sprite

                //    let lastNinjaCoordinates = ninjaBody.move();

                // currentNinjaSprite = ninjaDeadSprite;

                // currentNinjaSprite.render(ninjaBody.coordinates, lastNinjaCoordinates);
                // currentNinjaSprite.update();

                playerContext.drawImage(
                    document.getElementById('game-over'),
                    0,
                    0
                );

                return;
            }
        }
        // spawning enemies
        if (Math.random() < 0.007) {
            if (enemies.length) {
                let lastEnemy = enemies[enemies.length - 1];
                let starting = Math.max(lastEnemy.body.coordinates.x + lastEnemy.body.width + distanceBetweenSpawningEnemies, width);
                let newEnemy = createEnemy(starting);
                enemies.push(newEnemy);

            } else {
                enemies.push(createEnemy(width));
            }

        }
        background.render();
        background.update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
}