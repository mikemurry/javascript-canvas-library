/**
 * @namespace JCL.Arc
 */


/**
 * @class
 * @classdesc The arc class stores position and style properties for drawing arcs.
 *
 * @param {object} [options]
 * @param {number} [options.x=0] The x coordinate of the circle's center.
 * @param {number} [options.y=0] The y coordinate of the circle's center.
 * @param {JCL.Point} [options.center] The JCL.Point instance indicating the circle's center.
 * @param {number} [options.radius=0] The radius of the circle, in pixels.
 * @param {string} [options.fill=null] The color to fill the circle.
 * @param {string} [options.stroke=null] The color to stroke the border of the circle.
 * @param {number} [options.thickness=0] The thickness of the circle's border.
 * @param {number} [options.start=0] The starting angle of the arc in degrees.
 * @param {number} [options.end=360] The ending angle of the arc in degrees.
 *
 * @return {Object}
 */

JCL.Arc = function(options) {

    // Ensure options object exists.
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
    this.start = options.start || 0;
    this.end = options.end || 360;

};

JCL.Arc.prototype = {

    /**
     * @description Draws the circle on the specified canvas.
     * @param {JCL.Canvas} canvas An instance of JCL.Canvas.
     * @return {Object}
     */

    render: function(canvas) {
        if (canvas instanceof JCL.Canvas) { canvas.drawArc(this); }
        else { throw new TypeError('JCL.Arc.render() must be passed a JCL.Canvas.'); }
        return this;
    }

};