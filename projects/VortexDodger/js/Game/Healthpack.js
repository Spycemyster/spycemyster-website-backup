// players can pick up health packs for a static health boost. They can go over their health limit with these.
// however, health packs are only available for a limited amount of time. They slowly fade away after a few
// seconds
class Healthpack extends Entity {
    #TTTL = 0;
    constructor(x, y, size, TTL, health) {
        super(x, y, size, size);
        this.TTL = TTL;
        this.#TTTL = TTL;
        this.size = size;
        this.health = health;
    }

    update(dt) {
        this.TTL -= dt;
    }

    getOpacity() {
        return Math.max(0, (this.TTL - 1000) / this.#TTTL);
    }

    draw() {
        noStroke();
        fill(0, 255, 0, int(255 * this.getOpacity()));

        rect(this.x, this.y, this.size, this.size);

    }

}