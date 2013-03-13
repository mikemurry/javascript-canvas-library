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

    if (x && !y && !z) {
        z = x.z || 0;
        y = x.y || 0;
        x = x.x || 0;
    }

    return this.set(x,y,z);
};

JCL.Point.prototype = {

    /**
     * @description Calculates the angle between two points.
     * @param x {Number} The x coordinate.
     * @param y {Number} The y coordinate.
     * @param z {Number} The z coordinate.
     * @return {Object} The resulting point object.
     */

    set: function(x,y,z) {
        this.x = x || this.x || 0;
        this.y = y || this.y || 0;
        this.z = z || this.z || 0;
        return this;
    },

    /**
     * @description Returns a simplified object representing the point's coordinates.
     * @return {Object}
     */

    toJSON: function() {
        return { x: this.x, y: this.y, z: this.z };
    },

    /**
     * @description Calculates the distance between two points.
     * @param a {Object} The first point.
     * @return {Number|Undefined} The resulting length.
     */

    distance: function(a) {

        // TODO: Make work in 3d space.

        if (a instanceof JCL.Point) { return Math.sqrt(Math.pow(a.x- this.x, 2) + Math.pow(a.y- this.y,2)); }
        else { throw new TypeError("Cannot calculate distance of a non-point."); }

    },

    /**
     * @description Calculates the angle between two points.
     * @param a {Object} The first point.
     * @return {Number|Undefined} The resulting angle in radians.
     */

    angle: function(a) {
        if (a instanceof JCL.Point) { return Math.atan2(a.y- this.y, a.x - this.x); }
        else { throw new TypeError("Cannot calculate angle of a non-point."); }
    },

    /**
     * @description Calculates a point {x,y} at the specified angle and distance from the base point.
     * @param angle {Number} The number of degrees to rotate the resulting point around the center (0 is pointing right).
     * @param distance {Number} The number of pixels between the center and the resulting point.
     * @return {Object|Undefined} The resulting point expressed as an object with 'x' and 'y' properties.
     */

    tangent: function(angle, distance) {

        var radians = JCL.utilities.radians;

        if (angle !== null && distance !== null) {
            return new JCL.Point((distance * Math.cos(radians(angle))) + this.x, (distance * Math.sin(radians(angle))) + this.y);
        } else {
            throw new Error("Could not calculate tangent. Missing required data. (Angle: " + angle + ", Distance: " + distance + ")");
        }

    },

    /**
     * @description Interpolates between two points {x,y}.
     * @param a {Object} The first point {x,y}.
     * @param ratio {Number} The amount to interpolate between the two points. Between 0 and 1.
     * @return {Object|Undefined} The interpolated point {x,y}.
     */

    lerp: function(a,ratio) {
        if (!ratio || ratio < 0) { ratio = 0; }
        else if (ratio > 1) { ratio = 1; }
        if (this && a && ratio !== null) {
            if (a instanceof JCL.Point) {
                return { x: this.x + ((a.x - this.x) * ratio), y: this.y + ((a.y - this.y) * ratio) };
            } else {
                throw new Error("Could not interpolate point. Invalid point.");
            }
        } else {
            throw new Error("Could not interpolate point. Missing required data.");
        }
    },

    translate: function(x, y, z) {
        return this.set(this.x + (x || 0), this.y + (y || 0), this.z + (z || 0));
    }

};