

JCL.Point = function (x, y) {

    if (arguments.length === 1) {
        y = x.y || 0;
        x = x.x || 0;
    }

    return this.set(x,y);
};

JCL.Point.prototype = {

    // set()
    // Updates the coordinates of the point.

    set: function(x,y) {
        this.x = x || this.x || 0;
        this.y = y || this.y || 0;
        return this;
    },

    // toJSON()
    // Returns a simple object representing the coordinates.

    toJSON: function() {
        return { x: this.x, y: this.y};
    },

    // distance()
    // Calculates the distance between this and another JCL.Point.

    distance: function(a) {

        // TODO: Check if simple {x,y} argument.

        if (a instanceof JCL.Point) { return Math.sqrt(Math.pow(a.x- this.x, 2) + Math.pow(a.y- this.y,2)); }
        else { throw new TypeError("Cannot calculate distance of a non-point."); }

    },

    // angle()
    // Calculates the angle connecting this and another JCL.Point.

    angle: function(a) {

        // TODO: Check if simple {x,y} argument.

        if (a instanceof JCL.Point) { return Math.atan2(a.y- this.y, a.x - this.x); }
        else { throw new TypeError("Cannot calculate angle of a non-point."); }

    },

    // tangent()
    // Returns a point at the specified angle and distance from the point.

    tangent: function(degrees, distance) {

        var radians = JCL.utilities.radians;

        if (degrees !== null && distance !== null) {
            return new JCL.Point((distance * Math.cos(radians(degrees))) + this.x, (distance * Math.sin(radians(degrees))) + this.y);
        } else {
            throw new Error("Could not calculate tangent. Missing required data. (Angle: " + degrees + ", Distance: " + distance + ")");
        }

    },

    // lerp()
    // Interpolates a third point at the specified ratio between this and another point.

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

    // round()
    // Rounds the coordinates of a point to the nearest pixel.

    round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    },

    // crisp()
    // Adjusts for sub-pixel blurring by centering the point around a pixel.

    crisp: function() {
        this.round().translate(-.5, -.5);
        return this;
    },

    // translate
    // Moves a point by the specified coordinates, optionally returning a new instance.

    translate: function(x, y, copy) {
        if (copy) { return new JCL.Point(this.x + (x || 0), this.y + (y || 0)); }
        return this.set(this.x + (x || 0), this.y + (y || 0));
    }

};