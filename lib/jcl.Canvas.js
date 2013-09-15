

JCL.Canvas = function(canvasId, options) {

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

    // Check if canvas element.
    if (this.dom && this.dom.getContext) {

        // TODO: Check for CANVAS tag name.

        this.ctx = this.dom.getContext("2d");
        this.enabled = (this.ctx !== undefined);
    }

    if (this.enabled) {

        // Handle Manual Height/Width Options
        if (options.width) { this.dom.width = options.width; }
        if (options.height) { this.dom.height = options.height; }

        // Handle Z-Index Option
        if (options.zindex) {
            this.dom.style.zIndex = options.zindex;
        }

        // Write size properties.
        this.width = this.dom.width;
        this.height = this.dom.height;

        // Ensure width and height attributes are accurate on the DOM.
        this.dom.setAttribute('width', this.width);
        this.dom.setAttribute('height', this.height);

    } else {
        throw new ReferenceError("Could not instantiate JCL.Canvas with specified DOM element.");
    }

    return this;

};

JCL.Canvas.prototype = {

    // Delegates the specific draw method to the object.

    draw: function(obj) {

        // If the object has a render function, render it.
        if (obj.render) {
            obj.render(this);
        }

        // Silently fail if no render function is found.
        return this;

    },

    // Draws a JCL.Rectangle instance on the canvas.

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
            throw new TypeError("Cannot draw a rectangle without a JCL.Rectangle instance.");
        }

        return this;

    },

    // drawPath()
    // Draws a path on the canvas.
    // Steps is expected to be an array of {x,y} objects.

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

    // drawShape()
    // Draws a filled path on the canvas.
    // Steps is expected to be an array of {x,y} objects.

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

    // drawHaystack()
    // Efficiently draws a collection of disconnected lines of the same style.
    // Steps is expected to be an array of [{x,y},{x,y}] arrays.

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

    // drawCircle()
    // Draws a JCL.Circle instance on the canvas.

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

    // drawCircles()
    // Efficiently draws multiple circles of the same style on the canvas.
    // Will copy the style properties from the first circle in the array.

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

    // drawArc()
    // Draws a JCL.Arc instance on the canvas.

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

    // drawOval()
    // Draws an JCL.Oval instance on the canvas.

    drawOval: function(oval) {

        var kappa, cx, cy;

        kappa = .5522848;
        cx = (oval.width / 2) * kappa;
        cy = (oval.height / 2) * kappa;

        this.ctx.beginPath();
        this.ctx.moveTo(oval.start.x, oval.mid.y);
        this.ctx.bezierCurveTo(oval.start.x, oval.mid.y - cy, oval.mid.x - cx, oval.start.y, oval.mid.x, oval.start.y);
        this.ctx.bezierCurveTo(oval.mid.x + cx, oval.start.y, oval.end.x, oval.mid.y - cy, oval.end.x, oval.mid.y);
        this.ctx.bezierCurveTo(oval.end.x, oval.mid.y + cy, oval.mid.x + cx, oval.end.y, oval.mid.x, oval.end.y);
        this.ctx.bezierCurveTo(oval.mid.x - cx, oval.end.y, oval.start.x, oval.mid.y + cy, oval.start.x, oval.mid.y);
        this.ctx.closePath();

        if (oval.fillStyle) {
            this.ctx.fillStyle = oval.fillStyle;
            this.ctx.fill();
        }
        if (oval.strokeStyle) {
            this.ctx.strokeStyle = oval.strokeStyle;
            this.ctx.lineWidth = oval.lineWidth || 1;
            this.ctx.stroke();
        }

        return this;

    },

    // drawText()
    // Draws text on the canvas.

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

    // drawImage()
    // Draws an image on the canvas.

    drawImage: function(img, x, y, width, height) {
        this.ctx.drawImage(img, x, y, width, height);
        return this;
    },

    // drawImageExt()
    // Draws an image on the canvas with extended options.

    drawImageExt: function(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        this.ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        return this;
    },

    // drawRemoteImage()
    // Draws an image from a remote URL on the canvas.

    drawRemoteImage: function(url, x, y, width, height) {
        var i = new Image(), that = this;
        i.onload = function() {
            that.drawImage(i, x, y, width, height);
        };
        i.src = url;
        return this;
    },

    // clearRect()
    // Clears the canvas in the specified rectangle.

    clearRect: function(x, y, w, h) {
        this.ctx.clearRect(x,y,w,h);
        return this;
    },

    // clear()
    // Clears the entire canvas.

    clear: function() {
        this.ctx.clearRect(0,0,this.dom.width,this.dom.height);
        return this;
    },

    // save()
    // Saves the current canvas transform state.

    save: function() {
        this.ctx.save();
        return this;
    },

    // restore()
    // Restores the saved canvas transform state.

    restore: function() {
        this.ctx.restore();
        return this;
    },

    // translate()
    // Translates the canvas transform.

    translate: function(x, y) {
        this.ctx.translate(x, y);
        return this;
    },

    // rotate()
    // Rotates the canvas transform.

    rotate: function(degs) {
        this.ctx.rotate(degs);
        return this;
    }

};