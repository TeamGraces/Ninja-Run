/*globals  $ createBackground gameEngine restartGame howToPlay window*/
window.addEventListener('load', function () {
    const width = 924,
        height = 612,
        backgroundSpeed = 0;

    const background = createBackground({
        width: width,
        height: height,
        speedX: backgroundSpeed
    });

    background.render();

    const $div = $('div').addClass('menu-buttons').addClass('button-group');

    function createjQueryButton() {
        const $button = $('<button>')
            .attr('type', 'button')
            .addClass('menu-button')
            .addClass('btn')
            .addClass('btn-danger');
        return $button;
    }

    const $newGameButton = createjQueryButton();
    $newGameButton.text('New game')
        .one('click', gameEngine);

    const $restartButton = createjQueryButton();
    $restartButton.text('Restart')
        .on('click', restartGame)
        .on('restartGame', gameEngine());

    const $howToPlayButton = createjQueryButton();
    $howToPlayButton.text('How to play')
        .one('click', howToPlay);

    $newGameButton.appendTo($('div'));
    $restartButton.appendTo($('div'));
    $howToPlayButton.appendTo($('div'));

    $div.appendTo($('#wrapper'));


});

