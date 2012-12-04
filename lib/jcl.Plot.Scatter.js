/**
 * @namespace JCL.Plot.Scatter
 */

/**
 * @class The Plot.Scatter class converts virtual chart coordinates into physical screen coordinates.
 * @param area {Object} The rectangle or canvas that specifies the boundaries of the chart.
 * @param options {Object}
 * @return {Object}
 */

JCL.Plot = JCL.Plot || {};

JCL.Plot.Scatter = function ScatterPlot(area, options) {

    options = options || {};
    this.options = options;

    if (area) {

        // Initialize Area
        if (area instanceof JCL.Canvas) {
            this.area = new JCL.Rectangle(0, 0, area.width, area.height);
        } else if (area instanceof JCL.Rectangle) {
            this.area = area;
        }

        // Initialize X Axis
        options.xaxis = options.xaxis || {};
        this.xaxis = {
            min: options.xaxis.min || 0,
            max: options.xaxis.max || 100,
            interval: options.xaxis.interval || 10
        };

        // Initialize Y Axis
        options.yaxis = options.yaxis || {};
        this.yaxis = {
            min: options.yaxis.min || 0,
            max: options.yaxis.max || 100,
            interval: options.yaxis.interval || 10
        };

    } else {
        JCL.error("Cannot create a Chart without a Canvas or Rectangle specified as the area.")
    }

    return this;

};

JCL.Plot.Scatter.prototype = {

    plot: function plot(x, y) {

        var xmin = this.xaxis.min;
        var ymin = this.yaxis.min;
        var height = this.area.height;

        return new JCL.Point(
            Math.floor(this.area.x + (((x - xmin) / (this.xaxis.max - xmin)) * this.area.width)),
            Math.floor(this.area.y + height - (((y - ymin)/(this.yaxis.max - ymin)) * height))
        );

    },

    movement: function (e) {
        console.log(e);
    }

};