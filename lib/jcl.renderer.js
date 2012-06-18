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

    var _list, _len;

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
    }

    _loop();

    return {
        registerRender: _registerRender,
        deregisterRender: _deregisterRender
    }

}());
