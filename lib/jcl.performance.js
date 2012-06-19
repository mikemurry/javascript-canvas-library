/**
 * @namespace JCL.performance
 */

JCL.performance = (function() {

    var _last, _delta, _fps, _elapsed, _dom;

    _last = new Date();
    _delta = 0;
    _elapsed = 0;
    _fps = 0;

    function _init(domId) {
        if (domId) { _dom = document.getElementById(domId); }
        JCL.renderer.registerRender(_update);
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

        /**
         * @function
         * @description Initializes the performance functions.
         * @param domId {String} If a ID string is passed to a DOM element, that element's text will be updated with the current frames per second (FPS).
         * @return {Number}
         */

        init: _init,

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

        elapsed: _getElapsed

    }

}());
