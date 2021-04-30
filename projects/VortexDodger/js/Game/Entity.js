const BORDER_COLOR = 255;
class Entity {
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    // checks if the two entities are colliding based on their rectangle hitboxes
    isCollidingWith(other, safety = 0) {
        if (other.x + other.width - safety < this.x)
            return false;
        else if (other.x + safety > this.x + this.width)
            return false;
        else if (other.y + other.height - safety < this.y)
            return false;
        else if (other.y + safety > this.y + this.height)
            return false;
        
        return true;
    }
}