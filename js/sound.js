let sounds = (function() {

    let imgSoundOn = document.getElementById('soundOn'),
        imgSoundOff = document.getElementById('soundOff'),
        backgroundMusic = new Audio('sounds/backgroundMusic.wav'),
        jumpSound = new Audio('sounds/jump.wav'),
        gameOverSound = new Audio('sounds/gameOver.wav'),
        loseLife = new Audio('sounds/loseLife.wav'),
        isSoundOn = true;

    loseLife.playbackRate = '2.2';

    let soundImages = document.getElementsByClassName('sound');

    for (var i = 0; i < soundImages.length; i++) {
        soundImages[i].addEventListener('click', turnSoundsOnOrOff, false)
    }

    function playJumpSound() {
        if (isSoundOn) {
            jumpSound.play();
        }

    }

    function playBackgroundMusic() {
        if (isSoundOn) {
            backgroundMusic.play();
        }
    }

    function playGameOverSound() {
        if (isSoundOn) {
            backgroundMusic.pause();
            jumpSound.pause();
            gameOverSound.play();
        }
    }

    function playLoseLife() {
        if (isSoundOn) {
            loseLife.play();
        }

    }

    function turnSoundsOnOrOff(ev) {
        var targetImg = ev.target;

        if (targetImg.id === 'soundOn') {
            soundsOff();
            imgSoundOn.style.display = 'none';
            imgSoundOff.style.display = 'inline';

        } else {
            soundsOn();
            imgSoundOff.style.display = 'none';
            imgSoundOn.style.display = 'inline';
        }
    }

    function soundsOn() {
        isSoundOn = true;
        backgroundMusic.play();
    }

    function soundsOff() {
        isSoundOn = false;
        backgroundMusic.pause();
        jumpSound.pause();
        gameOverSound.pause();
    }

    return {
        playBackground: playBackgroundMusic,
        playJump: playJumpSound,
        playGameOver: playGameOverSound,
        playLoseLife: playLoseLife
    };
})();