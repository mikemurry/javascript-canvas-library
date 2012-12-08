/**
 * @namespace JCL.Circle
 */

JCL.Circle = function Circle(center, radius, fillStyle, strokeStyle, lineWidth) {
    this.center = center;
    this.radius = radius;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
};

JCL.Circle.prototype = {

    render: function render(canvas) {
        if (canvas instanceof JCL.Canvas) { canvas.drawCircle(this); }
        else { JCL.error("Circle.render() context must be a JCL.Canvas."); }
        return this;
    }

};