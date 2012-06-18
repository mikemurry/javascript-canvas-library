/**
 * @namespace JCL.canvas
 */

JCL.Canvas = function Canvas(canvasId, options) {

    this.dom = document.getElementById(canvasId);
    this.ctx = this.dom.getContext("2d");
    this.enabled = (this.ctx !== undefined);

    if (this.enabled) {

        // Handle Manual Height/Width Options
        if (options.width) { this.dom.width = options.width; }
        if (options.height) { this.dom.height = options.height; }

        // Handle Full Screen Option
        if (options.fullscreen) {
            this.dom.width = window.innerWidth;
            this.dom.height = window.innerHeight;
        }

        // Handle Z-Index Option
        if (options.zindex) {
            this.dom.style.zIndex = options.zindex;
        }

        this.width = this.dom.width;
        this.height = this.dom.height;

    } else { JCL.warn("Canvas (ID: '" + canvasId + "') cannot be enabled."); }

};

JCL.Canvas.prototype = {

    // Private Functions

    /**
     * @description Draws a rectangle on the canvas.
     * @param x {Number} The distance from the left edge of the canvas to draw the left edge of the rectangle.
     * @param y {Number} The distance form the top edge of the canvas to draw the top edge of the rectangle.
     * @param w {Number} The width, in pixels, of the rectangle.
     * @param h {Number} The height, in pixels, of the rectangle.
     * @param fillStyle {String} The canvas style used to fill the rectangle.
     * @param strokeStyle {String} The canvas style used to stroke the rectangle.
     * @param lineWidth {Number} The stroke width of the rectangle.
     * @private
     */

    drawRectangle: function drawRectangle(x, y, w, h, fillStyle, strokeStyle, lineWidth) {

        if (fillStyle) {
            this.ctx.fillStyle = fillStyle;
            this.ctx.fillRect(x, y, w, h);
        }

        if (strokeStyle) {
            this.ctx.strokeStyle = strokeStyle;
            this.ctx.lineWidth = lineWidth || 1;
            this.ctx.strokeRect(x, y, w, h);
        }

    },

    /**
     * @description Draws a path on the canvas.
     * @param steps {Object[]} An array of points {x,y} to draw sequentially.
     * @param strokeStyle {String} The canvas style used to stroke the path.
     * @param lineWidth {Number} The width of the path.
     * @private
     */

    drawPath: function drawPath(steps, strokeStyle, lineWidth) {

        var length = steps.length, i;

        this.ctx.strokeStyle = strokeStyle || "#000000";
        this.ctx.lineWidth = lineWidth || 1;
        this.ctx.beginPath();
        this.ctx.moveTo(steps[0].x, steps[0].y);
        for (i = 1; i<length; i++) {
            this.ctx.lineTo(steps[i].x, steps[i].y);
        }
        this.ctx.stroke();

    },

    /**
     * @description Draws a series of similar lines as a batch. More efficient than drawing them individually.
     * @param steps {Object[]} An array of points {x,y}. Each item in the array should contain an array of start and end points.
     * @param strokeStyle {String} The canvas stroke style.
     * @param lineWidth {Number} The width of the stroke.
     * @private
     */

    drawHaystack: function drawHaystack(steps, strokeStyle, lineWidth) {

        var length = steps.length, i;

        this.ctx.strokeStyle = strokeStyle || "#000000";
        this.ctx.lineWidth = lineWidth || 1;
        this.ctx.beginPath();
        for (i = 0; i<length; i++) {
            this.ctx.moveTo(steps[i][0].x, steps[i][0].y);
            this.ctx.lineTo(steps[i][1].x, steps[i][1].y);
        }
        this.ctx.stroke();

    },

    drawCircle: function drawCircle(center, radius, fillStyle, strokeStyle, lineWidth){
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, false);
        if (fillStyle) {
            this.ctx.fillStyle = fillStyle;
            this.ctx.fill();
        }
        if (strokeStyle) {
            this.ctx.strokeStyle = strokeStyle;
            this.ctx.lineWidth = lineWidth || 1;
            this.ctx.stroke();
        }
    },

    drawText: function drawText(str, pos, baseline, align, max, fillStyle) {
        if (fillStyle) { this.ctx.fillStyle = fillStyle; }
        this.ctx.font = "bold 10px sans-serif";
        if (baseline) { this.ctx.textBaseline = baseline; }
        if (align) { this.ctx.textAlign = align; }
        this.ctx.fillText(str, pos.x, pos.y, max ? max : null);
    },

    clearRect: function clearRect(x, y, w, h) {
        this.ctx.clearRect(x,y,w,h);
    },

    clear: function clear() {
        this.ctx.clearRect(0,0,this.dom.width,this.dom.height);
    }

};