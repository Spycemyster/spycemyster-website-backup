// Bullet parent class to allow for different bullets with different types of paths
//      - To define a path, set the getDirection() function as the derivative of the path.
class Bullet extends Entity {
    constructor(x, y, width, height, color, speed) {
        super(x, y, width, height);
        this.speed = speed;
        this.color = color;
        this.timer = 0;
    }

    getDirection() {
        return new p5.Vector(0, 0);
    }

    update(dt) {
        this.timer += dt;
        let direction = this.getDirection();
        this.x += direction.x * dt * this.speed;
        this.y += direction.y * dt * this.speed;
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}

// A linear bullet will have a constant path along its way.
class LinearBullet extends Bullet {
    constructor(x, y, width, height, color, speed, direction) {
        super(x, y, width, height, color, speed);
        this.direction = direction;
        this.direction.normalize();
    }

    getDirection() {
        return this.direction;
    }
}
// A bullet that will have a sinuisoidable path along its way
class SinBullet extends Bullet {
    constructor(x, y, width, height, color, speed, direction, period, magnitude, flip = false) {
        super(x, y, width, height, color, speed);
        this.direction = direction;
        this.period = period;
        this.direction.normalize();
        this.magnitude = magnitude; // magnitude of oscillation
        this.flip = flip;
    }

    getDirection() {
        let angle = atan2(this.direction.y, this.direction.x);
        let reverse = (this.flip) ? -1 : 1;
        let D = new p5.Vector(1, this.magnitude * cos(this.timer * TWO_PI / this.period) * reverse * TWO_PI / this.period);
        D.normalize();
        let rotatedVector = new p5.Vector(cos(angle) * D.x - sin(angle) * D.y, sin(angle) * D.x + cos(angle) * D.y);
        return rotatedVector;
    }



}