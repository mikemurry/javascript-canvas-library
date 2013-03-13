
/**
 * @class
 * @classdesc The rectangle class stores position and style properties for drawing rectangles.
 *
 * @param {object} [options]
 * @param {number} [options.x=0] The position of the rectangle's left edge.
 * @param {number} [options.y=0] The position of the rectangle's top edge.
 * @param {number} [options.width=0] The width of the rectangle.
 * @param {number} [options.height=0] The height of the rectangle.
 * @param {string} [options.fill=null] The color to fill the circle.
 * @param {string} [options.stroke=null] The color to stroke the border of the circle.
 * @param {number} [options.thickness=0] The thickness of the circle's border.
 *
 * @property {number} x The position of the rectangle's left edge.
 * @property {number} y The position of the rectangle's top edge.
 * @property {number} width The width of the rectangle.
 * @property {number} height The height of the rectangle.
 * @property {string} fillStyle The color to fill the circle.
 * @property {string} strokeStyle The color to stroke the border of the circle.
 * @property {number} lineWidth The thickness of the circle's border.
 *
 * @return {Object}
 */


JCL.Rectangle = function(options) {

    options = options || {};

    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;
    //this.pivot = new JCL.Point(0,0);
    return this;
};

JCL.Rectangle.prototype = {

    set: function (x, y, width, height) {
        this.x = x || this.width || 0;
        this.y = y || this.y || 0;
        this.width = width || this.width || 0;
        this.height = height || this.height || 0;
        return this;
    },


    /**
     * @description Returns a simplified object representing the point's coordinates.
     * @return {Object}
     */

    toJSON: function() {
        return { x: this.x, y: this.y, width: this.width, height: this.height, fillStyle: this.fillStyle, strokeStyle: this.strokeStyle, lineWidth: this.lineWidth };
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
     * @param {JCL.Canvas} canvas The JCL.Canvas instance to render to.
     * @return {*}
     */

    render: function(canvas){
        if (canvas instanceof JCL.Canvas) { canvas.drawRectangle(this); }
        else { JCL.error("Specified canvas is not an instance of JCL.Canvas."); }
        return this;
    }

};