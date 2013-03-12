/**
 * @namespace JCL.Canvas
 */


/**
 * @class
 * @classdesc The canvas class creates a platform for all draw calls.
 *
 * @param {*} canvasId The name of the canvas element's ID or a reference to the element itself.
 * @param {object} [options]
 * @param {number} [options.width] Overrides the element's width.
 * @param {number} [options.height] Overrides the element's height.
 * @param {boolean} [options.fullscreen] Sets the canvas to match the size of the window element.
 * @param {number} [options.zindex] Overrides the z-index of the canvas element.
 *
 * @property {boolean} enabled Represents if the canvas object is valid or not.
 *
 * @return {Object}
 */

JCL.Canvas = function(canvasId, options) {

    var that = this;

    options = options || {};
    this.options = options;

    if (typeof canvasId === "object") {
        if (canvasId.length) {
            // Assume jQuery Object
            this.dom = canvasId[0];
        } else {
            // Assume raw DOM element.
            this.dom = canvasId;
        }
    } else {
        // Assume ID string
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

        this.dom.onmousemove = function(e) {
            if (that.rollover) { that.rollover(e); }
        };

        this.dom.onmouseout = function(e) {
            if (that.rollout) { that.rollout(e); }
        };

    } else { JCL.warn("Canvas (ID: '" + canvasId + "') cannot be enabled."); }

    return this;

};

JCL.Canvas.prototype = {

    // Private Functions

    /**
     * @description Draws a rectangle on the canvas.
     * @param rect {JCL.Rectangle} An instance of JCL.Rectangle.
     * @return {Object} The resulting canvas object.
     */

    drawRectangle: function(rect) {

        if (rect instanceof JCL.Rectangle) {

            if (rect.fillStyle) {
                this.ctx.fillStyle = rect.fillStyle;
                this.ctx.fillRect(Math.floor(rect.x) + 0.5, Math.floor(rect.y) + 0.5, rect.width, rect.height);
            }

            if (rect.strokeStyle) {
                this.ctx.strokeStyle = rect.strokeStyle;
                this.ctx.lineWidth = rect.lineWidth || 1;
                this.ctx.strokeRect(Math.floor(rect.x) + 0.5, Math.floor(rect.y) + 0.5, rect.width, rect.height);
            }

        } else {
            JCL.warn("Cannot draw a rectangle without a JCL.Rectangle instance.");
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

    drawPath: function(steps, strokeStyle, lineWidth) {

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

    drawShape: function(steps, fillStyle, strokeStyle, lineWidth) {

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

    drawHaystack: function(steps, strokeStyle, lineWidth) {

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
     * @param circle {JCL.Circle} An instance of a JCL.Circle.
     * @return {Object} The resulting canvas object.
     */

    drawCircle: function(circle){

        this.ctx.beginPath();
        this.ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, Math.PI * 2, false);
        if (circle.fillStyle) {
            this.ctx.fillStyle = circle.fillStyle;
            this.ctx.fill();
        }
        if (circle.strokeStyle) {
            this.ctx.strokeStyle = circle.strokeStyle;
            this.ctx.lineWidth = circle.lineWidth || 1;
            this.ctx.stroke();
        }
        return this;
    },

    drawCircles: function(circles) {

        var i, max, circle, sample;

        if (circles.length > 0) {

            sample = circles[0];

            this.ctx.beginPath();

            max = circles.length;
            for (i=0; i<max; i++) {
                circle = circles[i];
                this.ctx.moveTo(circle.center.x, circle.center.y);
                this.ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, Math.PI * 2, false);
            }
            if (sample.fillStyle) {
                this.ctx.fillStyle = sample.fillStyle;
                this.ctx.fill();
            }
            if (sample.strokeStyle) {
                this.ctx.strokeStyle = sample.strokeStyle;
                this.ctx.lineWidth = sample.lineWidth || 1;
                this.ctx.stroke();
            }

        }

        return this;

    },

    /**
     * @description Draws an arc.
     * @param arc {JCL.Arc} An instance of a JCL.Arc.
     * @return {Object}
     */


    drawArc: function(arc){
        var degrees = JCL.utilities.radians;
        this.ctx.beginPath();
        this.ctx.arc(arc.center.x, arc.center.y, arc.radius, degrees(arc.start - 90), degrees(arc.end - 90), false);
        if (arc.fillStyle) {
            this.ctx.fillStyle = arc.fillStyle;
            this.ctx.fill();
        }
        if (arc.strokeStyle) {
            this.ctx.strokeStyle = arc.strokeStyle;
            this.ctx.lineWidth = arc.lineWidth || 1;
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

    drawText: function(str, font, pos, baseline, align, fillStyle) {
        if (fillStyle) { this.ctx.fillStyle = fillStyle; }
        this.ctx.font = "bold 10px sans-serif";
        if (baseline) { this.ctx.textBaseline = baseline; }
        if (align) { this.ctx.textAlign = align; }
        if (font) { this.ctx.font = font; }
        this.ctx.fillStyle = fillStyle || "black";
        this.ctx.fillText(str, pos.x, pos.y);
        return this;
    },

    drawImage: function(img, x, y, width, height) {
        this.ctx.drawImage(img, x, y, width, height);
        return this;
    },

    drawImageExt: function(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        this.ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        return this;
    },

    drawRemoteImage: function(url, x, y, width, height) {
        var i = new Image(), that = this;
        i.onload = function() {
            that.drawImage(i, x, y, width, height);
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

    clearRect: function(x, y, w, h) {
        this.ctx.clearRect(x,y,w,h);
        return this;
    },

    /**
     * @description Clears the entire canvas.
     * @return {Object} The resulting canvas object.
     */

    clear: function() {
        this.ctx.clearRect(0,0,this.dom.width,this.dom.height);
        return this;
    },

    save: function() {
        this.ctx.save();
        return this;
    },

    restore: function() {
        this.ctx.restore();
        return this;
    },

    translate: function(x, y) {
        this.ctx.translate(x, y);
        return this;
    },

    rotate: function(degs) {
        this.ctx.rotate(degs);
        return this;
    }

};