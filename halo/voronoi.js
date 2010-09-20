/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(window) {

var Vertex = function(x, y, artificial) {
    this.x = x;
    this.y = y;
    this.edge = null;
    this.artificial = Boolean(artificial);
};

var HalfEdge = function() {
    this.next = null;
    this.face = null;
};
HalfEdge.prototype = {
    coefs: function() {
        A = this.twin.origin.y - this.origin.y;
        B = this.origin.x - this.twin.origin.x;
        C = -(A * this.origin.x + B * this.origin.y);
        return [A, B, C];
    },
    perpendicular: function() {
        origin = this.origin;
        target = this.twin.origin;
        midx = (origin.x + target.x) / 2;
        midy = (origin.y + target.y) / 2;

        A = origin.x - target.x;
        B = origin.y - target.y;
        C = -(A * midx + B * midy);
        return [A, B, C];
    }
};

var make_edge_pair = function(v0, v1) {
    var e0 = new HalfEdge(),
        e1 = new HalfEdge();
    e0.twin = e1;
    e0.origin = v0;
    e0.origin.edge = e0;
    e1.twin = e0;
    e1.origin = v1;
    e1.origin.edge = e1;
    return e0;
};

var Face = function(edge) {
    this.edge = edge;
    this.data = null;
};

var Triangle = function(face) {
    this.face = face;
    this.face.data = this;
    this.children = [];

    this.coefs = [];
    for (var i = 0, e = this.face.edge; i < 3; ++i) {
        this.coefs.push(e.coefs());
        e = e.next;
    }
};
Triangle.prototype = {
    get_face: function() {
        var triangle;
        for (triangle = this;
            triangle.children.length > 0;
            triangle = triangle.children[0])
            ;
        return triangle.face;
    },
    inside: function(v) {
        for (var i = 0, l = this.coefs.length; i < l; ++i) {
            var A = this.coefs[i][0],
                B = this.coefs[i][1],
                C = this.coefs[i][2];
            if (A * v.x + B * v.y + C > 0.)
                return false;
        }
        return true;
    },
    incircle: function(d) {
        var a = this.face.edge.origin,
            b = this.face.edge.next.origin,
            c = this.face.edge.next.next.origin,
            norm_a = a.x * a.x + a.y * a.y,
            norm_b = b.x * b.x + b.y * b.y,
            norm_c = c.x * c.x + c.y * c.y,
            norm_d = d.x * d.x + d.y * d.y,
            A = a.x - d.x,
            B = a.y - d.y,
            C = norm_a - norm_d,
            D = b.x - d.x,
            E = b.y - d.y,
            F = norm_b - norm_d,
            G = c.x - d.x,
            H = c.y - d.y,
            I = norm_c - norm_d,
            det = A * (E * I - F * H) - D * (B * I - C * H) +
                G * (B * F - C * E);
        return det > 0.;
    },
    circumcenter: function() {
        var x, y,
            L1 = this.face.edge.perpendicular(),
            L2 = this.face.edge.next.perpendicular();
        x = (L2[1] * L1[2] - L1[1] * L2[2]) / (L2[0] * L1[1] - L1[0] * L2[1]);
        if (L1[1] != 0)
            y = (-L1[0] * x - L1[2]) / L1[1];
        else
            y = (-L2[0] * x - L2[2]) / L2[1];
        return [x, y];
    },
    child: function(v) {
        for (var i = 0, l = this.children.length; i < l; ++i) {
            var child = this.children[i];
            if (child.inside(v))
                return child;
        }
        throw "OutsideTriangleError";
    },
    find_leaf: function(v) {
        var triangle;
        for (triangle = this;
            triangle.children.length > 0;
            triangle = triangle.child(v))
            ;
        return triangle;
    },
    deep_split: function(v) {
        var leaf = this.find_leaf(v);
        leaf.split(v);
        return leaf;
    },
    split: function(v) {
        var side0 = this.face.edge,
            side1 = side0.next,
            side2 = side1.next,
            e0 = make_edge_pair(v, side0.origin),
            e1 = make_edge_pair(v, side1.origin),
            e2 = make_edge_pair(v, side2.origin);

        e0.next = side0;
        e1.next = side1;
        e2.next = side2;

        e0.twin.next = e2;
        e1.twin.next = e0;
        e2.twin.next = e1;

        side0.next = e1.twin;
        side1.next = e2.twin;
        side2.next = e0.twin;

        side0.face = new Face(side0);
        side1.face = new Face(side1);
        side2.face = new Face(side2);
        e0.face = side0.face;
        e1.twin.face = side0.face;
        e1.face = side1.face;
        e2.twin.face = side1.face;
        e2.face = side2.face;
        e0.twin.face = side2.face;

        this.face = null;
        this.children = [
            new Triangle(side0.face),
            new Triangle(side1.face),
            new Triangle(side2.face)];
    },
    far_edge: function(v) {
        var edge;
        for (edge = this.face.edge; edge.origin !== v; edge = edge.next)
            ;
        return edge.next;
    },
    flip: function(v) {
        var children,
            edge = this.far_edge(v),
            neighbor = edge.twin.face.data,
            target = edge.twin.next.next.origin,
            v_cw = edge.next,
            v_ccw = v_cw.next,
            t_cw = edge.twin.next,
            t_ccw = t_cw.next;

        edge.origin = v;
        edge.twin.origin = target;
        v_cw.next = edge;
        v_ccw.next = t_cw;
        t_cw.next = edge.twin;
        t_ccw.next = v_cw;
        edge.next = t_ccw;
        edge.twin.next = v_ccw;

        t_ccw.face = this.face;
        v_ccw.face = neighbor.face;

        this.face.edge = edge;
        neighbor.face.edge = edge.twin;

        v_cw.origin.edge = v_cw;
        t_cw.origin.edge = t_cw;

        children = [new Triangle(this.face), new Triangle(neighbor.face)]
        this.children = children;
        neighbor.children = children;
        this.face = null;
        neighbor.face = null;
    }
};

var make_triangle = function(v0, v1, v2) {
    var e0 = make_edge_pair(v0, v1),
        e1 = make_edge_pair(v1, v2),
        e2 = make_edge_pair(v2, v0),
        f = new Face(e0);
    e0.next = e1;
    e1.next = e2;
    e2.next = e0;
    e0.face = f;
    e1.face = f;
    e2.face = f;
    return new Triangle(f);
};

var legalize = function(triangle, v) {
    var adjacent,
        face = triangle.far_edge(v).twin.face;
    if (face !== null) {
        adjacent = face.data;
        if (adjacent.incircle(v)) {
            triangle.flip(v);
            legalize(triangle.children[0], v);
            legalize(triangle.children[1], v);
        }
    }
};

var triangulate = function(verticies, max_coord) {
    var i, j, l, l2, vertex, M, triangle, leaf, child;

    if (max_coord === undefined) {
        max_coord = 0;
        for (i = 0, l = verticies.length; i < l; ++i) {
            vertex = verticies[i];
            max_coord = Math.max(max_coord,
                Math.abs(vertex.x), Math.abs(vertex.y));
        }
    }

    M = 3 * max_coord;
    triangle = make_triangle(new Vertex(M, 0, true), new Vertex(0, M, true),
        new Vertex(-M, -M, true));

    for (i = 0, l = verticies.length; i < l; ++i) {
        vertex = verticies[i];
        leaf = triangle.deep_split(vertex);
        for (j = 0; l2 = leaf.children.length, j < l2; ++j)
            legalize(leaf.children[j], vertex);
    }

    return triangle;
};

window.Vertex = Vertex;
window.triangulate = triangulate;

})(window);

