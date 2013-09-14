JCL.Oval = function(options) {

    options = options || {};

    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;

    this.calculate();

    return this;
};

JCL.Oval.prototype = {

    // calculate()
    // Calculates the points required for generating the bezier curves.

    calculate: function () {
        this.start = new JCL.Point(this.x, this.y);
        this.end = new JCL.Point(this.x + this.width, this.y + this.height);
        this.mid = new JCL.Point((this.x + this.width) / 2, (this.y + this.height) / 2);
        return this;
    },

    // center()
    // Calculates the center of the oval

    center: function(point) {
        if (point) {
            this.x = point.x - (this.width / 2);
            this.y = point.y - (this.height / 2);
            this.calculate();
            return this;
        } else {
            return new JCL.Point(this.x + (this.width / 2), this.y + (this.height / 2));
        }
    },

    // render()
    // Draws the oval on the JCL.Canvas.

    render: function(canvas){
        if (canvas instanceof JCL.Canvas) { canvas.drawOval(this); }
        else { JCL.error("Specified canvas is not an instance of JCL.Canvas."); }
        return this;
    }

};