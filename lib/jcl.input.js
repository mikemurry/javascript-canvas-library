/**
 * @namespace JCL.input
 */

JCL.input = (function() {

    var _clickMap;

    _clickMap = [];

    return {

        addClickArea: function addClickArea(obj, fn) {

            if (obj instanceof JCL.Rectangle) {
                _clickMap.push([obj, fn]);
            } else {
                JCL.error("Clickable areas must be rectangles.")
            }

        },

        test: function test(x, y) {

        }
    }

}());
