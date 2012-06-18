var constellations = {

    points: [],
    connections: [],

    init: function init(canvasId) {

        var that = this,
            perf = JCL.performance;

        this.canvas = new JCL.Canvas(canvasId, {
            fullscreen: true
        });

        // Generate Data
        this.points = this.generatePoints(500);
        this.connections = this.generateConnections(100);

        // Enable Performance Monitoring
        perf.init("JCL-fps-value");

        // Register Render Function
        JCL.renderer.registerRender(function() {
            that.render();
        });

    },

    generatePoints: function generatePoints(points) {
        var output = [], i;
        for (i = 0; i < points; i++) {
            output.push(this.randomPoint());
        }
        return output;
    },

    generateConnections: function generateConnections(connections) {
        var output = [], i, range, rand = JCL.utilities.randomInt;
        range = this.points.length;
        for (i = 0; i < connections; i++) {
            output.push([this.points[rand(0,range)], this.points[rand(0,range)]]);
        }
        return output;
    },

    randomPoint: function randomPoint() {
        var random = JCL.utilities.randomInt;
        return {
            x: random(0, this.canvas.width),
            y: random(0, this.canvas.height)
        }
    },

    render: function render() {

        var i, max, canvas;

        canvas = this.canvas;

        // Clear Screen
        canvas.clear();

        // Draw Lines
        //max = this.connections.length;

        // Draw Point Halos
        max = this.points.length;
        for (i = 0; i<max; i++) {
            canvas.drawCircle(this.points[i], 5, "rgba(60,100,140,0.4)");
        }

        // Draw Connections
        canvas.drawHaystack(this.connections, "rgba(60,100,140,0.3)", 1);

        // Draw Points
        max = this.points.length;
        for (i = 0; i<max; i++) {
            canvas.drawCircle(this.points[i], 1.5, "rgba(220,225,225,1.0)");
        }

    }

};

window.onload = function onload() {
    constellations.init("canvas");
};

