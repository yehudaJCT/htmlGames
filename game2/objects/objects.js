// Rectangle class for handling positions and dimensions
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Collision detection function
    // return true if there is a collision
    checkCollision(rect) {
        return !(
            this.x + this.width <= rect.x || // rect1 is to the left of rect2
            this.x >= rect.x + rect.width || // rect1 is to the right of rect2
            this.y + this.height <= rect.y || // rect1 is above rect2
            this.y >= rect.y + rect.height // rect1 is below rect2
        );
    }

    static checkCollisionType(rect1, rect2) {
        let collision = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        };

        // Check if the rectangles overlap
        const isOverlapping =
            rect1.x <= rect2.x + rect2.width &&
            rect1.x + rect1.width >= rect2.x &&
            rect1.y <= rect2.y + rect2.height &&
            rect1.y + rect1.height >= rect2.y;

        if (!isOverlapping) return collision; // No collision

        // Determine the side of the collision
        const rect1Bottom = rect1.y + rect1.height;
        const rect1Top = rect1.y;
        const rect1Right = rect1.x + rect1.width;
        const rect1Left = rect1.x;

        const rect2Bottom = rect2.y + rect2.height;
        const rect2Top = rect2.y;
        const rect2Right = rect2.x + rect2.width;
        const rect2Left = rect2.x;

        // Check collision sides
        if (rect1Bottom >= rect2Top && rect1Top <=rect2Top && rect1Right > rect2Left && rect1Left < rect2Right) {
            collision.bottom = true; 
        }
        if (rect1Top <= rect2Bottom && rect1Bottom >= rect2Bottom && rect1Right > rect2Left && rect1Left < rect2Right) {
            collision.top = true; 
        }
        if (rect1Right >= rect2Left && rect1Left <= rect2Left && rect1Top < rect2Bottom && rect1Bottom > rect2Top) {
            collision.right = true;  
        }
        if (rect1Left <= rect2Right && rect1Right >= rect2Right && rect1Top < rect2Bottom && rect1Bottom > rect2Top) {
            collision.left = true;  
        }

        return collision;
    }
}

// Player movement velocity
class velocity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}