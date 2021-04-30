// The player class will draw the player's rectangle, take player input, deal with physics, and fire
// the player's bullets.
const INDICATOR_DISTANCE = 20;
const PLAYER_BULLET_WIDTH = 6;
const SIN_BULLET_PERIOD = 2000;

class Player extends Entity {
    #gun_timer = 500;
    #sin_timer = 600;
    t = 0;
    #effective_speed = 0;
    #effective_mult = 1;
    score = 0;
    #nuke_available = true;
    #nuke_timer = 0;
    unlocked_sin = false;
    
    constructor(x, y, width, height, speed, health, color) {
        super(x, y, width, height);
        this.speed = speed;
        this.maxHealth = health;
        this.health = health;
        this.color = color;
        this.direction = new p5.Vector(0, 0);
    }

    checkInput() {
        if (keyIsDown(38) || keyIsDown(87)) { // 38 -> up
            this.direction.y = -1;
        }
        else if (keyIsDown(40) || keyIsDown(83)) { // 40 -> down
            this.direction.y = 1;
        }

        if (keyIsDown(37) || keyIsDown(65)) { // 37 -> left
            this.direction.x = -1;
        }
        else if (keyIsDown(39) || keyIsDown(68)) { // 39 -> right
            this.direction.x = 1;
        }

        // shooting a bullet
        //if (keyIsDown(32) || mouseIsPressed) { // 32 -> space
            this.fireBullet();
        //}

        if (keyIsDown(70) && this.#nuke_available) { // F is pressed = activate nuke
            bullets.splice(0, bullets.length);
            this.#nuke_available = false;
            this.#nuke_timer = 0;
        }

        this.#effective_mult = (keyIsDown(16)) ? 3 : 1;

        this.direction.normalize();
    }

    isNukeAvailable() {
        return this.#nuke_available;
    }

    update(dt) {
        this.#gun_timer += dt;
        this.#sin_timer += dt;
        this.checkInput();
        this.x += this.direction.x * dt * this.#effective_speed / this.#effective_mult;
        this.y += this.direction.y * dt * this.#effective_speed / this.#effective_mult;

        this.#effective_speed = this.speed;
        // if (this.direction.mag() != 0) {
        //     this.#effective_speed = Math.min(this.speed, this.#effective_speed + this.speed / 400 * dt);
        // }
        // else {
        //     this.#effective_speed = 0;
        // }

        if (!this.#nuke_available) {
            this.#nuke_timer += dt;
        }

        // TODO
        // add an animation for when the player activates a nuke. I'm thinking of making the screen fade in
        // and out fast with white.
        if (this.#nuke_timer > 60000) { // Nuke recharge time is 60 seconds
            this.#nuke_available = true;
        }

        this.direction = new p5.Vector(0, 0);

        // health regen
        this.health += Math.max((this.maxHealth - this.health) * dt / 90000, 0);
    }

    draw() {
        if (this.#effective_mult != 1) {
            this.color = color(240, 35, 235);
        }
        else
            this.color = color(255, 255, 255);
        fill(this.color);
        if (this.#nuke_available && this.#effective_mult == 1) {
            stroke(255, 0, 0);
        }
        else
            noStroke();
        // draws the player rectangle
        rect(this.x, this.y, this.width, this.height);

        noStroke();
        // draws the health bar
        if (this.health > 0) {
            fill(color(0, 255, 0));
            let hWidth = Math.max(this.width * ((this.health - 1) / this.maxHealth) * 2, 1); // centers the rectangle to the bottom of the player
            rect(this.x + this.width / 2 - hWidth / 2, this.y + this.height + 10, hWidth, 4);
        }

        // draws mouse indicator
        let angle = Math.atan2(mouseY - this.y, mouseX - this.x);
        stroke(255)
        strokeWeight(5);
        point(this.x + this.width / 2 + Math.cos(angle) * INDICATOR_DISTANCE,
            this.y + this.height / 2 + Math.sin(angle) * INDICATOR_DISTANCE);
        strokeWeight(1);
    }

    fireBullet() {
        if (this.#gun_timer > 190) {
            let angle = Math.atan2(mouseY - this.y, mouseX - this.x);
            this.#gun_timer = 0;
            let direction = createVector(cos(angle), sin(angle));
            let lbullet = new LinearBullet(this.x + this.width / 2 - PLAYER_BULLET_WIDTH / 2,
                this.y + this.height / 2 - PLAYER_BULLET_WIDTH / 2,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_WIDTH, color(10, 255, 20),
                0.35, direction);
            playerBullets.push(lbullet);
        }

        if (this.unlocked_sin && this.#sin_timer > 800) {
            this.#sin_timer = 0;
            let angle = Math.atan2(mouseY - this.y, mouseX - this.x);
            let direction = createVector(cos(angle), sin(angle));
            let sbullet0 = new SinBullet(this.x + this.width / 2 - PLAYER_BULLET_WIDTH / 2,
                this.y + this.health / 2 - PLAYER_BULLET_WIDTH / 2,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_WIDTH, color(70, 255, 255),
                0.6, direction, SIN_BULLET_PERIOD, 100, false);

            let sbullet1 = new SinBullet(this.x + this.width / 2 - PLAYER_BULLET_WIDTH / 2,
                this.y + this.health / 2 - PLAYER_BULLET_WIDTH / 2,
                PLAYER_BULLET_WIDTH, PLAYER_BULLET_WIDTH, color(70, 255, 255),
                0.6, direction, SIN_BULLET_PERIOD, 100, true);
            playerBullets.push(sbullet0);
            playerBullets.push(sbullet1);
        }
    }
}