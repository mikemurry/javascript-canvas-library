/**
 * @namespace VENT.performance
 */

VENT.performance = (function() {

    var _last, _delta, _elapsed;

    _last = new Date();
    _delta = 0;
    _elapsed = 0;

    function _init() {
        VENT.renderer.registerRender(_update);
    }

    function _update() {
        var _newDate = new Date();
        _delta = (_newDate - _last) / 1000;
        _elapsed += _delta;
        _last = _newDate;
    }

    function _getDelta() {
        return _delta;
    }

    return {
        init: _init,
        delta: _delta
    }

}());
