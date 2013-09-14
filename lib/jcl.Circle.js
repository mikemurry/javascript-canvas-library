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

    // render()
    // Renders the circle on a JCL.Canvas instance.

    render: function(canvas) {
        if (canvas instanceof JCL.Canvas) { canvas.drawCircle(this); }
        else { throw new TypeError("JCL.Circle.render() must be passed a JCL.Canvas."); }
        return this;
    }

};