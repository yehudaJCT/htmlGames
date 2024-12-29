/**
 * Calculate the distance between a point and a line.
 * @param {number} x1 - x-coordinate of the point.
 * @param {number} y1 - y-coordinate of the point.
 * @param {number} A - Coefficient of x in the line equation.
 * @param {number} B - Coefficient of y in the line equation.
 * @param {number} C - Constant in the line equation.
 * @returns {number} Distance from the point to the line.
 */
function distancePointToLine(x1, y1, A, B, C) {
    // Calculate the distance using the formula
    const numerator = Math.abs(A * x1 + B * y1 + C);
    const denominator = Math.sqrt(A * A + B * B);
    return numerator / denominator;
}

/**
 * Calculate the distance between a point and a rectangle.
 * @param {number} px - x-coordinate of the point.
 * @param {number} py - y-coordinate of the point.
 * @param {number} rx - x-coordinate of the bottom-left corner of the rectangle.
 * @param {number} ry - y-coordinate of the bottom-left corner of the rectangle.
 * @param {number} rw - Width of the rectangle.
 * @param {number} rh - Height of the rectangle.
 * @returns {number} Distance from the point to the rectangle.
 */
function distancePointToRectangle(px, py, rx, ry, rw, rh) {
    // Compute rectangle bounds
    const left = rx;
    const right = rx + rw;
    const bottom = ry;
    const top = ry + rh;

    // If the point is inside the rectangle, the distance is 0
    if (px >= left && px <= right && py >= bottom && py <= top) {
        return 0;
    }

    // Calculate the horizontal and vertical distances to the rectangle
    const dx = Math.max(left - px, 0, px - right);
    const dy = Math.max(bottom - py, 0, py - top);

    // The distance is the hypotenuse of the dx and dy
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate the distance between two rectangles.
 * @param {number} x1 - x-coordinate of the bottom-left corner of rectangle 1.
 * @param {number} y1 - y-coordinate of the bottom-left corner of rectangle 1.
 * @param {number} w1 - Width of rectangle 1.
 * @param {number} h1 - Height of rectangle 1.
 * @param {number} x2 - x-coordinate of the bottom-left corner of rectangle 2.
 * @param {number} y2 - y-coordinate of the bottom-left corner of rectangle 2.
 * @param {number} w2 - Width of rectangle 2.
 * @param {number} h2 - Height of rectangle 2.
 * @returns {number} Distance between the two rectangles.
 */
function distanceBetweenRectangles(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Calculate the horizontal gap
    const dx = Math.max(0, x2 - (x1 + w1), x1 - (x2 + w2));

    // Calculate the vertical gap
    const dy = Math.max(0, y2 - (y1 + h1), y1 - (y2 + h2));

    // If both gaps are 0, the rectangles overlap
    if (dx === 0 && dy === 0) {
        return 0;
    }

    // Return the Euclidean distance if the rectangles are diagonally separated
    return Math.sqrt(dx * dx + dy * dy);
}