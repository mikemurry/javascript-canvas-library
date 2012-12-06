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

    constructor: JCL.Rectangle,

    set: function set(x,y,width,height,fillStyle, strokeStyle, lineWidth) {

        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.fillStyle = fillStyle || null;
        this.strokeStyle = strokeStyle || null;
        this.lineWidth = lineWidth || 0;

        return this;

    },

    /**
     * @description Returns a simplified object representing the point's coordinates.
     * @return {Object}
     */

    get: function() {
        return { x: this.x, y: this.y, width: this.width, height: this.height, fillStyle: this.fillStyle, strokeStyle: this.strokeStyle, lineWidth: this.lineWidth };
    },

    /**
     * @description Prints the current coordinates as a string.
     * @return {String}
     */

    toString: function() {
        return "Rectangle( x:" + this.x + ", y:" + this.y + ", width:" + this.width + ", height:" + this.height + ", fillStyle:" + this.fillStyle + ", strokeStyle:" + this.strokeStyle + ", lineWidth:" + this.lineWidth + ")";
    },

    /**
     * @description Calculates the center point of the rectangle, or if a point is passed in, adjusts the rectangle's location to match the provided center point.
     * @return {Object} The resulting point.
     */

    center: function(point) {
        if (point) {
            this.set(point.x - (this.width / 2), point.y-(this.height / 2), point.z-(this.depth / 2), this.width, this.height, this.depth);
            return this;
        } else {
            return new JCL.Point(this.x + (this.width / 2), this.y + (this.height / 2), this.z + (this.depth / 2));
        }
    },

    /**
     * round()
     * Converts properties into integers to prevent expensive sub-pixel rendering.
     * @return {*}
     */

    round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    },

    /**
     * render()
     * Draws the rectangle to the screen using the passed canvas.
     * @param canvas The JCL.Canvas instance to render to.
     * @return {*}
     */

    render: function (canvas){
        canvas.drawRectangle(this);
        return this;
    }

};