function createSprite(options) {

    function render(drawCoordinates, clearCoordinates) {
        this.contex.clearRect(
            clearCoordinates.x,
            clearCoordinates.y,
            this.width,
            this.height
        );
        this.contex.drawImage(
            this.spritesheet,
            this.frameIndex * this.width,
            0,
            this.width,
            this.height,
            drawCoordinates.x,
            drawCoordinates.y,
            this.width,
            this.height
        );
        return this;
    }

    function update() {
        this.loopTicksCount += 1;

        if (this.loopTicksCount >= this.loopTickPerFrame) {
            this.loopTicksCount = 0;

            this.frameIndex += 1;
            if (this.frameIndex >= this.framesNumber) {
                this.frameIndex = 0;
            }
        }
        return this;
    }

    let sprite = {
        spritesheet: options.spritesheet,
        contex: options.contex,
        width: options.width,
        height: options.height,
        framesNumber: options.framesNumber,
        loopTickPerFrame: options.loopTickPerFrame,
        frameIndex: 0,
        loopTicksCount: 0,
        render: render,
        update: update
    };
    return sprite;
}