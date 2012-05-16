/**
 * @namespace VENT.renderer
 */

VENT.renderer = (function() {

    var _list, _len, _interval;

    _list = [];
    _len = 0;
    _interval = 33;

    function _loop() {
        for (var i = 0; i < _len; i++) { _list[i](); }
        setTimeout(_loop, _interval);
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
