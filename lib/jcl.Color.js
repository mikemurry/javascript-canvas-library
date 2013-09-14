// WARNING: JCL.Color is under development and should not be used.

JCL.Color = function(options) {

    if (options.hasOwnProperty('h')) {
        // Assume HSL
        this.h = options.h || 0;
        this.s = options.s || 0;
        this.l = options.l || 0;
        this.toRGB(this.hsl());
    } else if (options.hasOwnProperty('r')) {
        // Assume RGB
        this.r = options.r || 0;
        this.g = options.g || 0;
        this.b = options.b || 0;
        this.toHSL(this.rgb());
    }

    this.a = options.a || 1;

    return this;

};

JCL.Color.prototype = {

    //lerp: function(b, ratio) {
        //return this;
    //},

    toHSL: function(r, g, b) {

        var r1 = r / 255;
        var g1 = r / 255;
        var b1 = b / 255;

        var maxColor = Math.max(r1, g1, b1);
        var minColor = Math.min(r1, g1, b1);

        var L = (maxColor + minColor) / 2;
        var S = 0;
        var H = 0;

        if (maxColor != minColor) {

            // Calculate S
            if (L < 0.5) {
                S = (maxColor - minColor) / (maxColor + minColor);
            } else {
                S = (maxColor - minColor) / (2.0 - maxColor - minColor);
            }

            // Calculate H
            if (r1 === maxColor) {
                H = (g1-b1) / (maxColor - minColor);
            } else if (g1 === maxColor) {
                H = 2.0 + (b1-r1) / (maxColor - minColor);
            } else {
                H = 4.0 + (r1 - g1) / (maxColor - minColor);
            }
        }

        L = L * 100;
        S = S * 100;
        H = H * 60;

        if (H<0) { H += 360; }

        this.h = H;
        this.s = S;
        this.l = L;

        return this.hsl();

    },

    toRGB: function(h,s,l) {

        h = (h % 360) / 360;

        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        var m1= l * 2 - m2;

        this.r = hue(h + 1/3) * 255;
        this.g = hue(h) * 255;
        this.b = hue(h - 1/3) * 255;

        return this.rgb();

        function hue(h) {
            h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
            if (h * 6 < 1) { return m1 + (m2 - m1) * h * 6; }
            else if (h * 2 < 1) { return m2; }
            else if (h * 3 < 2) { return m1 + (m2 - m1) * (2/3 - h) * 6; }
            else return m1;
        }

    },

    hsl: function() {
        return { h: this.h, s: this.s, l: this.l, a: this.a };
    },

    rgb: function() {
        return { r: this.r, g: this.g, b: this.b, a: this.a };
    }



};