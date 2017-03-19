function createPhysicalObject(options) {

    const distanceOnCollision = 15;

    function move() {

        let lastCoordinates = { x: this.coordinates.x, y: this.coordinates.y };

        this.coordinates.x += this.speed.x;
        this.coordinates.y += this.speed.y;

        return lastCoordinates;
    }

    function colides(otherPhysicalBody) {
        //radiuses
        let ninjaX = this.coordinates.x + (this.width / 2),
            ninjaY = this.coordinates.y + (this.height / 2),
            enemyX = otherPhysicalBody.coordinates.x + (otherPhysicalBody.width / 2),
            enemyY = otherPhysicalBody.coordinates.y + (otherPhysicalBody.height / 2);

        // distance between centers
        let distance = Math.sqrt((ninjaX - enemyX - distanceOnCollision) * (ninjaX - enemyX - distanceOnCollision) + (ninjaY - enemyY) * (ninjaY - enemyY));

        return distance <= (this.radius + otherPhysicalBody.radius);
    }

    let physicalObject = {
        coordinates: options.coordinates,
        defaultAcceleration: options.defaultAcceleration,
        speed: options.speed || { x: 0, y: 0 },
        width: options.width,
        height: options.height,
        radius: (options.width / 4 + options.height / 4),
        accelerate: function (axis, direction) {

            this.speed[axis] += this.defaultAcceleration[axis] * direction;
        },
        move: move,
        colides: colides
    };
    return physicalObject;
}