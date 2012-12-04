/**
 * @namespace JCL.Plot.Bar
 */

/**
 * @class The Plot.Bar class converts virtual chart coordinates into physical screen coordinates.
 * @param area {Object} The rectangle or canvas that specifies the boundaries of the chart.
 * @param options {Object}
 * @return {Object}
 */

JCL.Plot = JCL.Plot || {};

JCL.Plot.Bar = function BarPlot(area, options) {

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
            columns: options.xaxis.columns || 0
        };

        // Initialize Y Axis
        options.yaxis = options.yaxis || {};
        this.yaxis = {
            min: options.yaxis.min || 0,
            max: options.yaxis.max || 100,
            interval: options.yaxis.interval || 10
        };

        this.remap();

    } else {
        JCL.error("Cannot create a Chart without a Canvas or Rectangle specified as the area.")
    }

    return this;

};

JCL.Plot.Bar.prototype = {

    remap: function remap() {
        this.xaxis.columnWidth = this.area.width / this.xaxis.columns;
    },

    plot: function plot(column, y) {

        var columnWidth = this.xaxis.columnWidth;

        return new JCL.Point(
            this.area.x + Math.floor((column * columnWidth) + (columnWidth/2)),
            this.area.y + this.area.height - Math.floor((((y - this.yaxis.min)/(this.yaxis.max - this.yaxis.min)) * this.area.height))
        );

    },

    map: function map(arr) {
        var i, max, output = [];
        for (i=0, max=arr.length; i<max; i++) {
            output.push(this.plot(arr[i].x, arr[i].y));
        }
        return output;
    }

};