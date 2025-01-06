class Animation {
    /**
     * Creates a generic animation instance.
     * @param {Object} options - Configuration options.
     * @param {number} options.frameWidth - Width of each frame in the sprite sheet.
     * @param {number} options.frameHeight - Height of each frame in the sprite sheet.
     * @param {number} options.frameCount - Total number of frames in the animation.
     * @param {number} options.animationSpeed - Frames per second for the animation.
     * @param {string} options.backgroundImage - URL of the sprite sheet.
     */
    constructor({ frameWidth, frameHeight, frameCount, animationSpeed, backgroundImage, shiftX, shiftY}) {
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.animationSpeed = animationSpeed;
        this.backgroundImage = backgroundImage;
        this.shiftX = shiftX;
        this.shiftY = shiftY;

        this.currentFrame = 0;
        this.lastUpdateTime = 0; // Time of the last frame update.
        this.frameDuration = 1000 / animationSpeed; // Duration of each frame in milliseconds.
    }

    /**
     * Updates the current frame based on elapsed time.
     * @param {number} currentTime - Current timestamp in milliseconds.
     */
    update(currentTime) {
        if (!this.lastUpdateTime) this.lastUpdateTime = currentTime;

        const elapsed = currentTime - this.lastUpdateTime;
        if (elapsed > this.frameDuration) {
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            this.lastUpdateTime = currentTime;
        }
    }

    /**
     * Gets the CSS background position for the current frame.
     * @returns {string} CSS background-position value.
     */
    getBackgroundPosition() {
        const offsetX = this.currentFrame * this.frameWidth - this.shiftX ;
        return `-${offsetX}px ${this.shiftY}px`;
    }
}

class SpriteAnimation {
    /**
     * Creates an instance of a sprite-based animation.
     * @param {HTMLElement} element - The HTML element to apply the animation to.
     * @param {Animation} animation - Animation instance controlling the sprite logic.
     */
    constructor(element, animation) {
        this.element = element;
        this.animation = animation;


        this.element.style.backgroundImage = `url(${animation.backgroundImage})`;
        this.element.style.width = `${animation.frameWidth}px`;
        this.element.style.height = `${animation.frameHeight}px`;

        this.isAnimating = false;
        this.update = this.update.bind(this); // Ensure correct `this` context for requestAnimationFrame.
    }

    /**
     * Starts the animation loop.
     */
    start() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        requestAnimationFrame(this.update);
    }

    /**
     * Stops the animation loop.
     */
    stop() {
        this.isAnimating = false;
    }

    /**
     * Updates the animation frame and element style.
     * @param {number} timestamp - Current timestamp in milliseconds.
     */
    update(timestamp) {
        if (!this.isAnimating) return;

        this.animation.update(timestamp);
        this.element.style.backgroundPosition = this.animation.getBackgroundPosition();

        requestAnimationFrame(this.update);
    }
}

