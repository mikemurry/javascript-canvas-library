test('JCL.Arc', function() {

    var subject;
    var arena = new JCL.Canvas('arena');

    // Default Arc

    subject = new JCL.Arc();

    ok(subject instanceof JCL.Arc, 'Instance of JCL.Arc.');
    deepEqual(subject.center, new JCL.Point(0,0), 'Default center at JCL.Point(0,0).');
    equal(subject.radius, 0, 'Default radius of 0.');
    equal(subject.fillStyle, null, 'Default fill style of null.');
    equal(subject.strokeStyle, null, 'Default stroke style of null.');
    equal(subject.start, 0, 'Default start angle of 0.');
    equal(subject.end, 360, 'Default end angle of 360.');

    // Custom Arc

    subject = new JCL.Arc({
        center: { x: 100, y: 50 },
        radius: 75,
        fill: 'red',
        stroke: 'rgba(0,0,0,.5)',
        thickness: 2,
        start: 45,
        end: 135
    });

    ok(subject.center instanceof JCL.Point, 'Conversion of center to JCL.Point.');
    deepEqual(subject.center, new JCL.Point(100,50), 'Custom center at JCL.Point(100,50).');
    equal(subject.radius, 75, 'Custom radius of 75.');
    equal(subject.fillStyle, 'red', 'Custom fill style of red.');
    equal(subject.strokeStyle, 'rgba(0,0,0,.5)', 'Custom stroke style of rgba(0,0,0,.5).');
    equal(subject.start, 45, 'Custom start angle of 45.');
    equal(subject.end, 135, 'Custom end angle of 135.');
    ok(subject.render(arena), 'Renderable.');

});

test('JCL.Canvas', function() {

    var arena;

    arena = new JCL.Canvas('arena');
    ok(arena.enabled, 'ID Selected.');

    arena = new JCL.Canvas(document.getElementById('arena'));
    ok(arena.enabled, 'JavaScript Selected.');

    arena = new JCL.Canvas($('#arena'));
    ok(arena.enabled, 'jQuery Selected.');

    equal(arena.width, 100, 'Default width of 100.');
    equal(arena.height, 100, 'Default height of 100.');

    arena = new JCL.Canvas('arena', {
        width: 250,
        height: 150
    });

    equal(arena.width, 250, 'Custom width of 250.');
    equal(arena.height, 150, 'Custom height of 150.');

    throws(function() { new JCL.Canvas(); }, 'Error when no ID is passed.');
    throws(function() { new JCL.Canvas('notreal') }, 'Error when ID doesn\'t exist.');

    // TODO: Test prototype functionality.

});

test('JCL.Circle', function() {

    var subject;
    var arena = new JCL.Canvas('arena');

    // Default Circle

    subject = new JCL.Circle();

    ok(subject instanceof JCL.Circle, 'Instance of JCL.Circle.');
    deepEqual(subject.center, new JCL.Point(0,0), 'Default center at JCL.Point(0,0).');
    equal(subject.radius, 0, 'Default radius of 0.');
    equal(subject.fillStyle, null, 'Default fill style of null.');
    equal(subject.strokeStyle, null, 'Default stroke style of null.');

    // Custom Circle

    subject = new JCL.Circle({
        center: { x: 100, y: 50 },
        radius: 75,
        fill: 'red',
        stroke: 'rgba(0,0,0,.5)',
        thickness: 2
    });

    ok(subject.center instanceof JCL.Point, 'Conversion of center to JCL.Point.');
    deepEqual(subject.center, new JCL.Point(100,50), 'Custom center at JCL.Point(100,50).');
    equal(subject.radius, 75, 'Custom radius of 75.');
    equal(subject.fillStyle, 'red', 'Custom fill style of red.');
    equal(subject.strokeStyle, 'rgba(0,0,0,.5)', 'Custom stroke style of rgba(0,0,0,.5).');
    ok(subject.render(arena), 'Renderable.');

});

test('JCL.performance', function() {

    ok(JCL.performance.enable(), 'Enabled.');

    ok(JCL.performance.delta(), 'Enabled delta.');
    ok(JCL.performance.elapsed(), 'Enabled elapsed.');
    ok(JCL.performance.fps(), 'Enabled fps.');

    ok(JCL.performance.disable(), 'Disabled.');
    ok(!JCL.performance.delta(), 'Disabled delta.');
    ok(!JCL.performance.elapsed(), 'Disabled elapsed.');
    ok(!JCL.performance.fps(), 'Disabled fps.');

});

test('JCL.Point', function() {

    var a, b, t;

    // Default Point

    a = new JCL.Point();
    ok(a instanceof JCL.Point);
    equal(a.x, 0, 'Default x.');
    equal(a.y, 0, 'Default y.');
    equal(a.z, 0, 'Default z.');
    deepEqual(a, new JCL.Point(0,0), 'Default object.');

    b = new JCL.Point(100, 200);
    equal(b.x, 100, 'Custom x.');
    equal(b.y, 200, 'Custom y.');
    equal(b.z, 0, 'Custom z.');

    b.set(50, 75, 25);
    equal(b.x, 50, 'set() x.');
    equal(b.y, 75, 'set() y.');
    equal(b.z, 25, 'set() z.');

    deepEqual(b.toJSON(), { x: 50, y: 75, z: 25 }, 'get()');
    equal(a.distance(b).toFixed(2), '90.14', 'distance()');
    equal(a.angle(b).toFixed(2), '0.98', 'angle()');

    t = a.tangent(30, 10);
    t.x = t.x.toFixed(2);
    t.y = t.y.toFixed(2);

    equal(t.x, '8.66', 'angle() x');
    equal(t.y, '5.00', 'angle() y');

    t = a.lerp(b, 0.25);
    equal(t.x, 12.5, 'lerp() x');
    equal(t.y, 18.75, 'lerp() y');

    a.translate(1,2,3);
    equal(a.x, 1, 'lerp() x');
    equal(a.y, 2, 'lerp() y');
    equal(a.z, 3, 'lerp() z');

});

test('JCL.Rectangle', function() {

    var subject;
    var arena = new JCL.Canvas('arena');

    // Default Rectangle

    subject = new JCL.Rectangle();

    ok(subject instanceof JCL.Rectangle, 'Instance of JCL.Rectangle.');
    equal(subject.x, 0, 'Default x of 0.');
    equal(subject.y, 0, 'Default y of 0.');
    equal(subject.width, 0, 'Default width of 0.');
    equal(subject.height, 0, 'Default height of 0.');
    equal(subject.fillStyle, null, 'Default fill style of null.');
    equal(subject.strokeStyle, null, 'Default stroke style of null.');
    equal(subject.lineWidth, 0, 'Default stroke thickness of null.');

    // Custom Rectangle

    subject = new JCL.Rectangle({
        x: 100,
        y: 50 ,
        width: 200,
        height: 100,
        fill: 'red',
        stroke: 'rgba(0,0,0,.5)',
        thickness: 2
    });

    equal(subject.x, 100, 'Custom x of 100.');
    equal(subject.y, 50, 'Custom y of 50.');
    equal(subject.width, 200, 'Custom width of 75.');
    equal(subject.height, 100, 'Custom height of 175.');
    equal(subject.fillStyle, 'red', 'Custom fill style of red.');
    equal(subject.strokeStyle, 'rgba(0,0,0,.5)', 'Custom stroke style of rgba(0,0,0,.5).');
    equal(subject.lineWidth, 2, 'Custom start angle of 45.');
    ok(subject.render(arena), 'Renderable.');

    deepEqual(subject.center(), new JCL.Point(200, 100), 'Center calculation.');

    subject.center(new JCL.Point(400,200));
    equal(subject.x, 300, 'Center: X');
    equal(subject.y, 150, 'Center: Y');

    subject = new JCL.Rectangle({
        x: 1.234,
        y: 4.970,
        width: 156.123,
        height: 261.999
    }).round();

    equal(subject.x, 1, 'Round: x');
    equal(subject.y, 5, 'Round: x');
    equal(subject.width, 156, 'Round: width');
    equal(subject.height, 262, 'Round: height');

});

test('JCL.renderer', function() {

    var a = function() {
        return 'hello';
    };

    var b = function() {
        return 'world';
    };

    equal(JCL.renderer.add(a), 0, 'Index first.');
    equal(JCL.renderer.debug().length, 1, 'Length first.');
    equal(JCL.renderer.add(b), 1, 'Index second.');
    equal(JCL.renderer.debug().length, 2, 'Length second.');

    equal(JCL.renderer.remove(1), true, 'Removed second.');
    equal(JCL.renderer.debug().length, 1, 'Length second.');
    equal(JCL.renderer.remove(0), true, 'Removed first.');
    equal(JCL.renderer.debug().length, 0, 'Length first.');

});

test('JCL.utilities', function() {

    var a, b;

    a = JCL.utilities.randomInt(0,100);
    ok(a >= 0, 'Random integer: lower bound.');
    ok(a < 100, 'Random integer: upper bound.');

    a = JCL.utilities.radians(45);
    equal(a.toFixed(2), '0.79', 'Radians');

    b = JCL.utilities.degrees(a);
    equal(b, 45, 'Degrees');

    a = JCL.utilities.bounds([4,7,6,3,9]);
    equal(a.min, 3, 'Bounds: lower bound.');
    equal(a.max, 9, 'Bounds: upper bound.');

});
