
/**
 * @class
 * @classdesc The circle class stores position and style properties for drawing circles.
 *
 * @param {object} [options]
 * @param {number} [options.x=0] The x coordinate of the circle's center.
 * @param {number} [options.y=0] The y coordinate of the circle's center.
 * @param {JCL.Point} [options.center] The JCL.Point instance indicating the circle's center.
 * @param {number} [options.radius=0] The radius of the circle, in pixels.
 * @param {string} [options.fill=null] The color to fill the circle.
 * @param {string} [options.stroke=null] The color to stroke the border of the circle.
 * @param {number} [options.thickness=0] The thickness of the circle's border.
 *
 * @property {JCL.Point} center The JCL.Point instance indicating the circle's center.
 * @property {number} radius The radius of the circle, in pixels.
 * @property {string} fillStyle The color to fill the circle.
 * @property {string} strokeStyle The color to stroke the border of the circle.
 * @property {number} lineWidth The thickness of the circle's border.
 *
 * @return {Object}
 */

JCL.Circle = function(options) {

    options = options || {};

    if (!options.center) {
        this.center = new JCL.Point(options.x || 0, options.y || 0);
    } else {
        if (options.center instanceof JCL.Point) { this.center = options.center; }
        else { this.center = new JCL.Point(options.center.x || 0, options.center.y || 0); }
    }

    this.radius = options.radius || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;

    return this;

};

JCL.Circle.prototype = {

    /**
     * @description Draws the circle on the specified canvas.
     * @param {JCL.Canvas} canvas An instance of JCL.Canvas.
     * @return {Object}
     */

    render: function(canvas) {
        if (canvas instanceof JCL.Canvas) { canvas.drawCircle(this); }
        else { throw new TypeError("JCL.Circle.render() must be passed a JCL.Canvas."); }
        return this;
    }

};