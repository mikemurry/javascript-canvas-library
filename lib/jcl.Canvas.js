/**
 * @namespace JCL.Canvas
 */

/**
 * @class The canvas class automatically calculates references to common canvas properties such as the 2d context and sizing information.
 * @param canvasId {String} The minimum range for the returned integer (inclusive).
 * @param options {Object} The maximum range for the returned integer (exclusive).
 * @return {Object}
 */

JCL.Canvas = function Canvas(canvasId, options) {

    options = options || {};
    this.options = options;

    if (typeof canvasId === "object") {
        this.dom = canvasId[0];
    } else {
        this.dom = document.getElementById(canvasId);
    }

    if (!this.dom) {
        JCL.error("Invalid Canvas DOM passed into the constructor.");
    } else {
        this.ctx = this.dom.getContext("2d");
        this.enabled = (this.ctx !== undefined);
    }

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

        // Handle Margins, Calculate Area
        options.margins = options.margins || [0,0,0,0];
        this.area = new JCL.Rectangle(
            options.margins[3],
            options.margins[0],
            this.width - options.margins[1] - options.margins[3],
            this.height - options.margins[0] - options.margins[2]
        );

    } else { JCL.warn("Canvas (ID: '" + canvasId + "') cannot be enabled."); }

    return this;

};

JCL.Canvas.prototype = {

    // Private Functions

    /**
     * @description Draws a rectangle on the canvas.
     * @param rect {Object} An instance of JCL.Rectangle.
     * @param fillStyle {String} The canvas style used to fill the rectangle.
     * @param strokeStyle {String} The canvas style used to stroke the rectangle.
     * @param lineWidth {Number} The stroke width of the rectangle.
     * @return {Object} The resulting canvas object.
     */

    drawRectangle: function drawRectangle(rect, fillStyle, strokeStyle, lineWidth) {

        if (fillStyle) {
            this.ctx.fillStyle = fillStyle;
            this.ctx.fillRect(Math.floor(rect.x) + 0.5, Math.floor(rect.y) + 0.5, rect.width, rect.height);
        }

        if (strokeStyle) {
            this.ctx.strokeStyle = strokeStyle;
            this.ctx.lineWidth = lineWidth || 1;
            this.ctx.strokeRect(Math.floor(rect.x) + 0.5, Math.floor(rect.y) + 0.5, rect.width, rect.height);
        }

        return this;

    },

    /**
     * @description Draws a path on the canvas.
     * @param steps {Object[]} An array of points {x,y} to draw sequentially.
     * @param strokeStyle {String} The canvas style used to stroke the path.
     * @param lineWidth {Number} The width of the path.
     * @return {Object} The resulting canvas object.
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

        return this;

    },

    /**
     * @description Draws a shape on the canvas.
     * @param steps {Object[]} An array of points {x,y} to draw sequentially.
     * @param fillStyle {String} The color to fill the path.
     * @param strokeStyle {String} The canvas style used to stroke the path.
     * @param lineWidth {Number} The width of the path.
     * @return {Object} The resulting canvas object.
     */

    drawShape: function drawPath(steps, fillStyle, strokeStyle, lineWidth) {

        var length = steps.length, i;

        this.ctx.strokeStyle = strokeStyle || "rgba(0,0,0,0)";
        this.ctx.lineWidth = lineWidth || 1;
        this.ctx.fillStyle = fillStyle || "rgba(0,0,0,0)";

        this.ctx.beginPath();
        this.ctx.moveTo(steps[0].x, steps[0].y);
        for (i = 1; i<length; i++) { this.ctx.lineTo(steps[i].x, steps[i].y); }
        this.ctx.closePath();

        this.ctx.stroke();
        this.ctx.fill();

        return this;

    },

    /**
     * @description Draws a series of similar lines as a batch. More efficient than drawing them individually.
     * @param steps {Object[]} An array of points {x,y}. Each item in the array should contain an array of start and end points.
     * @param strokeStyle {String} The canvas stroke style.
     * @param lineWidth {Number} The width of the stroke.
     * @return {Object} The resulting canvas object.
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

        return this;

    },

    /**
     * @description Draws a circle.
     * @param center {Object} A point object representing the center of the circle.
     * @param radius {Number} The radius of the circle.
     * @param fillStyle {String} The color to fill the path.
     * @param strokeStyle {String} The canvas style used to stroke the path.
     * @param lineWidth {Number} The width of the path.
     * @return {Object} The resulting canvas object.
     */

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
        return this;
    },

    /**
     * @description Draws an arc of a circle.
     * @param center {Object} A point object representing the center of the circle.
     * @param radius {Number} The radius of the circle.
     * @param start {Number} The starting angle in degrees.
     * @param end {Number} The ending angle in degrees.
     * @param fillStyle {String} The color to fill the path.
     * @param strokeStyle {String} The canvas style used to stroke the path.
     * @param lineWidth {Number} The width of the path.
     * @return {Object} The resulting canvas object.
     */

    drawArc: function drawArc(center, radius, start, end, fillStyle, strokeStyle, lineWidth){
        var degrees = JCL.utilities.radians;
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, degrees(start - 90), degrees(end - 90), false);
        if (fillStyle) {
            this.ctx.fillStyle = fillStyle;
            this.ctx.fill();
        }
        if (strokeStyle) {
            this.ctx.strokeStyle = strokeStyle;
            this.ctx.lineWidth = lineWidth || 1;
            this.ctx.stroke();
        }
        return this;
    },

    /**
     * @description Draws text.
     * @param str {String} The string of text to display.
     * @param font {String} The CSS font string to style the text.
     * @param pos {Object} A point object representing the location of the text.
     * @param baseline {String} Bottom, middle, top.
     * @param align {String} Left, right, or center.
     * @param fillStyle {String} The fillStyle used to display the text.
     * @return {Object} The resulting canvas object.
     */

    drawText: function drawText(str, font, pos, baseline, align, fillStyle) {
        if (fillStyle) { this.ctx.fillStyle = fillStyle; }
        this.ctx.font = "bold 10px sans-serif";
        if (baseline) { this.ctx.textBaseline = baseline; }
        if (align) { this.ctx.textAlign = align; }
        if (font) { this.ctx.font = font; }
        this.ctx.fillStyle = fillStyle || "black";
        this.ctx.fillText(str, pos.x, pos.y);
        return this;
    },

    drawImage: function drawRemoteImage(url, x, y, width, height) {
        var i = new Image(), that = this;
        i.onload = function() {
            that.ctx.drawImage(i, x, y, width, height);
        };
        i.src = url;
        return this;

    },

    /**
     * @description Draws the canvas at the specified rectangle.
     * @param x {Number} The x coordinate to start clearing from.
     * @param y {Number} The y coordinate to start clearing from.
     * @param w {Number} The width of the rectangle to clear.
     * @param h {Number} The height of the rectangle to clear.
     * @return {Object} The resulting canvas object.
     */

    clearRect: function clearRect(x, y, w, h) {
        this.ctx.clearRect(x,y,w,h);
        return this;
    },

    /**
     * @description Clears the entire canvas.
     * @return {Object} The resulting canvas object.
     */

    clear: function clear() {
        this.ctx.clearRect(0,0,this.dom.width,this.dom.height);
        return this;
    }

};