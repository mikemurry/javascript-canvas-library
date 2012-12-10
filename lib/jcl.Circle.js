/**
 * @namespace JCL.Circle
 */

JCL.Circle = function Circle(options) {

    this.x = options.x || 0;
    this.y = options.y || 0;

    if (options.hasOwnProperty('center')){
        if (options.center instanceof JCL.Point) {
            this.center = options.center;
        } else {
            this.center = new JCL.Point(options.center.x || 0, options.center.y || 0);
        }
    }

    if (options.hasOwnProperty('x')) { this.center.x = options.x; }
    if (options.hasOwnProperty('y')) { this.center.y = options.y; }

    this.radius = options.radius || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;

};

JCL.Circle.prototype = {

    render: function render(canvas) {
        if (canvas instanceof JCL.Canvas) { canvas.drawCircle(this); }
        else { JCL.error("Circle.render() context must be a JCL.Canvas."); }
        return this;
    }

};