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
        for (var i = 0; i < _len; i++) { _list[i](); }
        requestAnimFrame(_loop);
    }

    function _registerRender(fn) {
        var len = _list.push(fn);
        _len = len;
        return len - 1;
    }

    function _deregisterRender(index) {
        _list.splice(index, 1);
        _len = _list.length;
        return true;
    }

    _loop();

    return {

        /**
         * @function
         * @description Adds a callback to the render loop. Returns the index of the added callback.
         * @param fn {Function} The callback to be fired each tick of the render loop.
         * @return {Number}
         */

        registerRender: _registerRender,

        /**
         * @function
         * @description Removes a specific callback from the render loop.
         * @param index {Number} The index of the render callback to remove.
         * @return {Boolean}
         */

        deregisterRender: _deregisterRender
    }

}());
