/*globals  $ createBackground gameEngine howToPlay window*/
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

    const $playButton = createjQueryButton();
    $playButton.text('Play')
        .one('click', gameEngine);

    const $howToPlayButton = createjQueryButton();
    $howToPlayButton.text('How to play')
                    .one('click', howToPlay);
   
    $playButton.appendTo($('div'));
    $howToPlayButton.appendTo($('div'));
    
    $div.appendTo($('#wrapper'));


});