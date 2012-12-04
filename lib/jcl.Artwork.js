/**
 * @namespace JCL.Artwork
 */

JCL.Artwork = function Artwork(strokes, options) {
    this.options = options || {};
    this.canvas = document.createElement('canvas');
    this.buffer = new JCL.Canvas(this.canvas);
    this.strokes = strokes || [];
    return this;
};

JCL.Artwork.prototype = {

    define: function define(strokes) {
        this.strokes = strokes;
        this.draw();
    },

    draw: function draw() {
        var max = this.strokes.length;
        for (var i=0; i<max; i++) {
            this.strokes[i].render(this.buffer);
        }
    },

    render: function render() {
        this.draw();
        return this.canvas;
    }

};