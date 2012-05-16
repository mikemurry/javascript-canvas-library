VENT.namespace("components.canvas");

/** @namespace VENT.canvas */

VENT.canvas = (function() {

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
        drawCircle: _drawCircle,
        drawText: _drawText,
        clearRect: _clearRect
    }

}());