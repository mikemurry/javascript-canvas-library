var achievements = {

    init: function init(staticID, dynamicID) {

        var that = this, perf = JCL.performance, i;

        var achievements = {};
        for (i = 0; i < dataAchievements.length; i++) {
            achievements[dataAchievements[i][0]] = dataAchievements[i][1];
        }

        // Initialize Canvas

        this.static = new JCL.Canvas(staticID, {
            width: 800,
            height: 800,
            zindex: 1
        });

        this.dynamic = new JCL.Canvas(dynamicID, {
            width: 800,
            height: 800,
            zindex: 0
        });

        this.center = new JCL.Point(Math.floor(this.static.width / 2), Math.floor(this.static.height / 2));

        // Instantiate Data

        this.renderStatic();
        this.renderDynamic();

    },

    renderDynamic: function renderDynamic() {

        var dynamic = this.dynamic;

        // Clear Screen
        dynamic.clear();

    },

    renderStatic: function renderStatic() {


        var static = this.static;

        static.clear();

        var points = dataAchievements.length;
        var angle = 360/points;
        for (var i = 0; i < points; i++) {
            var point = this.center.tangent(angle * i, (static.height / 2) * 0.9);
            var rect = new JCL.Rectangle(0, 0, 0, 30, 30, 0);
            rect.center(point);
            static.drawImage(dataAchievements[i][1], rect.x, rect.y, rect.width, rect.height);
        }


    }

};

window.onload = function onload() {
    achievements.init("static", "dynamic");
};

