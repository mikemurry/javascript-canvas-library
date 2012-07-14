var achievements = {

    init: function init(staticID, dynamicID) {

        var that = this, perf = JCL.performance, i, max;

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



        //this.renderStatic();
        //this.renderDynamic();

        this.processData();

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


    },

    loadAchievements: function loadAchievements() {

        return [
            { name: "A" },
            { name: "B" },
            { name: "C" },
            { name: "D" },
            { name: "E" },
            { name: "F" }
        ];

    },

    loadUsers: function loadUsers() {

        // This will eventually be user ID numbers to fetch the achievement list.

        return [
            { name: "John" },
            { name: "Jane" },
            { name: "Jack" }
        ];

    },

    loadEarned: function loadEarned() {

        return [
            { name: "John", achievements: ["A", "B", "C"] },
            { name: "Jack", achievements: ["A", "E"] },
            { name: "Jane", achievements: ["A", "B", "C", "D", "E"] }
        ];

    },

    processData: function processData() {

        var i, imax, j, jmax, achievement, user, earn, relations;

        // Instantiate Data

        this.data = {};
        this.data.users = this.loadUsers();
        this.data.achievements = this.loadAchievements();
        this.data.earned = this.loadEarned();
        this.data.users = this.data.users.length;
        this.data.final = {};

        // Populate final object
        imax = this.data.achievements.length;
        for (i=0; i<imax; i++) {
            this.data.final[this.data.achievements[i].name] = { users: 0, relationships:{} };
            for (j=0; j<imax; j++) {
                this.data.final[this.data.achievements[i].name].relationships[this.data.achievements[j].name] = 0;
            }
        }

        // Loop through each user...
        imax = this.data.earned.length;
        for (i=0; i<imax; i++) {

            user = this.data.earned[i];

            // Give credit to each achievement.
            jmax = user.




            jmax = this.data.achievements.length;
            for (j=0; j<jmax; j++) {

                achievement = this.data.achievements[j];

                if (user.achievements.indexOf(achievement.name) !== -1) {
                    this.data.final[achievement.name].users++;
                }


            }

        }








        // For each achievement...
        /*imax = this.data.achievements.length;
        for (i =0; i<imax; i++) {

            achievement = this.data.achievements[i];

            // Create Placeholder
            this.data.final[achievement.name] = { users: 0, relationships: {} };
            relations = this.data.final[achievement.name].relationships;

            // For each user...
            jmax = this.data.earned.length;
            for (j=0; j<jmax; j++) {

                user = this.data.earned[j];

                if (user.achievements.indexOf(achievement.name) !== -1) {
                    if (relations.hasOwnProperty(achievement.name)) {
                        relations[achievement.name]++;
                    } else {
                        relations[achievement.name] = 1;
                    }
                }



            }

        }*/

        console.dir(this.data.final);
        console.log(this.data.users);

    }

};

window.onload = function onload() {
    achievements.init("static", "dynamic");
};

