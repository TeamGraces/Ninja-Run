/*globals $ window document */

function loseLife(player, sprite, ctx) {
    let countLives, $lifeIcon, isDead = false;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    enemies = [];
    createEnemy(width);
    spawnEnemies();

    player.coordinates = {
        x: 10,
        y: height - sprite.height
    };

    countLives = $('svg use').length;
    $lifeIcon = $('svg use')[countLives - 1];
    countLives -= 1;
    $($lifeIcon).fadeOut(300);
    $($lifeIcon).remove();

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