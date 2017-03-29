/*globals $ window document */

function loseLife(player, sprite, ctx) {
    let countLives,
        $lifeIcon,
        isDead = false;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    countLives = $('svg use').length;
    $lifeIcon = $('svg use')[countLives - 1];

    //refresh ninja when life is lost
    for (let i = 0; i < countLives + 1; i += 1) {
        $('#player-canvas').fadeTo(250, 0);
        $('#player-canvas').fadeTo(250, 1);
    }


    countLives -= 1;
    $($lifeIcon).fadeOut(300);
    $($lifeIcon).remove();

    enemies = [];
    createEnemy(width);
    spawnEnemies();

    player.coordinates = {
        x: sprite.width,
        y: height - sprite.height
    };

    if (countLives === 0) {
        sounds.playGameOver();

        ctx.drawImage(
            document.getElementById('game-over'),
            0,
            0
        );

        isDead = true;
        return isDead;
    }
}