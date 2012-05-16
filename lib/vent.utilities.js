/**
 * @namespace VENT.utilities
 */

VENT.utilities = {

    /**
     * @description Returns an integer between the specified minimum (inclusive) and maximum (exclusive).
     * @param min {Number} The minimum range for the returned integer (inclusive).
     * @param max {Number} The maximum range for the returned integer (exclusive).
     * @return {Number}
     */

    randomInt: function randomInt(min, max) {
        if (min && max) {
            return Math.floor((max - min) * Math.random()) + min;
        } else { VENT.warn("utilities.randomInt() Error: Missing min or max argument."); }
        return false;
    },

    /**
     * @description Calculates a point {x,y} at the specified angle and distance from the base point.
     * @param center {Object} The center point {x,y} to base the resulting point.
     * @param angle {Number} The number of degrees to rotate the resulting point around the center (0 is pointing right).
     * @param distance {Number} The number of pixels between the center and the resulting point.
     * @return {Object|Undefined} The resulting point expressed as an object with 'x' and 'y' properties.
     */

    pointTangent: function pointTangent(center, angle, distance) {
        if (center && angle !== null && distance !== null) {
            if (this.isPoint(center)) {
                var radians = this.radians;
                return { x: (distance * Math.cos(radians(angle))) + center.x, y: (distance * Math.sin(radians(angle))) + center.y };
            } else { VENT.warn("Could not calculate tangent. Invalid point data. (X: " + center.x + ", Y: " + center.y + ")"); }
        } else { VENT.warn("Could not calculate tangent. Missing required data. (Point: " + center + ", Angle: " + angle + ", Distance: " + distance + ")"); }
        return undefined;
    },

    /**
     * @description Interpolates between two points {x,y}.
     * @param a {Object} The first point {x,y}.
     * @param b {Object} The second point {x,y}.
     * @param ratio {Number} The amount to interpolate between the two points. Between 0 and 1.
     * @return {Object|Undefined} The interpolated point {x,y}.
     */

    pointLerp: function pointLerp(a,b,ratio) {
        if (!ratio || ratio < 0) { ratio = 0; }
        else if (ratio > 1) { ratio = 1; }
        if (a && b && ratio !== null) {
            if (this.isPoint(a) && this.isPoint(b)) {
                return { x: a.x + ((b.x - a.x) * ratio), y: a.y + ((b.y - a.y) * ratio) };
            } else { VENT.warn("Could not interpolate point. Invalid point."); }
        } else { VENT.warn("Could not interpolate point. Missing required data."); }
        return undefined;
    },

    /**
     * @description Converts degrees into radians.
     * @param degrees {Number}
     * @return {Number}
     */

    radians: function radians(degrees) {
        return (Math.PI / 180) * degrees;
    },

    /**
     * @description Validates if the argument is a point, an object with 'x' and 'y' properties.
     * @param point {Object} The object to test.
     * @return {Boolean}
     */

    isPoint: function isPoint(point) {
        return (point.hasOwnProperty("x") && point.hasOwnProperty("y"));
    }

};
