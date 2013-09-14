JCL.Arc = function(options) {

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

    // render()
    // Renders the arc on a JCL.Canvas instance.

    render: function(canvas) {
        if (canvas instanceof JCL.Canvas) { canvas.drawArc(this); }
        else { throw new TypeError('JCL.Arc.render() must be passed a JCL.Canvas.'); }
        return this;
    }

};