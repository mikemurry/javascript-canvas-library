/**
 * @namespace JCL.Point
 */

/**
 * @class The point class represents a point in 2d (x,y) or 3d (x,y,z) space.
 * @param x {Number} The x coordinate.
 * @param y {Number} The y coordinate.
 * @param z {Number} The z coordinate.
 * @return {Object}
 */

JCL.Point = function Point(x, y, z) {
    return this.set(x,y,z);
};

JCL.Point.prototype = {

    constructor: "Point",

    /**
     * @description Calculates the angle between two points.
     * @param x {Number} The x coordinate.
     * @param y {Number} The y coordinate.
     * @param z {Number} The z coordinate.
     * @return {Object} The resulting point object.
     */

    set: function set(x,y,z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        return this;
    },

    /**
     * @description Returns a simplified object representing the point's coordinates.
     * @return {Object}
     */

    get: function get() {
        return { x: this.x, y: this.y, z: this.z };
    },

    /**
     * @description Prints the current coordinates as a string.
     * @return {String}
     */

    toString: function toString() {
        return "Point( x:" + this.x + ", y:" + this.y + ", z:" + this.z + ")";
    },

    /**
     * @description Calculates the distance between two points.
     * @param a {Object} The first point.
     * @return {Number|Undefined} The resulting length.
     */

    distance: function distance(a) {
        if (a.constructor === "Point") { return Math.sqrt(Math.pow(a.x- this.x, 2) + Math.pow(a.y- this.y,2)); }
        else { JCL.warn("Cannot calculate distance of a non-point."); }
        return undefined;
    },

    /**
     * @description Calculates the angle between two points.
     * @param a {Object} The first point.
     * @return {Number|Undefined} The resulting angle in radians.
     */

    angle: function angle(a) {
        if (a.constructor === "Point") { return Math.atan2(a.y- this.y, a.x - this.x); }
        else { JCL.warn("Cannot calculate angle of a non-point."); }
        return undefined;
    },

    /**
     * @description Calculates a point {x,y} at the specified angle and distance from the base point.
     * @param angle {Number} The number of degrees to rotate the resulting point around the center (0 is pointing right).
     * @param distance {Number} The number of pixels between the center and the resulting point.
     * @return {Object|Undefined} The resulting point expressed as an object with 'x' and 'y' properties.
     */

    tangent: function tangent(angle, distance) {

        var radians = JCL.utilities.radians;

        if (angle !== null && distance !== null) {
            return new JCL.Point((distance * Math.cos(radians(angle))) + this.x, (distance * Math.sin(radians(angle))) + this.y);
        } else { JCL.warn("Could not calculate tangent. Missing required data. (Angle: " + angle + ", Distance: " + distance + ")"); }
        return undefined;

    },

    /**
     * @description Interpolates between two points {x,y}.
     * @param a {Object} The first point {x,y}.
     * @param ratio {Number} The amount to interpolate between the two points. Between 0 and 1.
     * @return {Object|Undefined} The interpolated point {x,y}.
     */

    lerp: function lerp(a,ratio) {
        if (!ratio || ratio < 0) { ratio = 0; }
        else if (ratio > 1) { ratio = 1; }
        if (this && a && ratio !== null) {
            if (a.constructor === "Point") {
                return { x: this.x + ((a.x - this.x) * ratio), y: this.y + ((a.y - this.y) * ratio) };
            } else { JCL.warn("Could not interpolate point. Invalid point."); }
        } else { JCL.warn("Could not interpolate point. Missing required data."); }
        return undefined;
    }

};