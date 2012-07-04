var entanglement = {

    init: function init(activeId, inactiveId) {

        var that = this, perf = JCL.performance, i;

        // Initialize Canvas

        this.active = new JCL.Canvas(activeId, {
            width: 500,
            height: 500,
            zindex: 1
        });

        this.inactive = new JCL.Canvas(inactiveId, {
            width: 500,
            height: 500,
            zindex: 0
        });

        this.center = new JCL.Point(Math.floor(this.active.width / 2), Math.floor(this.active.height / 2));

        // Instantiate Data
        this.numPoints = 1000;
        this.numConnections = 100;
        this.speed = 10;
        this.points = this.loadPoints(this.numPoints, this.center, 250);
        this.connections = this.loadConnections(this.numConnections, this.points);
        this.spikes = [];

        // Initialize Mouse
        this.mouse = new JCL.Point(0,0);

        // Register Render Function
        JCL.renderer.add(function() {
            that.render();
        });

        // Draw Connections
        for (var i = 0; i < this.connections.length; i++) {
            this.inactive.drawPath(this.connections[i], "rgba(55,110,251,0.2)", Math.random());
        }

    },

    loadPoints: function loadPoints(n, center, radius) {

        var util, points, i, point;

        util = JCL.utilities;
        points = [];

        for (i = n; i > 0; i--) {
            point = new JCL.Point(center.x, center.y);
            points.push(point.tangent(util.randomInt(0,360), Math.round(radius * ((Math.pow(Math.random(),2) * -1) + 1))));
        }

        return points;

    },

    loadConnections: function loadConnections(n, collection) {

        var connections, i, j, util, len, spokes, pointA;

        util = JCL.utilities;
        connections = [];
        len = collection.length;

        for (i = n; i > 0; i--) {

            pointA = collection[util.randomInt(0,len)];
            spokes = util.randomInt(0,20);

            for (j = spokes; j > 0; j--) {
                connections.push([pointA, collection[util.randomInt(0,len)]]);
            }
        }

        return connections;

    },

    render: function render() {

        var delta, active;

        delta = JCL.performance.delta;
        active = this.active;

        active.clear();
        active.drawHaystack(this.loadConnections(1, this.points),"rgba(49,171,248,1)", 1)

    }

};

window.onload = function onload() {

    entanglement.init("active", "inactive");

};

