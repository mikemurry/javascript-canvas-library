/**
 * @namespace JCL.Tooltip
 */

/**
 * @class
 * @param id {String} The ID of the tooltip.
 * @return {Object}
 */

JCL.Tooltip = function Tooltip(dom, id) {

    this.parent = dom || document.getElementsByTagName("body")[0];
    if (this.parent.length > 0) { this.parent = this.parent[0]; }

    this.id = id || "tooltip-" + JCL.utilities.randomInt(0,100000);
    this.el = null;

    this.initialize();

    return this;

};

JCL.Tooltip.prototype = {

    constructor: "Tooltip",

    initialize: function initialize() {

        var output = "";

        var el = document.createElement("div");
        el.id = this.id;
        el.className = "tooltip";

        this.el = this.parent.appendChild(el);

        return this;

    },

    render: function render(content, alignment) {

        var output = "";

        // Left Arrow (if needed)
        if (alignment === "left") { output += "<div class=\"tooltip-arrow-left\"></div>"; }

        // Content
        output += "<div class=\"tooltip-content\">";
        output += content;
        output += "</div>";

        // Right Arrow (if needed)
        if (alignment === "right") { output += "<div class=\"tooltip-arrow-right\"></div>"; }

        this.el.innerHTML = output;

        return this;

    }


};