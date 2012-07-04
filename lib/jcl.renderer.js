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
