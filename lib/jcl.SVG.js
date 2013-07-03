/**
 * @namespace JCL.SVG
 */


JCL.SVG = function(dom, options) {

    var that = this;

    options = options || {};
    this.options = options;

    if (typeof dom === "object") {
        if (dom.length) {
            // Assume jQuery Object
            this.dom = dom[0];
        } else {
            // Assume raw DOM element.
            this.dom = dom;
        }
    } else {
        // Assume ID string
        this.dom = document.getElementById(dom);
    }

    if (this.dom) {

        // If the DOM is a SVG tag, use it. Otherwise, create one.

        if (this.dom.tagName === 'svg') {
            // Our DOM is the SVG DOM. Use it.
            this.svg = this.dom;
        } else {
            // Need to create an SVG tag and insert it into whatever DOM we got.
            this.svg = document.createElementNS(this.namespace, 'svg');
            this.dom.appendChild(this.svg);
        }

        this.enabled = !!this.svg;
    }

    if (this.enabled) {

        // Handle Manual Height/Width Options
        if (options.width) { this.dom.width = options.width; }
        if (options.height) { this.dom.height = options.height; }

        // Handle Z-Index Option
        if (options.zindex) {
            this.dom.style.zIndex = options.zindex;
        }

        this.width = this.dom.width;
        this.height = this.dom.height;

    } else {
        throw new ReferenceError("Could not instantiate JCL.SVG with specified DOM element.");
    }

    return this;

};

JCL.SVG.prototype = {

    namespace: 'http://www.w3.org/2000/svg',

    /**
     * Creates a rectangle element to the SVG DOM.
     * @param rect {JCL.Rectangle} An instance of JCL.Rectangle.
     * @return {Object} The resulting SVG object.
     */

    createRectangle: function(rect) {

        var obj;

        if (rect instanceof JCL.Rectangle) {

            obj = document.createElementNS(this.namespace, 'rect');

            obj.setAttribute('width', rect.width);
            obj.setAttribute('height', rect.height);
            obj.setAttribute('x', rect.x);
            obj.setAttribute('y', rect.y);

            if (rect.fillStyle) {
                obj.setAttribute('fill', rect.fillStyle);
            }

            if (rect.strokeStyle) {
                obj.setAttribute('stroke', rect.strokeStyle);
                obj.setAttribute('stroke-width', rect.lineWidth);
            }

            this.svg.appendChild(obj);

        } else {
            throw new TypeError("Cannot create a rectangle without a JCL.Rectangle instance.");
        }

        return obj;

    },

    /**
     * Draws a circle.
     * @param circle {JCL.Circle} An instance of a JCL.Circle.
     * @return {Object} The resulting SVG element.
     */

    createCircle: function(circle){

        var obj;

        if (circle instanceof JCL.Circle) {

            obj = document.createElementNS(this.namespace, 'circle');

            obj.setAttribute('r', circle.radius);
            obj.setAttribute('cx', circle.center.x);
            obj.setAttribute('cy', circle.center.y);

            if (circle.fillStyle) {
                obj.setAttribute('fill', circle.fillStyle);
            }

            if (circle.strokeStyle) {
                obj.setAttribute('stroke', circle.strokeStyle);
                obj.setAttribute('stroke-width', circle.lineWidth);
            }

            this.svg.appendChild(obj);

        } else {
            throw new TypeError("Cannot create a rectangle without a JCL.Circle instance.");
        }

        return obj;

    }

};