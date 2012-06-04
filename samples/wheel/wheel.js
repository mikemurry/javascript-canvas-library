var web = {

    init: function init(canvasId, axisId) {

        var that = this, perf = JCL.performance, i;

        // Initialize Canvas

        this.canvas = new JCL.Canvas(canvasId, {
            fullscreen: true,
            zindex: 5
        });

        this.axis = new JCL.Canvas(axisId, {
            fullscreen: true,
            zindex: 0
        });

        this.center = new JCL.Point(Math.floor(this.canvas.width / 2), Math.floor(this.canvas.height / 2));

        // Instantiate Data
        this.pointCount = 600;
        this.step = 0;
        this.hover = null;
        this.activity = [];
        this.strength = [];
        this.lineSize = 2;

        // Calculate Sizes
        if (this.canvas.width < this.canvas.height) {
            this.outerRing = Math.floor(this.canvas.width * 0.9 / 2);
            this.innerRing = Math.floor(this.canvas.width * 0.5 / 2);
            this.ringSize = Math.floor((this.outerRing - this.innerRing) / 4);
        } else {
            this.outerRing = Math.floor(this.canvas.height * 0.9 / 2);
            this.innerRing = Math.floor(this.canvas.height * 0.5 / 2);
            this.ringSize = Math.floor((this.outerRing - this.innerRing) / 4);
        }

        if (this.ringSize < 30) { this.lineSize = 1; }

        // Generate Data
        for (i = 0; i<this.pointCount; i++) {
            this.activity.push(this.calculateStack(this.center, this.pointCount, i, this.ringSize * 3, this.innerRing + this.ringSize, "sin"));
            this.strength.push(this.calculateStack(this.center, this.pointCount, i, this.ringSize * -1, this.innerRing + this.ringSize - 1, "random"));
        }

        // Enable Performance Monitoring
        perf.init("JCL-fps-value");

        // Initialize Mouse
        this.mouse = new JCL.Point(0,0);

        // Register Render Function
        JCL.renderer.registerRender(function() {
            that.render();
        });

        // Register Mouse Move Function
        this.canvas.dom.onmousemove = function(e) {
            that.handleMouse.call(that, e);
        };

        this.drawAxis(this.center);

    },

    handleMouse: function handleMouse(e) {

        var distance = this.mouse.distance(this.center);

        this.mouse.set(e.clientX, e.clientY);

        if (distance <= 400 && distance >= 200) {
            var degrees = JCL.utilities.degrees;
            this.hover = Math.round((degrees(this.mouse.angle(this.center)) + 180) / (360/this.pointCount));
            if (this.hover === this.pointCount) { this.hover = 0; }
        } else { this.hover = null; }

    },

    render: function render() {

        // Clear Screen
        this.canvas.clear();

        // Draw Lines
        this.canvas.drawHaystack(this.activity, "rgba(132,216,77,1)", this.lineSize);
        this.canvas.drawHaystack(this.strength, "rgba(100,100,100,1)", this.lineSize);

        // Increment Step
        this.step++;
        if (this.step >= this.activity.length) { this.step = 0; }

        // Draw Values
        this.activity[this.step] = this.calculateStack(this.center, this.pointCount, this.step, this.ringSize * 3, this.innerRing + this.ringSize, "sin");
        this.strength[this.step] = this.calculateStack(this.center, this.pointCount, this.step, this.ringSize * -1, this.innerRing + this.ringSize - 1, "random");

        // Draw Step Indicator
        this.canvas.drawPath([this.center, this.activity[this.step][0]], "rgba(255,255,255,1)", 2);

        // Draw Hover Indicator
        if (this.hover !== null) {
            this.canvas.drawPath([this.strength[this.hover][0], this.activity[this.hover][0]], "rgba(255,123,0,1)", 2);
        }

    },

    calculateStack: function calculateStack(center, points, step, maxSize, radius, type) {

        var size, a, ang, c;
        var degrees = JCL.utilities.degrees;

        if (type === "random") {
            size = (Math.random()*Math.random()) * maxSize;
        } else if (type === "sin") {
            size = (maxSize * 0.5) +  ((Math.sin(JCL.performance.elapsed() * 2) * Math.cos(JCL.performance.elapsed())) * (maxSize * 0.4)) + (maxSize * 0.1 * Math.random());
        }

        a = center.tangent(step * (360/points), radius);
        ang = center.angle(a);
        c = a.tangent(degrees(ang), size);

        return [c, a];

    },

    drawAxis: function drawAxis(center) {
        this.axis.drawCircle(center, 10, "rgba(132,216,77,0.5)");
        this.axis.drawCircle(center, 5, "rgba(255,255,255,1)");
        this.axis.drawCircle(center, this.innerRing, null, "rgba(255,255,255,0.2)", 1);
        this.axis.drawCircle(center, this.innerRing + (this.ringSize * 2), null, "rgba(255,255,255,0.2)", 1);
        this.axis.drawCircle(center, this.innerRing + (this.ringSize * 3), null, "rgba(255,255,255,0.2)", 1);
        this.axis.drawCircle(center, this.innerRing + (this.ringSize * 4), null, "rgba(255,255,255,0.2)", 1);
    }

};

window.onload = function onload() {

    web.init("canvas", "axis");

};

