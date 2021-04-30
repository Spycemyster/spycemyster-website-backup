const DROPPER_BULLET_BASE_SPEED = 0.055;
// The dropper launcher will act like a "dropper" and drip bullets vertically or horizontally onto the player
// the pattern this represents is similar to that of fluid flow, hence the name dropper.
class DropperLauncher extends Launcher {
    bulletSpread = PI / 5;
    fire_speed = 75;
    #fire_timer = 0;
    constructor(x, y, speed, TTL, direction) {
        super(x, y, speed, TTL);
        this.direction = direction;

        this.direction.normalize();
    }

    update(dt) {
        this.TTL -= dt;
        // launch projectiles at a specific direction with a random spread
        this.#fire_timer += dt;

        if (this.#fire_timer > this.fire_speed) {
            let angle = Math.atan2(this.direction.y, this.direction.x) + (Math.random() - 0.5)
                * this.bulletSpread;
            let bullet = new LinearBullet(this.x, this.y, 7, 7, color(200, 20, 255), 
                DROPPER_BULLET_BASE_SPEED, createVector(Math.cos(angle), Math.sin(angle)));
            bullets.push(bullet);
            this.#fire_timer = 0;
        }
    }
}