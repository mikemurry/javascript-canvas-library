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
            JCL.renderer.registerRender(_update);
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

    function _getDelta() {
        return _delta;
    }

    function _getElapsed() {
        return _elapsed;
    }

    function _getFPS() {
        return _fps;
    }

    _init();

    return {

        /**
         * @function
         * @description Returns the latest delta (elapsed time since last rendered frame, in seconds).
         * @return {Number}
         */

        delta: _getDelta,

        /**
         * @function
         * @description Returns the elapsed time since performance.init() was first called (in seconds).
         * @return {Number}
         */

        elapsed: _getElapsed,

        fps: _getFPS()

    }

}());
