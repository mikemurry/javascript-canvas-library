/**
 * @namespace JCL
 */

var JCL = JCL || {

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
 * @description Safely augments the JCL namespace to include the specified path.
 * @param ns {String} A dot separated namespace. Prefixing with "JCL." is optional.
 * @return {Object} Returns the JCL object.
 */

JCL.namespace = function(ns) {

    var parts, parent, i, count;

    parent = JCL;
    parts = ns.split(".");

    // Skip Redundant Top Level
    if (parts[0] === "JCL") {
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
 * @namespace JCL.utilities
 */

JCL.utilities = {

    /**
     * @description Returns an integer between the specified minimum (inclusive) and maximum (exclusive).
     * @param min {Number} The minimum range for the returned integer (inclusive).
     * @param max {Number} The maximum range for the returned integer (exclusive).
     * @return {Number}
     */

    randomInt: function randomInt(min, max) {
        if (min !== undefined && max !== undefined) {
            return Math.floor((max - min) * Math.random()) + min;
        } else { JCL.warn("utilities.randomInt() Error: Missing min or max argument."); }
        return false;
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

    createFragment: function createFragment(id, htmlStr) {
        var frag = document.createDocumentFragment(), temp = document.createElement("div");
        temp.id = id;
        temp.innerHTML = htmlStr;
        while (temp.firstChild) { frag.appendChild(temp.firstChild); }
        return frag;
    }

};
/**
 * @namespace JCL.renderer
 */

JCL.renderer = (function() {

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
 * @namespace JCL.canvas
 */

JCL.Canvas = function Canvas(canvasId, options) {

    this.dom = document.getElementById(canvasId);
    this.ctx = this.dom.getContext("2d");
    this.enabled = (this.ctx !== undefined);

    if (this.enabled) {

        // Handle Manual Height/Width Options
        if (options.width) { this.dom.width = window.innerWidth; }
        if (options.height) { this.dom.height = window.innerHeight; }

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

};/**
 * @namespace JCL.performance
 */

JCL.performance = (function() {

    var _last, _delta, _fps, _elapsed, _dom;

    _last = new Date();
    _delta = 0;
    _elapsed = 0;
    _fps = 0;

    function _init(domId) {
        if (domId) {
            _dom = document.getElementById(domId);
        }
        JCL.renderer.registerRender(_update);

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
JCL.Point = function Point(x, y, z) {
    this.set(x,y,z);
};

JCL.Point.prototype = {

    constructor: "Point",

    set: function set(x,y,z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    },

    get: function get() {
        return { x: this.x, y: this.y, z: this.z };
    },

    /**
     * @description Calculates the distance between two points.
     * @param a {Object} The first point.
     * @return {Number|Undefined} The resulting length.
     */

    distance: function distance(a) {
        if (a.constructor === "Point") { return Math.sqrt(Math.pow(a.x- this.x, 2) + Math.pow(a.y- this.y,2)); }
        else { JCL.warn("Cannot calculate distance of a non-point."); }
        return undefined;
    },

    /**
     * @description Calculates the angle between two points.
     * @param a {Object} The first point.
     * @return {Number|Undefined} The resulting angle in radians.
     */

    angle: function angle(a) {
        if (a.constructor === "Point") { return Math.atan2(a.y- this.y, a.x - this.x); }
        else { JCL.warn("Cannot calculate angle of a non-point."); }
        return undefined;
    },

    /**
     * @description Calculates a point {x,y} at the specified angle and distance from the base point.
     * @param angle {Number} The number of degrees to rotate the resulting point around the center (0 is pointing right).
     * @param distance {Number} The number of pixels between the center and the resulting point.
     * @return {Object|Undefined} The resulting point expressed as an object with 'x' and 'y' properties.
     */

    tangent: function tangent(angle, distance) {

        var radians = JCL.utilities.radians;

        if (angle !== null && distance !== null) {
            return new JCL.Point((distance * Math.cos(radians(angle))) + this.x, (distance * Math.sin(radians(angle))) + this.y);
        } else { JCL.warn("Could not calculate tangent. Missing required data. (Angle: " + angle + ", Distance: " + distance + ")"); }
        return undefined;

    },

    /**
     * @description Interpolates between two points {x,y}.
     * @param a {Object} The first point {x,y}.
     * @param ratio {Number} The amount to interpolate between the two points. Between 0 and 1.
     * @return {Object|Undefined} The interpolated point {x,y}.
     */

    lerp: function lerp(a,ratio) {
        if (!ratio || ratio < 0) { ratio = 0; }
        else if (ratio > 1) { ratio = 1; }
        if (this && a && ratio !== null) {
            if (a.constructor === "Point") {
                return { x: this.x + ((a.x - this.x) * ratio), y: this.y + ((a.y - this.y) * ratio) };
            } else { JCL.warn("Could not interpolate point. Invalid point."); }
        } else { JCL.warn("Could not interpolate point. Missing required data."); }
        return undefined;
    }

};