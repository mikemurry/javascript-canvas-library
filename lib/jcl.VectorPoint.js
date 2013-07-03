JCL.VectorPoint = function (x, y, z) {

    if (arguments.length === 1) {
        z = x.z || 0;
        y = x.y || 0;
        x = x.x || 0;
    }

    return this.set(x,y,z);

};

JCL.VectorPoint.prototype = JCL.Point.prototype;

JCL.VectorPoint.prototype.add = function(V) {
    this.x += V.x;
    this.y += V.y;
    this.z += V.z;
    return this;
};

JCL.VectorPoint.prototype.subtract = function(V) {
    this.x -= V.x;
    this.y -= V.y;
    this.z -= V.z;
    return this;
};

JCL.VectorPoint.prototype.scale = function(V) {

    if (typeof V === 'number') {
        var num = V;
        V = {
            x: num,
            y: num,
            z: num
        }
    }

    this.x *= V.x;
    this.y *= V.y;
    this.z *= V.z;

    return this;

};

JCL.VectorPoint.prototype.length = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
};

JCL.VectorPoint.prototype.normalize = function() {
    var inverse = 1 / this.length();
    this.scale(inverse);
    return this;
};

JCL.VectorPoint.prototype.clone = function() {
    return new JCL.VectorPoint(this.x, this.y, this.z);
};