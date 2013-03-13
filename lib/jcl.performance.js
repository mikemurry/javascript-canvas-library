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
    _index = null;

    function _init() {
        if (!_isInit) {
            _index = JCL.renderer.add(_update);
            _isInit = true;
        }
        return this;
    }

    function _uninit() {
        if (_isInit) {
            JCL.renderer.remove(_index);
            _isInit = false;
        }
        return this;
    }

    function _update() {
        var _newDate = new Date();
        _delta = (_newDate - _last) / 1000;
        _elapsed += _delta;
        _last = _newDate;
        _fps = Math.floor(1/_delta);
    }

    return {

        enable: function() {
            _init();
            return this;
        },

        disable: function() {
            _uninit();
            _delta = null;
            _elapsed = null;
            _last = null;
            _fps = null;
            return this;
        },

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
