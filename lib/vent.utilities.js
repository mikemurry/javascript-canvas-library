VENT.utilities = {

    /**
     *
     * @param min
     * @param max
     * @return {Number}
     */

    randomInt: function randomInt(min, max) {
        if (min && max) {
            return Math.round((max - min) * Math.random()) + min;
        } else { VENT.warn("utilities.randomInt() Error: Missing min or max argument."); }
        return false;
    },

    pointTangent: function pointTangent(point, angle, distance) {
        if (point && angle !== null && distance !== null) {
            if (this.isPoint(point)) {
                var deg = this.degrees;
                return { x: (distance * Math.cos(deg(angle))) + point.x, y: (distance * Math.sin(deg(angle))) + point.y };
            } else { VENT.warn("Could not calculate tangent. Invalid point data. (X: " + point.x + ", Y: " + point.y + ")"); }
        } else { VENT.warn("Could not calculate tangent. Missing required data. (Point: " + point + ", Angle: " + angle + ", Distance: " + distance + ")"); }
        return false;
    },

    pointLerp: function pointLerp(a,b,ratio) {
        if (a && b && ratio !== null) {
            if (this.isPoint(a) && this.isPoint(b)) {
                return { x: a.x + ((b.x - a.x) * ratio), y: a.y + ((b.y - a.y) * ratio) };
            } else { VENT.warn("Could not interpolate point. Invalid point."); }
        } else { VENT.warn("Could not interpolate point. Missing required data."); }
        return false;
    },

    degrees: function degrees(num) {
        return (Math.PI / 180) * num;
    },

    isPoint: function isPoint(point) {
        return (point.hasOwnProperty("x") && point.hasOwnProperty("y"));
    }

};
