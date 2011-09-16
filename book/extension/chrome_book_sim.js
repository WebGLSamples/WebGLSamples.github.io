var mouse_x = 0;
var mouse_y = 0;
var viewport_page_width = 0.8;

var sleep = function(ms) {
    var start = new Date().getTime();
    while(new Date().getTime() < start + ms);
}

var clamp = function(v,l,h) { return Math.max(Math.min(v,h),l); }

function OffscreenTab(url, width, height, cb) {
    var self = this;

    this.onCreate = function(tab) {
        this.tab = tab;
        chrome.experimental.offscreenTabs.toDataUrl(tab.id, {"format":"jpeg", "quality":90}, function(data) { self.texture = loadTexture(data, false, function(x){}); });
        cb(self);
    }

    this._updateTextureData = function(data) {
   loadTexture(data, false, function(tex) { gl.deleteTexture(self.texture); self.texture = tex; });
    }

    this.update = function() {
        chrome.experimental.offscreenTabs.toDataUrl(this.tab.id, {"format":"jpeg", "quality":90}, function(data) { self._updateTextureData(data); });
    }

    chrome.experimental.offscreenTabs.create({
												"url":url, 
												"width":width, 
												"height":height
											 }, 
											 function(tab) { sleep(100); self.onCreate(tab); } );
}

function PageManager(urls, page_width, page_height) {
    var self = this;

    this.page_width = page_width;
    this.page_height = page_height;
    this.tabs = [];

    this.tab_width = 570;
    this.tab_height = 480;
    
    this.focused_tab = 0;

    for(i in urls) {
        new OffscreenTab(urls[i], this.tab_width, this.tab_height, function(tab) { self.tabs = self.tabs.concat(tab); });
    }

    this.current_left_static_page = 0;
    this.flipping_page_on_left = false;

    this._rel_to_abs_page = function(rel_page) {
        return (this.current_left_static_page + rel_page) % this.tabs.length;
    }
    
    this._get_page = function(rel_page) {
        return this.tabs[this._rel_to_abs_page(rel_page)];
    }
    
    this._get_focused_page = function() {
        var guess = this.focused_tab;
        var page = guess;

        if(this.flipping_page_on_left) {
            if(guess != this._rel_to_abs_page(2) && guess != this._rel_to_abs_page(3))
                page = this._rel_to_abs_page(2);
        }
        else {
            if(guess != this._rel_to_abs_page(0) && guess != this._rel_to_abs_page(1))
                page = this._rel_to_abs_page(0);
        }
        return this.tabs[page];
    }

    // rel_page: 0 = left static page, 1 = front of "flipping" page, 2 = back, 3 = right static page
    this.getTexture = function(rel_page) {
        if(rel_page < this.tabs.length)
        return this._get_page(rel_page).texture;
    }

    this.liftPage = function(onLeft) {
        if(onLeft && !this.flipping_page_on_left) {
            this.current_left_static_page -= 2;
        }
        if(!onLeft && this.flipping_page_on_left) {
            this.current_left_static_page += 2;
        }
        if(this.current_left_static_page < 0) {
            this.current_left_static_page += this.tabs.length;
        }
    }

    this.dropPage = function(onLeft) {
        this.flipping_page_on_left = onLeft;
    }
    
    this._sendMouse = function(e, x, y) {
        var tab = this.tabs[this.focused_tab].tab.id;

        if(tab) {
            chrome.experimental.offscreenTabs.sendMouseEvent(tab, e, x, y, function(x){});
        }
    }

    this.sendMouseEvent = function(plane_x, plane_y, e) {
        if(plane_x < -page_width || plane_x > page_width || plane_y < 0 || plane_y > page_height) {
            return;
        }
        
        var x,y;

        if(plane_x < 0) {
            if(e.type != 'mousewheel') {
                x = Math.round(((plane_x + page_width) / page_width) * this.tab_width);
                y = Math.round((plane_y / page_height) * this.tab_height);
            }

            if(this.flipping_page_on_left) {
                this.focused_tab = this._rel_to_abs_page(2);
                this._sendMouse(e, x, y);
            }
            else {
                this.focused_tab = this._rel_to_abs_page(0);
                this._sendMouse(e, x, y);
            }
        }
        else {
            if(e.type != 'mousewheel') {
                x = Math.round((plane_x / page_width) * this.tab_width);
                y = Math.round((plane_y / page_height) * this.tab_height);
            }

            if(this.flipping_page_on_left) {
                this.focused_tab = this._rel_to_abs_page(3);
                this._sendMouse(e, x, y);
            }
            else {
                this.focused_tab = this._rel_to_abs_page(1);
                this._sendMouse(e, x, y);
            }
        }
    }
    
    this.sendKeyboardEvent = function(e) {
        var tabid = self._get_focused_page().tab.id;
        chrome.experimental.offscreenTabs.sendKeyboardEvent(tabid, e, function(x){});
    }
    
    this.update_ctr = 0;

    this.update = function() {
        this.update_ctr = (this.update_ctr + 1) % 5;
        //if(this.update_ctr % 4 != 0) return;
        for(var i = 0; i < 4; i++) {
            var x = this.tabs[(this.current_left_static_page + i) % this.tabs.length];
            if(x) x.update();
        }
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
        var p = ["http://www.google.com",
                "http://www.youtube.com/watch?v=nCgQDjiotG0",
                "http://bodybrowser.googlelabs.com/body.html",
                "http://en.wikipedia.org",
                "http://images.google.com/search?q=van+gogh&tbm=isch",
                "http://www.xkcd.com"];
        this.pages = new PageManager(p, page_width, page_height);
    }

    // last thing: hacking in the "ground" to look fancy
    var woodTexture = loadTexture(woodImage, true, function(x){});

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
        canvas.focus();
        this.animate();
        this.drawScene();
        this.pages.update();
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
                var plane_coords = sim.pick(mouse_x, mouse_y);
                sim.pages.sendMouseEvent(plane_coords[0], plane_coords[1], event);
            }
        }
    }

    this.handleMouseUp = function(event) {
        if(sim.physics_active && !sim.finishing_turn) {
            sim.finishing_turn = true;
        }
        if(!sim.physics_active) {
            var plane_coords = sim.pick(mouse_x, mouse_y);
            sim.pages.sendMouseEvent(plane_coords[0], plane_coords[1], event);
            return false;
        }
    }

    this.handleMouseMove = function(event) {
        var w = event.srcElement.clientWidth;
        var h = event.srcElement.clientHeight;
        mouse_x = (event.offsetX - w/2)/(w/2);
        mouse_y = (event.offsetY - h/2)/(h/2);
        if(!sim.physics_active) {
            var plane_coords = sim.pick(mouse_x, mouse_y);
            sim.pages.sendMouseEvent(plane_coords[0], plane_coords[1], event);
        }
    }
    
    this.handleKey = function(e) { sim.pages.sendKeyboardEvent(e); if(e.keyCode == 8) return false; };

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
    canvas.onkeypress = this.handleKey;
    canvas.onkeydown = this.handleKey;
    canvas.onkeyup = this.handleKey;
    canvas.onmousewheel = function(event) {
        if(!sim.physics_active) {
            var plane_coords = sim.pick(mouse_x, mouse_y);
            sim.pages.sendMouseEvent(plane_coords[0], plane_coords[1], event);
            return false;
        }
    };
    canvas.oncontextmenu = function(e) { if(e.ctrlKey) return false; };

    this.pick = this.initPicking(45, gl.viewportWidth/gl.viewportHeight);
}
