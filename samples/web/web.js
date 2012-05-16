var web = {

    points: [],
    connections: [],

    init: function init(canvasId) {

        var that = this,
            perf = VENT.performance;

        // Initialize Canvas
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Initialize Context
        this.ctx = this.canvas.getContext("2d");

        // Generate Data
        this.points = this.generatePoints(500);
        this.connections = this.generateConnections(100);


        // Enable Performance Monitoring
        perf.init("vent-fps-value");

        // Register Render Function
        VENT.renderer.registerRender(function() {
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
        var output = [], i, range, rand = VENT.utilities.randomInt;
        range = this.points.length;
        for (i = 0; i < connections; i++) {
            output.push([this.points[rand(0,range)], this.points[rand(0,range)]]);
        }
        return output;
    },

    randomPoint: function randomPoint() {
        var random = VENT.utilities.randomInt;
        return {
            x: random(0, this.canvas.width),
            y: random(0, this.canvas.height)
        }
    },

    render: function render() {

        var i, max;

        // Clear Screen
        this.clear();

        // Draw Lines
        //max = this.connections.length;

        // Draw Point Halos
        max = this.points.length;
        for (i = 0; i<max; i++) {
            this.drawCircle(this.points[i], 5, "rgba(60,100,140,0.4)");
        }

        // Draw Connections
        this.drawHaystack(this.connections, "rgba(60,100,140,0.3)", 1);

        // Draw Points
        max = this.points.length;
        for (i = 0; i<max; i++) {
            this.drawCircle(this.points[i], 1.5, "rgba(220,225,225,1.0)");
        }

    },

    clear: function clear() {
        VENT.canvas.clearRect(this.ctx, 0, 0, this.canvas.width, this.canvas.height);
    },

    drawCircle: function drawCircle(center, radius, fillStyle, strokeStyle, lineWidth) {
        VENT.canvas.drawCircle(this.ctx, center, radius, fillStyle, strokeStyle, lineWidth);
    },

    drawHaystack: function drawHaystack(steps, strokeStyle, lineWidth) {
        VENT.canvas.drawHaystack(this.ctx, steps, strokeStyle, lineWidth);
    }

};

window.onload = function onload() {

    web.init("canvas");

};

