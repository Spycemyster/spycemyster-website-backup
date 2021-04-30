const VORTEX_BULLET_BASE_SPEED = 0.065;
// The vortex launcher will fire bullets in a spiral fashion. Depending on a circle, there are a specified
// amount of tails that the launcher will have. The vortex will rotate with a given frequency and fire out
// bullets about it's position.
class VortexLauncher extends Launcher {
    #timer = 0;
    #bullet_timer = 0;
    fire_speed = 150;
    constructor(x, y, speed, TTL, tails, freq = 2) {
        super(x, y, speed, TTL);
        this.tails = tails;
        this.freq = freq;
    }

    update(dt) {
        this.#timer += dt;
        this.TTL -= dt;
        this.#bullet_timer += dt;

        if (this.#bullet_timer > this.fire_speed) {

            for (let i = 0; i < this.tails; i++) {
                // divides the angle between the amount of tails to fire projectiles into equal directions
                let angle = this.#timer * TWO_PI / 1000 / this.freq + TWO_PI / this.tails * i;
                let bullet = new LinearBullet(this.x, this.y, 7, 7, color(200, 100, 100),
                    VORTEX_BULLET_BASE_SPEED, createVector(Math.cos(angle), Math.sin(angle)));
                bullets.push(bullet);
            }
            this.#bullet_timer = 0;
        }
    }
}