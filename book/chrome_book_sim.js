var mouse_x = 0;
var mouse_y = 0;
var viewport_page_width = 0.8;

var clamp = function(v,l,h) { return Math.max(Math.min(v,h),l); }

function PageTextureManager(pages) {
    this.pages = pages;
    this.current_left_static_page = 0;
    this.flipping_page_on_left = false;

    // rel_page: 0 = left static page, 1 = front of "flipping" page, 2 = back, 3 = right static page
    this.getTexture = function(rel_page) {
        return this.pages[(this.current_left_static_page + rel_page) % this.pages.length];
    }

    this.liftPage = function(onLeft) {
        if(onLeft && !this.flipping_page_on_left) {
            this.current_left_static_page -= 2;
        }
        if(!onLeft && this.flipping_page_on_left) {
            this.current_left_static_page += 2;
        }
        if(this.current_left_static_page < 0) {
            this.current_left_static_page += this.pages.length;
        }
    }

    this.dropPage = function(onLeft) {
        this.flipping_page_on_left = onLeft;
    }
}

function ChromeBookSim(canvas, page_width, page_height, tessellation_res) {
    this.initConstraints = function() {
        var mesh = this.book_mesh;
        var sim = this;

        this.constraints = [];

        // apply forcing
        this.constraints = this.constraints.concat(function() {
                        var cornerVert = mesh.cols-1;
                        var radius = mesh.page_width;
                        var theta = (sim.turn_amount + 1.0) * 1.5707;

                        var x = radius * Math.cos(theta);
                        var y = radius * Math.abs(Math.sin(theta));
                        var z = 0.0;
                        for(var v = mesh.cols-1; v < mesh.num_verts; v += mesh.cols) {
                            mesh.verts[v*3] = x;
                            mesh.verts[v*3+1] = y;
                            mesh.verts[v*3+2] = z;
                            z += mesh.tessellation_res;
                        }
                    });
    

        // set diagonal lengths
        this.constraints = this.constraints.concat(function() {
                        for(var j = 0; j < mesh.rows-1; ++j) {
                            for(var i = 1; i < mesh.cols; ++i) {
                                var v1 = j*mesh.cols + i;
                                applyLengthConstraint(mesh, v1, v1+mesh.cols-1, mesh.diagonal_length);
                            }
                        }
                    });

        // set vertical lengths
        this.constraints = this.constraints.concat(function() {
                        for(var i = 0; i < mesh.num_verts-mesh.cols; ++i) {
                            applyLengthConstraint(mesh, i, i+mesh.cols, mesh.tessellation_res);
                        }
                    });

        // set horizontal lengths
        this.constraints = this.constraints.concat(function() {
                        for(var i = 0; i < mesh.num_verts; ++i) {
                            if(i % mesh.cols == 0)
                                continue;
                            applyLengthConstraint(mesh, i, i-1, mesh.tessellation_res);
                        }
                    });

        // depenetrate ground
        this.constraints = this.constraints.concat(function() {
                        for(var i = 0; i < mesh.num_verts; ++i) {
                            if(mesh.verts[i*3+1] < 0)
                                mesh.verts[i*3+1] = 0;
                        }
                    });

        // bind page edges to book edges / spine
        this.constraints = this.constraints.concat(function() {
                       for(var i = 0; i < mesh.cols; ++i) {
                           mesh.verts[i*3+2] = 0.0;
                       }
                       for(var j = mesh.num_verts-mesh.cols; j < mesh.num_verts; ++j) {
                           mesh.verts[j*3+2] = mesh.page_height;
                       }
                       var z = 0.0;
                       for(var i = 0; i < mesh.num_verts; i += mesh.cols) {
                           mesh.verts[i*3+0] = 0.0;
                           mesh.verts[i*3+1] = 0.0;
                           mesh.verts[i*3+2] = z;
                           z += mesh.tessellation_res;
                       }
                   });
    }

    // Page control incorporates user input as well as an "auto-drive" to finish turning when the cursor is released
    this.initPageControl = function() {
        this.finishing_turn = false;
        this.turn_amount = 0.0;
        this.last_turn_amount = 0.0;
        this.turn_speed = 0.001;
        return function(dt) {
            if(this.finishing_turn) {
                this.turn_amount = this.last_turn_amount + (this.last_turn_amount < 0.0 ? -this.turn_speed : this.turn_speed) * dt;
                this.turn_amount = clamp(this.turn_amount, -1.0, 1.0);

                if(Math.abs(this.turn_amount) - 1 == 0) {
                    this.book_mesh.resetVertArray(this.turn_amount > 0.0);
                    this.physics_active = false;
                    this.finishing_turn = false;
                    sim.pages.dropPage(this.turn_amount > 0.0);
                }
            }
            else if(this.physics_active) {
                this.turn_amount = clamp(mouse_x / viewport_page_width, -1.0, 1.0);
                this.turn_amount = Math.acos(this.turn_amount) / Math.PI * 2.0 - 1.0;
            }
            this.last_turn_amount = this.turn_amount;
        }
    };

    this.initPages = function() {
        var p = [loadTexture("img/page1.png"),
                    loadTexture("img/page2.png"),
                    loadTexture("img/page3.jpg"),
                    loadTexture("img/page4.jpg"),
                    loadTexture("img/page5.jpg"),
                    loadTexture("img/page6.jpg")];
        this.pages = new PageTextureManager(p);
    }

    // hacking in the "ground" to look fancy
    var woodTexture = loadTexture("img/wood.jpg");

    var verts = [-20.0, -1.0, -30.0,
                    -20.0, -1.0, 10.0,
                    20.0, -1.0, 10.0,
                    20.0, -1.0, -30.0];
    this.groundVertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.groundVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    this.groundVertBuffer.itemSize = 3;
    this.groundVertBuffer.numItems = 4;

    var normals = [0.0,1.0,0.0,
                    0.0,1.0,0.0,
                    0.0,1.0,0.0,
                    0.0,1.0,0.0];
    this.groundNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.groundNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    this.groundNormalBuffer.itemSize = 3;
    this.groundNormalBuffer.numItems = 4;

    var texCoords = [0.0, 0.0,
                        0.0, 50.0,
                        40.0, 50.0,
                        40.0, 0.0];
    this.groundTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.groundTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
    this.groundTexCoordBuffer.itemSize = 2;
    this.groundTexCoordBuffer.numItems = 4;

    var indices = [0,1,2,1,2,3];
    this.groundIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.groundIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    this.groundIndexBuffer.itemSize = 1;
    this.groundIndexBuffer.numItems = 6;

    this.drawScene = function() {
        prepareScene();

        gl.depthMask(false);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.groundVertBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.groundVertBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.groundNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.groundNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.groundTexCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.groundTexCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.groundIndexBuffer);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, woodTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
        gl.drawElements(gl.TRIANGLES, this.groundIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

        this.sendStaticPages.call(this, this.pages.getTexture(0), this.pages.getTexture(3));
        gl.depthMask(true);
        this.book_mesh.draw(this.pages.getTexture(1), this.pages.getTexture(2));
    }

    this.physics_active = false;
    this.lastTime = 0;
    this.animate = function() {
        var timeNow = new Date().getTime();
        if (this.lastTime != 0) {
            var elapsed = timeNow - this.lastTime;
            this.updatePageControl(elapsed);
            if(this.physics_active) {
                updatePhysics(elapsed, this.book_mesh, this.constraints);
            }
        }
        this.lastTime = timeNow;
    }

    this.tick = function() {
        requestAnimFrame(function() { sim.tick(); } );
        this.animate();
        this.drawScene();
    }

    // build a function to translate screen-space mouse coords into 2D coords in the plane of the book
    this.initPicking = function(fovy, aspect_ratio) {
        prepareScene();     // dummy run to set up the matrices
        var inverseMvMatrix = mat4.create();
        mat4.inverse(mvMatrix, inverseMvMatrix);
        var p0 = vec3.create();
        var p1 = vec3.create();
        mat4.multiplyVec3(inverseMvMatrix, [0,0,0], p0);
        var proj_z = 1 / Math.sin(degToRad(fovy/2.0)) * Math.sin(degToRad(90-fovy/2.0));
        return function(cursor_x,cursor_y) {
            mat4.multiplyVec3(inverseMvMatrix, [-cursor_x*aspect_ratio, cursor_y, proj_z], p1);
            var t = p0[1]/(p0[1]-p1[1]);
            return [p0[0] - t*(p0[0]-p1[0]), p0[2] - t*(p0[2]-p1[2])];
        }
    }

    this.handleMouseDown = function(event) {
        if(!sim.physics_active) {
            if(event['ctrlKey']) {
                sim.physics_active = true;
                if(sim.pages.flipping_page_on_left ^ mouse_x < 0.0) {
                    sim.book_mesh.resetVertArray(mouse_x < 0.0);
                }
                sim.pages.liftPage(mouse_x < 0.0);
            }
            else {
                // forward to offscreen tab
            }
        }
    }

    this.handleMouseUp = function() {
        if(sim.physics_active && !sim.finishing_turn) {
            sim.finishing_turn = true;
        }
        if(!sim.physics_active) {
            // forward to offscreen tab
        }
    }

    this.handleMouseMove = function(event) {
        var w = event.srcElement.clientWidth;
        var h = event.srcElement.clientHeight;
        mouse_x = (event.offsetX - w/2)/(w/2);
        mouse_y = (event.offsetY - h/2)/(h/2);
        if(!sim.physics_active) {
            // forward to offscreen tab
        }
    }

    this.sendStaticPages = initStaticGeometry(page_width, page_height);
    this.updatePageControl = this.initPageControl();

    this.initPages();
    this.book_mesh = new ClothMesh(page_width, page_height, tessellation_res);
    this.initConstraints();

    var sim = this;
    canvas.onmousedown = this.handleMouseDown;
    canvas.onmousemove = this.handleMouseMove;
    canvas.onmouseup = this.handleMouseUp;
    canvas.onmouseout = this.handleMouseUp;
    this.pick = this.initPicking(45, gl.viewportWidth/gl.viewportHeight);
}
