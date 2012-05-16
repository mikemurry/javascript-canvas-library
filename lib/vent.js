/**
 * @namespace VENT
 */

var VENT = VENT || {

    log: function log(msg) {
        console.log(msg);
    },

    info: function info(msg) {
        console.info(msg);
    },

    warn: function warn(msg) {
        console.warn(msg);
    },

    error: function error(msg) {
        console.error(msg);
    }

};

/**
 * @description Safely augments the VENT namespace to include the specified path.
 * @param ns {String} A dot separated namespace. Prefixing with "VENT." is optional.
 * @return {Object} Returns the VENT object.
 */

VENT.namespace = function(ns) {

    var parts, parent, i, count;

    parent = VENT;
    parts = ns.split(".");

    // Skip Redundant Top Level
    if (parts[0] === "VENT") {
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