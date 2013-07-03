
/**
 * @class
 * @classdesc The rectangle class stores position and style properties for drawing rectangles.
 *
 * @param {object} [options]
 * @param {number} [options.x=0] The position of the oval's left edge.
 * @param {number} [options.y=0] The position of the oval's top edge.
 * @param {number} [options.width=0] The width of the oval.
 * @param {number} [options.height=0] The height of the oval.
 * @param {number} [options.depth=0] The depth of the oval.
 * @param {string} [options.fill=null] The color to fill the oval.
 * @param {string} [options.stroke=null] The color to stroke the border of the oval.
 * @param {number} [options.thickness=0] The thickness of the oval's border.
 *
 * @property {number} x The position of the oval's left edge.
 * @property {number} y The position of the oval's top edge.
 * @property {number} width The width of the oval.
 * @property {number} height The height of the oval.
 * @property {string} fillStyle The color to fill the oval.
 * @property {string} strokeStyle The color to stroke the border of the oval.
 * @property {number} lineWidth The thickness of the oval's border.
 *
 * @return {Object}
 */


JCL.Oval = function(options) {

    options = options || {};

    this.x = options.x || 0;
    this.y = options.y || 0;
    this.z = options.z || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.depth = options.depth || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;

    this.calculate();

    return this;
};

JCL.Oval.prototype = {

    /**
     * Calculates the start, mid, and end points required to calculate the bezier curves.
     * @returns {*}
     */

    calculate: function () {
        this.start = new JCL.Point(this.x, this.y);
        this.end = new JCL.Point(this.x + this.width, this.y + this.height);
        this.mid = new JCL.Point((this.x + this.width) / 2, (this.y + this.height) / 2);
        return this;
    },

    /**
     * center()
     * Calculates the center point of the oval, or if a point is passed in, adjusts the oval's location to match the provided center point.
     * @param {JCL.Point} point The JCL.Point to recenter the object to.
     * @return {Object} The resulting point.
     */

    center: function(point) {
        if (point) {
            this.x = point.x - (this.width / 2);
            this.y = point.y - (this.height / 2);
            this.z = point.z - (this.depth / 2);
            this.calculate();
            return this;
        } else {
            return new JCL.Point(this.x + (this.width / 2), this.y + (this.height / 2), this.z + (this.depth / 2));
        }
    },

    /**
     * render()
     * Draws the rectangle to the screen using the passed canvas.
     * @param {JCL.Canvas} canvas The JCL.Canvas instance to render to.
     * @return {*}
     */

    render: function(canvas){
        if (canvas instanceof JCL.Canvas) { canvas.drawOval(this); }
        else { JCL.error("Specified canvas is not an instance of JCL.Canvas."); }
        return this;
    }

};