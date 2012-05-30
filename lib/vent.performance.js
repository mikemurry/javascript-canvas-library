/**
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
