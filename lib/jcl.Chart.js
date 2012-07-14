/**
 * @namespace JCL.Chart
 */

/**
 * @class The Chart class makes it easier to map data points based on values instead of physical canvas coordinates.
 * @param area {Object} The rectangle or canvas that specifies the boundaries of the chart.
 * @param options {Object}
 * @return {Object}
 */

JCL.Chart = function Chart(area, options) {

    options = options || {};
    this.options = options;

    if (area) {

        // Initialize Area
        if (area instanceof JCL.Canvas) {
            this.area = new JCL.Rectangle(0, 0, area.width, area.height);
        } else if (area instanceof JCL.Rectangle) {
            this.area = area;
        }

        // Initialize X and Y Axis
        options.xaxis = options.xaxis || {};
        options.yaxis = options.yaxis || {};
        this.xaxis = {
            min: options.xaxis.min || 0,
            max: options.xaxis.max || 100,
            interval: options.xaxis.interval || 10,
            type: options.xaxis.type || null
        };
        this.yaxis = {
            min: options.yaxis.min || 0,
            max: options.yaxis.max || 100,
            interval: options.yaxis.interval || 10
        };

    } else {
        JCL.error("Cannot create a Chart without a Canvas or Rectangle specified as the area.")
    }

    console.dir(this);

    return this;

};

JCL.Chart.prototype = {

    plot: function plot(x, y) {

        var intervalWidth;

        if (this.xaxis.type === "column") {
            intervalWidth = this.area.width / (this.xaxis.max - this.xaxis.min + 1);
            return new JCL.Point(
                Math.floor(this.area.x + ((x - this.xaxis.min) * Math.floor(intervalWidth)) + (intervalWidth/2)),
                Math.floor(this.area.y + this.area.height - (((y - this.yaxis.min)/(this.yaxis.max - this.yaxis.min)) * this.area.height))
            );
        }

        return new JCL.Point(
            Math.floor(this.area.x + (((x - this.xaxis.min) / (this.xaxis.max - this.xaxis.min)) * this.area.width)),
            Math.floor(this.area.y + this.area.height - (((y - this.yaxis.min)/(this.yaxis.max - this.yaxis.min)) * this.area.height))
        );

    }

};