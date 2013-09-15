

JCL.Rectangle = function(options) {

    options = options || {};

    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;

    return this;

};

JCL.Rectangle.prototype = {

    // set()
    // Updates the size of the rectangle.

    set: function (x, y, width, height) {
        this.x = x || this.width || 0;
        this.y = y || this.y || 0;
        this.width = width || this.width || 0;
        this.height = height || this.height || 0;
        return this;
    },

    // center()
    // If a point is passed, will center the rectangle on the point.
    // Otherwise, it will return the center of the rectangle.

    center: function(point) {
        if (point) {
            this.set(point.x - (this.width / 2), point.y-(this.height / 2));
            return this;
        } else {
            return new JCL.Point(this.x + (this.width / 2), this.y + (this.height / 2));
        }
    },

    // round()
    // Rounds the coordinates of a rectangle to the nearest pixel.

    round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    },

    // render()
    // Draws the rectangle on the JCL.Canvas.

    render: function(canvas){
        if (canvas instanceof JCL.Canvas) { canvas.drawRectangle(this); }
        else { JCL.error("Specified canvas is not an instance of JCL.Canvas."); }
        return this;
    }

};