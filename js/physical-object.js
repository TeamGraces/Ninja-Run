function createPhysicalObject(options) {

    const distanceOnCollision = 15,
        offsetX = 4;

    function move() {

        let lastCoordinates = { x: this.coordinates.x, y: this.coordinates.y };

        if (this.isNinja) { // ninja must stay in the canvas, but enemy must not
            if (this.coordinates.x + this.width < width && this.coordinates.x > this.width / 3 + offsetX) {
                this.coordinates.x += this.speed.x;
                this.coordinates.y += this.speed.y;
            } else {
                if (this.coordinates.x > width - this.width - offsetX) {
                    this.coordinates.x = lastCoordinates.x - offsetX;
                } else {
                    this.coordinates.x = lastCoordinates.x + offsetX;
                }
            }
        } else {
            this.coordinates.x += this.speed.x;
            this.coordinates.y += this.speed.y;
        }

        return lastCoordinates;

    }

    function colides(otherPhysicalBody) {
        //radiuses
        let ninjaX = this.coordinates.x + (this.width / 2),
            ninjaY = this.coordinates.y + (this.height / 2),
            enemyX = otherPhysicalBody.coordinates.x + (otherPhysicalBody.width / 2),
            enemyY = otherPhysicalBody.coordinates.y + (otherPhysicalBody.height / 2);

        // distance between centers
        let distance = Math.sqrt((ninjaX - enemyX - distanceOnCollision) * (ninjaX - enemyX - distanceOnCollision) +
            (ninjaY - enemyY - distanceOnCollision) * (ninjaY - enemyY - distanceOnCollision));

        return distance <= (this.radius + otherPhysicalBody.radius - distanceOnCollision);
    }

    let physicalObject = {
        coordinates: options.coordinates,
        defaultAcceleration: options.defaultAcceleration,
        speed: options.speed || { x: 0, y: 0 },
        width: options.width,
        height: options.height,
        radius: (options.width / 4 + options.height / 4),
        accelerate: function(axis, direction) {

            this.speed[axis] += this.defaultAcceleration[axis] * direction;
        },
        isNinja: options.isNinja || false,
        move: move,
        colides: colides
    };
    return physicalObject;
}