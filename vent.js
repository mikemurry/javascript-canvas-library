/**
 * @namespace VENT
 */

var VENT = VENT || {

    log: function log(msg) {
        console.log(msg);
    },

    info: function info(msg) {
        console.info(msg);
    },

    warn: function warn(msg) {
        console.warn(msg);
    },

    error: function error(msg) {
        console.error(msg);
    }

};

/**
 * @description Safely augments the VENT namespace to include the specified path.
 * @param ns {String} A dot separated namespace. Prefixing with "VENT." is optional.
 * @return {Object} Returns the VENT object.
 */

VENT.namespace = function(ns) {

    var parts, parent, i, count;

    parent = VENT;
    parts = ns.split(".");

    // Skip Redundant Top Level
    if (parts[0] === "VENT") {
        parts = parts.slice(1);
    }

    count = parts.length;

    for (i=0; i < count; i++) {

        // Create a property if it doesn't exist.
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }

        // Set parent to new property.
        parent = parent[parts[i]];

    }

    return parent;

};/**
 * @namespace VENT.utilities
 */

VENT.utilities = {

    /**
     * @description Returns an integer between the specified minimum (inclusive) and maximum (exclusive).
     * @param min {Number} The minimum range for the returned integer (inclusive).
     * @param max {Number} The maximum range for the returned integer (exclusive).
     * @return {Number}
     */

    randomInt: function randomInt(min, max) {
        if (min !== undefined && max !== undefined) {
            return Math.floor((max - min) * Math.random()) + min;
        } else { VENT.warn("utilities.randomInt() Error: Missing min or max argument."); }
        return false;
    },

    /**
     * @description Calculates a point {x,y} at the specified angle and distance from the base point.
     * @param center {Object} The center point {x,y} to base the resulting point.
     * @param angle {Number} The number of degrees to rotate the resulting point around the center (0 is pointing right).
     * @param distance {Number} The number of pixels between the center and the resulting point.
     * @return {Object|Undefined} The resulting point expressed as an object with 'x' and 'y' properties.
     */

    pointTangent: function pointTangent(center, angle, distance) {

        var radians = VENT.utilities.radians;

        if (center && angle !== null && distance !== null) {
            if (VENT.utilities.isPoint(center)) {
                return { x: (distance * Math.cos(radians(angle))) + center.x, y: (distance * Math.sin(radians(angle))) + center.y };
            } else { VENT.warn("Could not calculate tangent. Invalid point data. (X: " + center.x + ", Y: " + center.y + ")"); }
        } else { VENT.warn("Could not calculate tangent. Missing required data. (Point: " + center + ", Angle: " + angle + ", Distance: " + distance + ")"); }
        return undefined;
    },

    /**
     * @description Interpolates between two points {x,y}.
     * @param a {Object} The first point {x,y}.
     * @param b {Object} The second point {x,y}.
     * @param ratio {Number} The amount to interpolate between the two points. Between 0 and 1.
     * @return {Object|Undefined} The interpolated point {x,y}.
     */

    pointLerp: function pointLerp(a,b,ratio) {
        if (!ratio || ratio < 0) { ratio = 0; }
        else if (ratio > 1) { ratio = 1; }
        if (a && b && ratio !== null) {
            if (this.isPoint(a) && this.isPoint(b)) {
                return { x: a.x + ((b.x - a.x) * ratio), y: a.y + ((b.y - a.y) * ratio) };
            } else { VENT.warn("Could not interpolate point. Invalid point."); }
        } else { VENT.warn("Could not interpolate point. Missing required data."); }
        return undefined;
    },

    /**
     * @description Converts degrees into radians.
     * @param degrees {Number}
     * @return {Number}
     */

    radians: function radians(degrees) {
        return (Math.PI / 180) * degrees;
    },

    /**
     * @description Converts radians into degrees.
     * @param radians {Number}
     * @return {Number}
     */

    degrees: function degrees(radians) {
        return radians * (180 / Math.PI);
    },

    /**
     * @description Validates if the argument is a point, an object with 'x' and 'y' properties.
     * @param point {Object} The object to samples.
     * @return {Boolean}
     */

    isPoint: function isPoint(point) {
        return (point.hasOwnProperty("x") && point.hasOwnProperty("y"));
    },

    createFragment: function createFragment(id, htmlStr) {
        var frag = document.createDocumentFragment(), temp = document.createElement("div");
        temp.id = id;
        temp.innerHTML = htmlStr;
        while (temp.firstChild) { frag.appendChild(temp.firstChild); }
        return frag;
    }

};
/**
 * @namespace VENT.renderer
 */

VENT.renderer = (function() {

    // requestAnimationFrame Shim
    window.requestAnimFrame = (function requestAnimFrame() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
    })();

    var _list, _len, _interval;

    _list = [];
    _len = 0;
    _interval = 33;

    function _loop() {
        for (var i = 0; i < _len; i++) { _list[i](); }
        requestAnimFrame(_loop);
    }

    function _registerRender(fn) {
        var len = _list.push(fn);
        _len = len;
        return len - 1;
    }

    function _deregisterRender(i) {
        _list.splice(i, 1);
        _len = _list.length;
    }

    function _setFPS(fps) {
        _interval = Math.floor(1000 / fps);
    }

    _loop();

    return {
        registerRender: _registerRender,
        deregisterRender: _deregisterRender,
        setFPS: _setFPS
    }

}());
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

}());/**
 * @namespace VENT.performance
 */

VENT.performance = (function() {

    var _last, _delta, _fps, _elapsed, _dom;

    _last = new Date();
    _delta = 0;
    _elapsed = 0;
    _fps = 0;

    function _init(domId) {
        if (domId) {
            _dom = document.getElementById(domId);
        }
        VENT.renderer.registerRender(_update);

    }

    function _update() {
        var _newDate = new Date();
        _delta = (_newDate - _last) / 1000;
        _elapsed += _delta;
        _last = _newDate;
        _fps = Math.floor(1/_delta);
        if (_dom) {
            _dom.innerHTML = _fps;
        }
    }

    function _getDelta() {
        return _delta;
    }

    function _getElapsed() {
        return _elapsed;
    }

    return {
        init: _init,
        delta: _getDelta,
        elapsed: _getElapsed
    }

}());
