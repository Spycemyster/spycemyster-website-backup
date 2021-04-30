const SHOTGUN_FIRE_TIME = 200;
class ShotgunLauncher extends Launcher {
    #timer = 0;
    #bullet_timer = 0;
    #is_firing = false;
    #fire_timer = 0;
    bullet_speed = 0.15;
    constructor(x, y, speed, bullets, shots) {
        super(x, y, speed, 0);
        this.bullets = bullets;
        this.shots = shots;
    }

    update(dt) {
        this.#timer += dt;

        if (this.#timer > 1000 && !this.#is_firing) {
            this.#is_firing = true;
        }

        if (this.#is_firing && this.shots > 0) {
            this.#bullet_timer += dt;
            this.#fire_timer += dt;

            if (this.#fire_timer > SHOTGUN_FIRE_TIME / this.bullets) {
                let angle = atan2(player.y + player.height / 2 - this.y,
                    player.x + player.width / 2 - this.x) + (Math.random() - 0.5) * PI / 6;
                let bullet = new LinearBullet(this.x, this.y, 7, 7, color(200, 100, 100),
                    this.bullet_speed, createVector(Math.cos(angle), Math.sin(angle)));
                bullets.push(bullet);
                this.#fire_timer = 0;
            }

            if (this.#bullet_timer > SHOTGUN_FIRE_TIME) {
                this.#bullet_timer = 0;
                this.#is_firing = false;
                this.#timer = 0;
                this.shots--;
            }
        }
    }
}