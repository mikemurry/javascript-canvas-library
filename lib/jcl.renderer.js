/**
 * @namespace JCL.renderer
 */

JCL.renderer = (function() {

    var _list, _len, _enabled;

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
    _enabled = false;

    function _loop() {
        if (_len > 0) {
            for (var i = 0; i < _len; i++) { _list[i](); }
            window.requestAnimFrame(_loop);
        }
    }

    function _add(fn) {
        var isFirst = _list.length === 0;
        _len = _list.push(fn);
        if (isFirst) { _loop(); }
        return _len - 1;
    }

    function _remove(index) {
        _list.splice(index, 1);
        _len = _list.length;
        if (_len <= 0) { _enabled = false; }
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

        debug: function() { return _list; }
    }

}());
