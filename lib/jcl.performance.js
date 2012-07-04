/**
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
