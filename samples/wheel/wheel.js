var web = {

    init: function init(canvasId, axisId) {

        var that = this, perf = VENT.performance, i;

        // Initialize Canvas
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.axis = document.getElementById(axisId);
        this.axis.width = window.innerWidth;
        this.axis.height = window.innerHeight;

        this.center = {
            x: Math.floor(this.canvas.width / 2),
            y: Math.floor(this.canvas.height / 2)
        };

        // Initialize Context
        this.ctx = this.canvas.getContext("2d");
        this.axisCtx = this.axis.getContext("2d");

        // Instantiate Data
        this.pointCount = 600;
        this.step = 0;
        this.activity = [];
        this.strength = [];

        // Generate Data
        for (i = 0; i<this.pointCount; i++) {
            this.activity.push(this.calculateStack(this.center, this.pointCount, i, 300, 250, "sin"));
            this.strength.push(this.calculateStack(this.center, this.pointCount, i, -100, 249, "random"));
        }

        // Enable Performance Monitoring
        perf.init("vent-fps-value");

        // Register Render Function
        VENT.renderer.registerRender(function() {
            that.render();
        });

        this.drawAxis();

    },

    render: function render() {

        // Clear Screen
        this.clear();

        // Draw Lines
        this.drawHaystack(this.activity, "rgba(132,216,77,1)", 2);
        this.drawHaystack(this.strength, "rgba(100,100,100,1)", 2);

        // Increment Step
        this.step++;
        if (this.step >= this.activity.length) { this.step = 0; }

        // Draw Values
        this.activity[this.step] = this.calculateStack(this.center, this.pointCount, this.step, 300, 250, "sin");
        this.strength[this.step] = this.calculateStack(this.center, this.pointCount, this.step, -100, 249, "random");

        // Draw Step Indicator
        this.drawPath([this.center, this.activity[this.step][0]], "rgba(255,255,255,1)", 2);

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

    clear: function clear() {
        VENT.canvas.clearRect(this.ctx, 0, 0, this.canvas.width, this.canvas.height);
    },

    drawHaystack: function drawHaystack(steps, strokeStyle, lineWidth) {
        VENT.canvas.drawHaystack(this.ctx, steps, strokeStyle, lineWidth);
    },

    drawPath: function drawPath(steps, strokeStyle, lineWidth) {
        VENT.canvas.drawPath(this.ctx, steps, strokeStyle, lineWidth);
    },

    drawAxis: function drawAxis() {
        var drawCircle = VENT.canvas.drawCircle;
        drawCircle(this.axisCtx, this.center, 200, null, "rgba(255,255,255,0.2)", 1);
        drawCircle(this.axisCtx, this.center, 300, null, "rgba(255,255,255,0.2)", 1);
        drawCircle(this.axisCtx, this.center, 350, null, "rgba(255,255,255,0.2)", 1);
        drawCircle(this.axisCtx, this.center, 400, null, "rgba(255,255,255,0.2)", 1);
    }

};

window.onload = function onload() {

    web.init("canvas", "axis");

};

