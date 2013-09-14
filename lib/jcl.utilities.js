JCL.utilities = {

    // randomInt()
    // Returns an integer between the specified minimum (inclusive) and maximum (exclusive).

    randomInt: function(min, max) {
        if (min !== undefined && max !== undefined) {
            return Math.floor((max - min) * Math.random()) + min;
        } else { throw new Error("utilities.randomInt() Error: Missing min or max argument."); }
    },

    // radians()
    // Converts degrees into radians.

    radians: function(degrees) {
        return (Math.PI / 180) * degrees;
    },

    // degrees()
    // Converts radians into degrees.

    degrees: function(radians) {
        return radians * (180 / Math.PI);
    },

    // bounds()
    // Returns the minimum and maximum value for a given collection.

    bounds: function(collection) {

        var i, j, min, max;

        for (i=0, j=collection.length; i<j; i++) {

            if (!min) { min = collection[i]; }
            if (!max) { max = collection[i]; }

            if (collection[i] > max) { max = collection[i]; }
            if (collection[i] < min) { min = collection[i]; }

        }

        return {
            min: min,
            max: max
        }

    }

};
