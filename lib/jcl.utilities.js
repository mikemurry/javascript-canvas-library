/**
 * @namespace JCL.utilities
 */

JCL.utilities = {

    /**
     * @description Returns an integer between the specified minimum (inclusive) and maximum (exclusive).
     * @param min {Number} The minimum range for the returned integer (inclusive).
     * @param max {Number} The maximum range for the returned integer (exclusive).
     * @return {Number}
     */

    randomInt: function(min, max) {
        if (min !== undefined && max !== undefined) {
            return Math.floor((max - min) * Math.random()) + min;
        } else { JCL.warn("utilities.randomInt() Error: Missing min or max argument."); }
        return false;
    },

    /**
     * @description Converts degrees into radians.
     * @param degrees {Number}
     * @return {Number}
     */

    radians: function(degrees) {
        return (Math.PI / 180) * degrees;
    },

    /**
     * @description Converts radians into degrees.
     * @param radians {Number}
     * @return {Number}
     */

    degrees: function(radians) {
        return radians * (180 / Math.PI);
    },

    /**
     * @description Converts a string into a DOM fragment.
     * @param id {String} The ID of the resulting DOM fragment.
     * @param htmlStr {String} The HTML string to convert.
     * @return {Object} The resulting DOM fragment.
     */

    createFragment: function(id, htmlStr) {
        var frag = document.createDocumentFragment(), temp = document.createElement("div");
        temp.id = id;
        temp.innerHTML = htmlStr;
        while (temp.firstChild) { frag.appendChild(temp.firstChild); }
        return frag;
    },

    /**
     * @description Returns the minimum and maximum value of a given collection.
     * @param collection {Array} The array to iterate over.
     * @return {Object} The resulting min and max.
     */

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
