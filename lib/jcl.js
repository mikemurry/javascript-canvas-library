

/**
 * @namespace JCL
 */

var JCL = JCL || {

    /**
     * @description Throws a console log.
     * @param msg {String} The message to write to the console.
     */

    log: function(msg) {
        if (console) { console.log(msg); }
    },

    /**
     * @description Throws a console info.
     * @param msg {String} The message to write to the console.
     */

    info: function(msg) {
        if (console) { console.info(msg); }
    },

    /**
     * @description Throws a console warning.
     * @param msg {String} The message to write to the console.
     */

    warn: function(msg) {
        if (console) { console.warn(msg); }
    },

    /**
     * @description Throws a console error.
     * @param msg {String} The message to write to the console.
     */

    error: function(msg) {
        if (console) { console.error(msg); }
    }



};

/**
 * @description Safely augments the JCL namespace to include the specified path.
 * @param ns {String} A dot separated namespace. Prefixing with "JCL." is optional.
 * @return {Object} Returns the JCL object.
 */

JCL.namespace = function(ns) {

    var parts, parent, i, count;

    parent = JCL;
    parts = ns.split(".");

    // Skip Redundant Top Level
    if (parts[0] === "JCL") {
        parts = parts.slice(1);
    }

    count = parts.length;

    for (i=0; i < count; i++) {

        // Create a property if it doesn't exist.
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }

        // Set parent to new property.
        parent = parent[parts[i]];

    }

    return parent;

};