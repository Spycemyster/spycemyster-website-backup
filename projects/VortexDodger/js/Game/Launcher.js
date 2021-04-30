// Launcher parent class. A launcher is an entity that will fire bullets. Each launcher will have
// different behaviors, launching bullets in different patterns.
class Launcher extends Entity {
    constructor(x, y, speed, TTL) {
        super(x, y, 0, 0);
        this.speed = speed;
        this.TTL = TTL;
    }

    getDirection() {
        return createVector(0, 0);
    }

    update(dt) {
        let direction = this.getDirection();
        this.x += direction.x * dt * this.speed;
        this.y += direction.y * dt * this.speed;
    }
}