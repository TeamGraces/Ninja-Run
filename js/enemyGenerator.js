const width = 924,
    height = 613,
    framesNumber = 10,
    distanceBetweenSpawningEnemies = 120;

    var enemies = [];

function createEnemy(offsetX) {

    let enemyCanvas = document.getElementById('enemy-canvas'),
        enemyContext = enemyCanvas.getContext('2d'),
        enemyImg = document.getElementById('enemy-sprite');

    enemyCanvas.width = width;
    enemyCanvas.height = height;

    let enemySprite = createSprite({
        spritesheet: enemyImg,
        contex: enemyContext,
        width: enemyImg.width / framesNumber,
        height: enemyImg.height,
        framesNumber: framesNumber,
        loopTickPerFrame: 3
    });

    let enemyBody = createPhysicalObject({
        coordinates: { x: offsetX + 19, y: height - enemySprite.height + 1 },
        defaultAcceleration: { x: 5, y: 0 },
        speed: { x: -5, y: 0 },
        width: enemySprite.width,
        height: enemySprite.height
    });

    return {
        sprite: enemySprite,
        body: enemyBody
    };
}

function spawnEnemies() {
    
    if (Math.random() < 0.005) {
        if (enemies.length) {
            var lastEnemy = enemies[enemies.length - 1];
            var starting = Math.max(lastEnemy.body.coordinates.x + lastEnemy.body.width + distanceBetweenSpawningEnemies, width);
            var newEnemy = createEnemy(starting);
            enemies.push(newEnemy);

        } else {
            enemies.push(createEnemy(width));
        }
    }
}