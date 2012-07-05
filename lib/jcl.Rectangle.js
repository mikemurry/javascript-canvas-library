/**
 * @namespace JCL.Rectangle
 */

/**
 * @class The Rectangle class represents a rectangle in 2d (x,y) or 3d (x,y,z) space.
 * @param x {Number} The x coordinate.
 * @param y {Number} The y coordinate.
 * @param z {Number} The z coordinate.
 * @param width {Number} The width.
 * @param height {Number} The height.
 * @param depth {Number} The depth.
 * @return {Object}
 */

JCL.Rectangle = function Point(x, y, z, width, height, depth) {
    return this.set(x,y,z,width,height,depth);
};

JCL.Rectangle.prototype = {

    constructor: "Rect",

    /**
     * @description Sets the location and size of the rectangle.
     * @param x {Number} The x coordinate.
     * @param y {Number} The y coordinate.
     * @param z {Number} The z coordinate.
     * @param width {Number} The width.
     * @param height {Number} The height.
     * @param depth {Number} The depth.
     * @return {Object} The resulting rectangle object.
     */

    set: function set(x,y,z,width,height,depth) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.width = x || 0;
        this.height = y || 0;
        this.depth = z || 0;
        return this;
    },

    /**
     * @description Returns a simplified object representing the point's coordinates.
     * @return {Object}
     */

    get: function get() {
        return { x: this.x, y: this.y, z: this.z, width: this.width, height: this.height, depth: this.depth };
    },

    /**
     * @description Prints the current coordinates as a string.
     * @return {String}
     */

    toString: function toString() {
        return "Point( x:" + this.x + ", y:" + this.y + ", z:" + this.z + ", width:" + this.width + ", height:" + this.height + ", depth:" + this.depth + ")";
    },

    /**
     * @description Calculates the center point of the rectangle, or if a point is passed in, adjusts the rectangle's location to match the provided center point.
     * @return {Object} The resulting point.
     */

    center: function center(point) {
        if (point) {
            this.set(point.x - (this.width / 2), point.y-(this.height / 2), point.z-(this.depth / 2), this.width, this.height, this.depth);
        } else {
            return new JCL.Point(this.x + (this.width / 2), this.y + (this.height / 2), this.z + (this.depth / 2));
        }
    }

};