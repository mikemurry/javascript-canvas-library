var bipolar = {

    init: function init(canvasId, activeId) {

        var that = this, i, point;

        // Initialize Canvas
        this.canvas = new JCL.Canvas(canvasId, {
            width: 980,
            height: 300
        });
        this.active = new JCL.Canvas(activeId, {
            width: 980,
            height: 300
        });

        // Initialize Variables
        this.data = data || [];
        this.points = this.data.length;
        this.middle = Math.floor(this.canvas.height / 2);
        this.interval = this.canvas.width / (this.data.length - 1);
        this.max = 0;
        this.happy = [];
        this.sad = [];
        this.years = [];
        this.lastYear = 0;
        this.mouseInterval = null;
        this.lastInterval = null;
        this.frame = document.getElementById("canvasFrame");
        this.offset = {
            left: this.frame.offsetLeft,
            top: this.frame.offsetTop
        };

        // Find Max and Min and Date Changes
        for (i = 0; i < this.points; i++) {
            point = this.data[i];
            if (point[1] > this.max) { this.max = point[1]; }
            if (point[2] > this.max) { this.max = point[2]; }
            var tempDate = new Date(point[0]);
            if (tempDate.getYear() > this.lastYear) {
                this.lastYear = tempDate.getYear();
                this.years.push({ index: i, year: tempDate.getFullYear() });
            }


        }

        // Generate Points
        for (i = 0; i < this.points; i++) {
            point = this.data[i];
            this.happy.push( new JCL.Point(this.interval * i,this.middle - (this.middle * (point[1] / this.max))));
            this.sad.push( new JCL.Point(this.interval * i,this.middle + (this.middle * (point[2] / this.max))));
        }

        // Draw Lines
        this.canvas.drawPath(this.happy, "rgba(235,173,96,1)", 2);
        this.canvas.drawPath(this.sad, "rgba(139,171,141,1)", 2);

        // Add Base Lines
        this.happy.push( new JCL.Point(this.canvas.width, this.middle));
        this.sad.push( new JCL.Point(this.canvas.width, this.middle));
        this.happy.push( new JCL.Point(0, this.middle));
        this.sad.push( new JCL.Point(0, this.middle));

        // Draw Fill
        this.canvas.drawShape(this.happy, "rgba(235,173,96,0.6)");
        this.canvas.drawShape(this.sad, "rgba(139,171,141,0.6)");

        // Draw Axis
        this.canvas.drawPath([new JCL.Point(0, this.middle-0.5), new JCL.Point(this.canvas.width, this.middle-0.5)], "rgba(150,150,150,1)", 1);

        // Draw Year Lines
        this.canvas.drawHaystack(this.getYearAxis(), "rgba(150,150,150,0.3)", 1);
        for (i = 0; i < this.years.length; i++) {
            this.canvas.drawText(this.years[i].year, "bold 10px Arial, Helvetica" , new JCL.Point(this.interval * this.years[i].index + 3,this.middle - 2), "bottom", "left", "rgba(90,90,90,1)");
        }

        // Hookup Mouse Move (set active interval)
        this.active.dom.onmousemove = function(e) {
            that.handleMouse.call(that, e);
        };

        // Hookup Mouse Out (clearing the active chart)
        this.active.dom.onmouseout = function() {
            that.mouseInterval = null;
        };

        JCL.renderer.add(this.render.bind(this));

    },

    getYearAxis: function getYearAxis() {

        var i, len, obj, output;

        len = this.years.length;
        output = [];

        for (i = 0; i < len; i++)  {
            obj = this.years[i];
            output.push([
                new JCL.Point(Math.floor(this.interval * obj.index) + 0.5, 0),
                new JCL.Point(Math.floor(this.interval * obj.index) + 0.5, this.canvas.height)
            ]);
        }

        return output;

    },

    handleMouse: function handleMouse(e) {
        this.mouseInterval = Math.round((e.clientX - this.offset.left) / this.interval);
    },

    render: function render() {

        var happy, sad, data, x;

        if (this.mouseInterval !== this.lastInterval) {

            this.active.clear();

            if (this.mouseInterval) {

                happy = this.happy[this.mouseInterval];
                sad = this.sad[this.mouseInterval];
                data = this.data[this.mouseInterval];
                x = this.interval * this.mouseInterval;

                // Draw Date Line
                this.active.drawPath([ new JCL.Point(x, 0), new JCL.Point(x, this.canvas.height)], "rgba(150,150,150,0.3)", 1);

                // Draw Axis Lines
                this.active.drawPath([ new JCL.Point(x, this.middle), new JCL.Point(x, happy.y)], "rgba(205,143,66,1)", 2);
                this.active.drawPath([ new JCL.Point(x, this.middle), new JCL.Point(x, sad.y)], "rgba(109,141,111,1)", 2);

                // Draw Blips
                this.active.drawCircle(happy, 7, "rgba(235,173,96,1)", "rgba(205,143,66,1)", 2);
                this.active.drawCircle(sad, 7, "rgba(139,171,141,1)", "rgba(109,141,111,1)", 2);

                // Draw Values
                if (x > this.canvas.width - 60) {
                    this.active.drawText(data[1], "bold 10px Arial, Helvetica" , new JCL.Point(x - 10, happy.y), "middle", "right", "rgba(90,90,90,1)");
                    this.active.drawText(data[2], "bold 10px Arial, Helvetica" , new JCL.Point(x - 10, sad.y), "middle", "right", "rgba(90,90,90,1)");
                } else {
                    this.active.drawText(data[1], "bold 10px Arial, Helvetica" , new JCL.Point(x + 10, happy.y), "middle", "left", "rgba(90,90,90,1)");
                    this.active.drawText(data[2], "bold 10px Arial, Helvetica" , new JCL.Point(x + 10, sad.y), "middle", "left", "rgba(90,90,90,1)");
                }

                // Draw Date Label
                if (x < this.canvas.width - 60) {
                    this.active.drawText(data[0], "bold 10px Arial, Helvetica" , new JCL.Point(x + 3, 0), "top", "left", "rgba(90,90,90,1)");
                } else {
                    this.active.drawText(data[0], "bold 10px Arial, Helvetica" , new JCL.Point(x - 3, 0), "top", "right", null, "rgba(90,90,90,1)");
                }

            }

            this.lastInterval = this.mouseInterval;
        }

    }

};

window.onload = function onload() {

    bipolar.init("bg", "active");

};

