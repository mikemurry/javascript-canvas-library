/**
 * @namespace JCL.Rectangle
 */

/**
 * @class The Rectangle class represents a rectangle in 2d (x,y) or 3d (x,y,z) space.
 * @param a {Number} The x coordinate.
 * @param b {Number} The y coordinate.
 * @param c {Number} If 4 arguments, the width. If 6 arguments, the z coordinate.
 * @param d {Number} If 4 arguments, the height. If 6 arguments, the width.
 * @param e {Number} If 6 arguments, the height.
 * @param f {Number} If 6 arguments, the depth.
 * @return {Object} The resulting rectangle object.
 */

JCL.Rectangle = function Rectangle(a, b, c, d, e, f) {
    return this.set(a,b,c,d,e,f);
};

JCL.Rectangle.prototype = {

    constructor: "Rectangle",

    /**
     * @description Sets the location and size of the rectangle.
     * @param a {Number} The x coordinate.
     * @param b {Number} The y coordinate.
     * @param c {Number} If 4 arguments, the width. If 6 arguments, the z coordinate.
     * @param d {Number} If 4 arguments, the height. If 6 arguments, the width.
     * @param e {Number} If 6 arguments, the height.
     * @param f {Number} If 6 arguments, the depth.
     * @return {Object} The resulting rectangle object.
     */

    set: function set(a,b,c,d,e,f) {

        var x, y, z, width, height, depth;

        if (a !== undefined && b !== undefined && c !== undefined && d !== undefined && e === undefined && f === undefined) {
            // Assume arguments (x, y, width, height);
            x = a;
            y = b;
            width = c;
            height = d;
        } else {
            // Assume arguments (x, y, z, width, height, depth)
            x = a;
            y = b;
            z = c;
            width = d;
            height = e;
            depth = d;
        }

        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.depth = depth || 0;

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
        return "Rectangle( x:" + this.x + ", y:" + this.y + ", z:" + this.z + ", width:" + this.width + ", height:" + this.height + ", depth:" + this.depth + ")";
    },

    /**
     * @description Calculates the center point of the rectangle, or if a point is passed in, adjusts the rectangle's location to match the provided center point.
     * @return {Object} The resulting point.
     */

    center: function center(point) {
        if (point) {
            this.set(point.x - (this.width / 2), point.y-(this.height / 2), point.z-(this.depth / 2), this.width, this.height, this.depth);
            return this;
        } else {
            return new JCL.Point(this.x + (this.width / 2), this.y + (this.height / 2), this.z + (this.depth / 2));
        }
    }

};