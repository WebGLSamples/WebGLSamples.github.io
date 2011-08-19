function verlet(dt, mesh) {
    for(var i = 0; i < mesh.num_verts; ++i) {
        var a_x = 0.0;
        var a_y = -0.00001;	// gravity
        var a_z = 0.0;
        var d_x = dt*dt*a_x;
        var d_y = dt*dt*a_y;
        var d_z = dt*dt*a_z;
        var temp_x = mesh.verts[i*3+0];
        var temp_y = mesh.verts[i*3+1];
        var temp_z = mesh.verts[i*3+2];
        mesh.verts[i*3+0] += mesh.verts[i*3+0] - mesh.old_verts[i*3+0] + d_x;
        mesh.verts[i*3+1] += mesh.verts[i*3+1] - mesh.old_verts[i*3+1] + d_y;
        mesh.verts[i*3+2] += mesh.verts[i*3+2] - mesh.old_verts[i*3+2] + d_z;
        mesh.old_verts[i*3+0] = temp_x;
        mesh.old_verts[i*3+1] = temp_y;
        mesh.old_verts[i*3+2] = temp_z;
	}
}

function satisfyConstraints(constraints, iterations) {
    for(var j = 0; j < iterations; ++j) {
        for(var c in constraints) {
            constraints[c]();
        }
    }
}

function updatePhysics(dt, mesh, constraints) {
    verlet(dt, mesh);
    satisfyConstraints(constraints, 30);
}

var applyLengthConstraint = function(mesh, v1, v2, restLength) {
    var dx = mesh.verts[v2*3+0] - mesh.verts[v1*3+0];
    var dy = mesh.verts[v2*3+1] - mesh.verts[v1*3+1];
    var dz = mesh.verts[v2*3+2] - mesh.verts[v1*3+2];
    var D = Math.sqrt(dx*dx + dy*dy + dz*dz);
    var hd = (D-restLength)/D * 0.5;
    mesh.verts[v1*3+0] += dx*hd;
    mesh.verts[v2*3+0] -= dx*hd;
    mesh.verts[v1*3+1] += dy*hd;
    mesh.verts[v2*3+1] -= dy*hd;
    mesh.verts[v1*3+2] += dz*hd;
    mesh.verts[v2*3+2] -= dz*hd;
}
