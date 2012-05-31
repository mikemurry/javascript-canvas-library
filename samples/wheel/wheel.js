var web = {

    init: function init(canvasId, axisId) {

        var that = this, perf = VENT.performance, i;

        // Initialize Canvas

        this.canvas = new VENT.Canvas(canvasId, {
            fullscreen: true,
            zindex: 5
        });

        this.axis = new VENT.Canvas(axisId, {
            fullscreen: true,
            zindex: 0
        });

        this.center = {
            x: Math.floor(this.canvas.width / 2),
            y: Math.floor(this.canvas.height / 2)
        };

        // Instantiate Data
        this.pointCount = 600;
        this.step = 0;
        this.hover = null;
        this.activity = [];
        this.strength = [];

        // Generate Data
        for (i = 0; i<this.pointCount; i++) {
            this.activity.push(this.calculateStack(this.center, this.pointCount, i, 300, 250, "sin"));
            this.strength.push(this.calculateStack(this.center, this.pointCount, i, -100, 249, "random"));
        }

        // Enable Performance Monitoring
        perf.init("vent-fps-value");

        // Initialize Mouse
        this.mouse = { x: 0, y: 0 };

        // Register Render Function
        VENT.renderer.registerRender(function() {
            that.render();
        });

        // Register Mouse Move Function
        this.canvas.dom.onmousemove = function(e) {
            that.handleMouse.call(that, e);
        };

        this.drawAxis(this.center);

    },

    handleMouse: function handleMouse(e) {

        var distance = VENT.utilities.pointDistance(this.mouse, this.center);

        this.mouse = {
            x: e.clientX,
            y: e.clientY
        };

        if (distance <= 400 && distance >= 200) {
            var utils = VENT.utilities;
            this.hover = Math.round((utils.degrees(utils.pointAngle(this.mouse, this.center)) + 180) / (360/this.pointCount));
            if (this.hover === this.pointCount) { this.hover = 0; }
        } else { this.hover = null; }

    },

    render: function render() {

        // Clear Screen
        this.canvas.clear();

        // Draw Lines
        this.canvas.drawHaystack(this.activity, "rgba(132,216,77,1)", 2);
        this.canvas.drawHaystack(this.strength, "rgba(100,100,100,1)", 2);

        // Increment Step
        this.step++;
        if (this.step >= this.activity.length) { this.step = 0; }

        // Draw Values
        this.activity[this.step] = this.calculateStack(this.center, this.pointCount, this.step, 300, 250, "sin");
        this.strength[this.step] = this.calculateStack(this.center, this.pointCount, this.step, -100, 249, "random");

        // Draw Step Indicator
        this.canvas.drawPath([this.center, this.activity[this.step][0]], "rgba(255,255,255,1)", 2);

        // Draw Hover Indicator
        if (this.hover !== null) {
            this.canvas.drawPath([this.strength[this.hover][0], this.activity[this.hover][0]], "rgba(255,123,0,1)", 2);
        }

    },

    calculateStack: function calculateStack(center, points, step, maxSize, radius, type) {

        var size, a, ang, c;

        var tangent = VENT.utilities.pointTangent;
        var degrees = VENT.utilities.degrees;

        if (type === "random") {
            size = (Math.random()*Math.random()) * maxSize;
        } else if (type === "sin") {
            size = (maxSize * 0.5) +  ((Math.sin(VENT.performance.elapsed() * 2) * Math.cos(VENT.performance.elapsed())) * (maxSize * 0.4)) + (maxSize * 0.1 * Math.random());
        }

        a = tangent(center, step * (360/points), radius);
        ang = Math.atan2(center.y - a.y, center.x - a.x);
        c = tangent(a, degrees(ang), size / -2);

        return [c, a];

    },

    drawAxis: function drawAxis(center) {
        console.log(this);
        this.axis.drawCircle(center, 10, "rgba(132,216,77,0.5)");
        this.axis.drawCircle(center, 5, "rgba(255,255,255,1)");
        this.axis.drawCircle(center, 200, null, "rgba(255,255,255,0.2)", 1);
        this.axis.drawCircle(center, 300, null, "rgba(255,255,255,0.2)", 1);
        this.axis.drawCircle(center, 350, null, "rgba(255,255,255,0.2)", 1);
        this.axis.drawCircle(center, 400, null, "rgba(255,255,255,0.2)", 1);
    }

};

window.onload = function onload() {

    web.init("canvas", "axis");

};

