JCL.Particle = function(options) {

    options = options || {};

    this.mass = options.mass || 1;

    this.position = options.position || new JCL.Point(0,0);
    this.velocity = new JCL.VectorPoint(0,0);
    this.force = new JCL.VectorPoint(0,0);

};

JCL.Particle.prototype = {

    update: function(delta) {

        this.velocity.x += this.force.x * delta;
        this.velocity.y += this.force.y * delta;
        this.velocity.z += this.force.z * delta;

        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;
        this.position.z += this.velocity.z * delta;

    }

};