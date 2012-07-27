/**
 * @namespace JCL
 */

var JCL = JCL || {

    /**
     * @description Throws a console log.
     * @param msg {String} The message to write to the console.
     */

    log: function log(msg) {
        console.log(msg);
    },

    /**
     * @description Throws a console info.
     * @param msg {String} The message to write to the console.
     */

    info: function info(msg) {
        console.info(msg);
    },

    /**
     * @description Throws a console warning.
     * @param msg {String} The message to write to the console.
     */

    warn: function warn(msg) {
        console.warn(msg);
    },

    /**
     * @description Throws a console error.
     * @param msg {String} The message to write to the console.
     */

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

    /**
     * @description Converts a string into a DOM fragment.
     * @param id {String} The ID of the resulting DOM fragment.
     * @param htmlStr {String} The HTML string to convert.
     * @return {Object} The resulting DOM fragment.
     */

    createFragment: function createFragment(id, htmlStr) {
        var frag = document.createDocumentFragment(), temp = document.createElement("div");
        temp.id = id;
        temp.innerHTML = htmlStr;
        while (temp.firstChild) { frag.appendChild(temp.firstChild); }
        return frag;
    },

    /**
     * @description Returns the minimum and maximum value of a given collection.
     * @param collection {Array} The array to iterate over.
     * @return {Object} The resulting min and max.
     */

    bounds: function bounds(collection) {

        var i, j, min, max;

        for (i=0, j=collection.length; i<j; i++) {

            if (!min) { min = collection[i]; }
            if (!max) { max = collection[i]; }

            if (collection[i] > max) { max = collection[i]; }
            if (collection[i] < min) { min = collection[i]; }

        }

        return {
            min: min,
            max: max
        }

    }

};
/**
 * @namespace JCL.renderer
 */

JCL.renderer = (function() {

    var _list, _len;

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

    _list = [];
    _len = 0;

    function _loop() {
        if (_len > 0) {
            for (var i = 0; i < _len; i++) { _list[i](); }
            window.requestAnimFrame(_loop);
        }
    }

    function _add(fn) {
        var len = _list.push(fn);
        _len = len;
        if (_len == 1) { _loop(); }
        return len - 1;
    }

    function _remove(index) {
        _list.splice(index, 1);
        _len = _list.length;
        return true;
    }

    return {

        /**
         * @function
         * @description Adds a callback to the render loop. Returns the index of the added callback.
         * @param fn {Function} The callback to be fired each tick of the render loop.
         * @return {Number}
         */

        add: _add,

        /**
         * @function
         * @description Removes a specific callback from the render loop.
         * @param index {Number} The index of the render callback to remove.
         * @return {Boolean}
         */

        remove: _remove,

        debug: _list
    }

}());
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

};/**
 * @namespace JCL.performance
 */

JCL.performance = (function() {

    var _isInit, _last, _delta, _fps, _elapsed;

    _isInit = false;
    _last = new Date();
    _delta = 0;
    _elapsed = 0;
    _fps = 0;

    function _init() {
        if (!_isInit) {
            JCL.renderer.add(_update);
            _isInit = true;
        }
    }

    function _update() {
        var _newDate = new Date();
        _delta = (_newDate - _last) / 1000;
        _elapsed += _delta;
        _last = _newDate;
        _fps = Math.floor(1/_delta);
    }

    _init();

    return {

        /**
         * @property {Number} delta The number of seconds elapsed since the last rendered frame.
         */

        delta: function() { return _delta; },

        /**
         * @property {Number} elapsed The number of seconds elapsed since page load.
         */

        elapsed: function() { return _elapsed; },

        /**
         * @property {Number} fps The number of frames per second.
         */

        fps: function() { return _fps; }
    }

}());
/**
 * @namespace JCL.Point
 */

/**
 * @class The point class represents a point in 2d (x,y) or 3d (x,y,z) space.
 * @param x {Number} The x coordinate.
 * @param y {Number} The y coordinate.
 * @param z {Number} The z coordinate.
 * @return {Object}
 */

JCL.Point = function Point(x, y, z) {
    return this.set(x,y,z);
};

JCL.Point.prototype = {

    constructor: "Point",

    /**
     * @description Calculates the angle between two points.
     * @param x {Number} The x coordinate.
     * @param y {Number} The y coordinate.
     * @param z {Number} The z coordinate.
     * @return {Object} The resulting point object.
     */

    set: function set(x,y,z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        return this;
    },

    /**
     * @description Returns a simplified object representing the point's coordinates.
     * @return {Object}
     */

    get: function get() {
        return { x: this.x, y: this.y, z: this.z };
    },

    /**
     * @description Prints the current coordinates as a string.
     * @return {String}
     */

    toString: function toString() {
        return "Point( x:" + this.x + ", y:" + this.y + ", z:" + this.z + ")";
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
    },

    translate: function translate(x, y, z) {
        var current = this.get();
        return this.set(current.x + (x || 0), current.y + (y || 0), current.z + (z || 0));
    }

};/**
 * @namespace JCL.Rectangle
 */

/**
 * @class The Rectangle class represents a rectangle in 2d (x,y) or 3d (x,y,z) space.
 * @param a {Number} The x coordinate.
 * @param b {Number} The y coordinate.
 * @param c {Number} If 4 arguments, the width. If 6 arguments, the z coordinate.
 * @param d {Number} If 4 arguments, the height. If 6 arguments, the width.
 * @param e {Number} If 6 arguments, the height.
 * @param f {Number} If 6 arguments, the depth.
 * @return {Object} The resulting rectangle object.
 */

JCL.Rectangle = function Rectangle(a, b, c, d, e, f) {
    return this.set(a,b,c,d,e,f);
};

JCL.Rectangle.prototype = {

    constructor: "Rectangle",

    /**
     * @description Sets the location and size of the rectangle.
     * @param a {Number} The x coordinate.
     * @param b {Number} The y coordinate.
     * @param c {Number} If 4 arguments, the width. If 6 arguments, the z coordinate.
     * @param d {Number} If 4 arguments, the height. If 6 arguments, the width.
     * @param e {Number} If 6 arguments, the height.
     * @param f {Number} If 6 arguments, the depth.
     * @return {Object} The resulting rectangle object.
     */

    set: function set(a,b,c,d,e,f) {

        var x, y, z, width, height, depth;

        if (a !== undefined && b !== undefined && c !== undefined && d !== undefined && e === undefined && f === undefined) {
            // Assume arguments (x, y, width, height);
            x = a;
            y = b;
            width = c;
            height = d;
        } else {
            // Assume arguments (x, y, z, width, height, depth)
            x = a;
            y = b;
            z = c;
            width = d;
            height = e;
            depth = d;
        }

        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.depth = depth || 0;

        return this;

    },

    /**
     * @description Returns a simplified object representing the point's coordinates.
     * @return {Object}
     */

    get: function get() {
        return { x: this.x, y: this.y, z: this.z, width: this.width, height: this.height, depth: this.depth };
    },

    /**
     * @description Prints the current coordinates as a string.
     * @return {String}
     */

    toString: function toString() {
        return "Rectangle( x:" + this.x + ", y:" + this.y + ", z:" + this.z + ", width:" + this.width + ", height:" + this.height + ", depth:" + this.depth + ")";
    },

    /**
     * @description Calculates the center point of the rectangle, or if a point is passed in, adjusts the rectangle's location to match the provided center point.
     * @return {Object} The resulting point.
     */

    center: function center(point) {
        if (point) {
            this.set(point.x - (this.width / 2), point.y-(this.height / 2), point.z-(this.depth / 2), this.width, this.height, this.depth);
        } else {
            return new JCL.Point(this.x + (this.width / 2), this.y + (this.height / 2), this.z + (this.depth / 2));
        }
    }

};/**
 * @namespace JCL.Chart
 */

/**
 * @class The Chart class makes it easier to map data points based on values instead of physical canvas coordinates.
 * @param area {Object} The rectangle or canvas that specifies the boundaries of the chart.
 * @param options {Object}
 * @return {Object}
 */

JCL.Chart = function Chart(area, options) {

    options = options || {};
    this.options = options;

    if (area) {

        // Initialize Area
        if (area instanceof JCL.Canvas) {
            this.area = new JCL.Rectangle(0, 0, area.width, area.height);
        } else if (area instanceof JCL.Rectangle) {
            this.area = area;
        }

        // Initialize X and Y Axis
        options.xaxis = options.xaxis || {};
        options.yaxis = options.yaxis || {};
        this.xaxis = {
            min: options.xaxis.min || 0,
            max: options.xaxis.max || 100,
            interval: options.xaxis.interval || 10,
            type: options.xaxis.type || null
        };
        this.yaxis = {
            min: options.yaxis.min || 0,
            max: options.yaxis.max || 100,
            interval: options.yaxis.interval || 10
        };

    } else {
        JCL.error("Cannot create a Chart without a Canvas or Rectangle specified as the area.")
    }

    return this;

};

JCL.Chart.prototype = {

    plot: function plot(x, y) {

        var intervalWidth;

        if (this.xaxis.type === "column") {
            intervalWidth = this.area.width / (this.xaxis.max - this.xaxis.min + 1);
            return new JCL.Point(
                this.area.x + Math.floor(((x - this.xaxis.min) * intervalWidth) + (intervalWidth/2)),
                this.area.y + this.area.height - Math.floor((((y - this.yaxis.min)/(this.yaxis.max - this.yaxis.min)) * this.area.height))
            );
        }

        return new JCL.Point(
            Math.floor(this.area.x + (((x - this.xaxis.min) / (this.xaxis.max - this.xaxis.min)) * this.area.width)),
            Math.floor(this.area.y + this.area.height - (((y - this.yaxis.min)/(this.yaxis.max - this.yaxis.min)) * this.area.height))
        );

    }

};/**
 * @namespace JCL.Tooltip
 */

/**
 * @class
 * @param id {String} The ID of the tooltip.
 * @return {Object}
 */

JCL.Tooltip = function Tooltip(dom, id) {

    this.parent = dom || document.getElementsByTagName("body")[0];
    if (this.parent.length > 0) { this.parent = this.parent[0]; }

    this.id = id || "tooltip-" + JCL.utilities.randomInt(0,100000);
    this.el = null;

    this.initialize();

    return this;

};

JCL.Tooltip.prototype = {

    constructor: "Tooltip",

    initialize: function initialize() {

        var output = "";

        var el = document.createElement("div");
        el.id = this.id;
        el.className = "tooltip";

        this.el = this.parent.appendChild(el);

        return this;

    },

    render: function render(content, alignment) {

        var output = "";

        // Left Arrow (if needed)
        if (alignment === "left") { output += "<div class=\"tooltip-arrow-left\" />"; }

        // Content
        output += "<div class=\"tooltip-content\">";
        output += content;
        output += "</div>";

        // Right Arrow (if needed)
        if (alignment === "right") { output += "<div class=\"tooltip-arrow-right\" />"; }

        this.el.innerHTML = output;

        return this;

    }


};