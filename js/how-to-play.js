/*globals $ */

function howToPlay() {
    const $div = $('<div>');


    const $leftArrowText = $('<span>').text('move backwards');
    const $leftArrow = $('<span>').addClass('glyphicon').addClass('glyphicon-arrow-left');

    const $rightArrowText = $('<span>').text('accelerate');
    const $rightArrow = $('<span>').addClass('glyphicon').addClass('glyphicon-arrow-right');

    const $jumpArrowText = $('<span>').text('jump');
    const $upArrow = $('<span>').addClass('glyphicon').addClass('glyphicon-arrow-up');


    $leftArrowText.appendTo($div);
    $leftArrow.appendTo($div);

    $rightArrowText.appendTo($div);
    $rightArrow.appendTo($div);

    $jumpArrowText.appendTo($div);
    $upArrow.appendTo($div);


    $div.children()
        .css('margin-left', 10)
        .css('color', '#d43f3a')
        .css('font-size', '1.2em');

    $div.appendTo($('#wrapper'));
}