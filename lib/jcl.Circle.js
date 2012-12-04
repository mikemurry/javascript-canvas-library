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

    render: function render(context) {

        if (context instanceof JCL.Canvas) {
            context.drawCircle(this.center, this.radius, this.fillStyle, this.strokeStyle, this.lineWidth);
        } else {
            JCL.error("Circle.render() context must be a JCL.Canvas.");
        }

    }

};