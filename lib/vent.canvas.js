/**
 * @namespace VENT.canvas
 */

VENT.canvas = (function() {

    /**
     * @description Draws a rectangle on the canvas.
     * @param ctx {Object} The canvas context to draw on.
     * @param x {Number} The distance from the left edge of the canvas to draw the left edge of the rectangle.
     * @param y {Number} The distance form the top edge of the canvas to draw the top edge of the rectangle.
     * @param w {Number} The width, in pixels, of the rectangle.
     * @param h {Number} The height, in pixels, of the rectangle.
     * @param fillStyle {String} The canvas style used to fill the rectangle.
     * @param strokeStyle {String} The canvas style used to stroke the rectangle.
     * @param lineWidth {Number} The stroke width of the rectangle.
     * @private
     */

    function _drawRectangle(ctx, x, y, w, h, fillStyle, strokeStyle, lineWidth) {

        if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fillRect(x, y, w, h);
        }

        if (strokeStyle) {
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth || 1;
            ctx.strokeRect(x, y, w, h);
        }

    }

    /**
     * @description Draws a path on the canvas.
     * @param ctx {Object} The canvas context used to draw the path.
     * @param steps {Object[]} An array of points {x,y} to draw sequentially.
     * @param strokeStyle {String} The canvas style used to stroke the path.
     * @param lineWidth {Number} The width of the path.
     * @private
     */

    function _drawPath(ctx, steps, strokeStyle, lineWidth) {

        var length = steps.length, i;

        ctx.strokeStyle = strokeStyle || "#000000";
        ctx.lineWidth = lineWidth || 1;
        ctx.beginPath();
        ctx.moveTo(steps[0].x, steps[0].y);
        for (i = 1; i<length; i++) {
            ctx.lineTo(steps[i].x, steps[i].y);
        }
        ctx.stroke();

    }

    /**
     * @description Draws a series of similar lines as a batch. More efficient than drawing them individually.
     * @param ctx {Object} The canvas context to draw the lines.
     * @param steps {Object[]} An array of points {x,y}. Each item in the array should contain an array of start and end points.
     * @param strokeStyle {String} The canvas stroke style.
     * @param lineWidth {Number} The width of the stroke.
     * @private
     */

    function _drawHaystack(ctx, steps, strokeStyle, lineWidth) {

        var length = steps.length, i;

        ctx.strokeStyle = strokeStyle || "#000000";
        ctx.lineWidth = lineWidth || 1;
        ctx.beginPath();
        for (i = 0; i<length; i++) {
            ctx.moveTo(steps[i][0].x, steps[i][0].y);
            ctx.lineTo(steps[i][1].x, steps[i][1].y);
        }
        ctx.stroke();

    }

    function _drawCircle(ctx, center, radius, fillStyle, strokeStyle, lineWidth){

        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, false);
        if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fill();
        }
        if (strokeStyle) {
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth || 1;
            ctx.stroke();
        }

    }

    function _drawText(ctx, str, pos, baseline, align, max, fillStyle) {
        if (fillStyle) { ctx.fillStyle = fillStyle; }
        ctx.font = "bold 10px sans-serif";
        if (baseline) { ctx.textBaseline = baseline; }
        if (align) { ctx.textAlign = align; }
        ctx.fillText(str, pos.x, pos.y, max ? max : null);
    }

    function _clearRect(ctx, x, y, w, h) {
        ctx.clearRect(x,y,w,h);
    }

    return {
        drawRectangle: _drawRectangle,
        drawPath: _drawPath,
        drawHaystack: _drawHaystack,
        drawCircle: _drawCircle,
        drawText: _drawText,
        clearRect: _clearRect
    }

}());