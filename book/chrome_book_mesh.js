function ClothMesh(page_width, page_height, tessellation_res) {
    this.diagonal_length = tessellation_res * 1.41421356;
    this.page_height = page_height;
    this.page_width = page_width;
    this.tessellation_res = tessellation_res;
    this.rows = (page_height/tessellation_res) + 1;
    this.cols = (page_width/tessellation_res) + 1;
    this.num_verts = this.rows*this.cols;

    this.resetVertArray = function(flipped) {
        this.verts = [];
        for(var i = 0; i < this.num_verts; ++i) {
            var x = (i % this.cols) * tessellation_res * (flipped ? -1.0 : 1.0);
            var z = Math.floor(i / this.cols) * tessellation_res;
            this.verts[i*3+0] = x;
            this.verts[i*3+1] = 0.0;
            this.verts[i*3+2] = z;
        }
        this.old_verts = [];
        for(var i = 0; i < this.num_verts*3; ++i) {
            this.old_verts[i] = this.verts[i];
	    }
    }

    this.resetVertArray(false);

    var texCoords = [];
    for(var i = 0; i < this.num_verts; ++i) {
        var x = (i % this.cols) * tessellation_res;
        var z = Math.floor(i / this.cols) * tessellation_res;
        texCoords = texCoords.concat(x/page_width);
        texCoords = texCoords.concat(1.0 - z/page_height);
    }

    var indices = [];
    var num_tris = 0;
    for(var j = 0; j < this.rows-1; ++j) {
        for(var i = 0; i < this.cols-1; ++i) {
            indices = indices.concat((j+1)*this.cols + i);
            indices = indices.concat((j+1)*this.cols + i + 1);
            indices = indices.concat(j*this.cols + i + 1);

            indices = indices.concat((j+1)*this.cols + i);
            indices = indices.concat(j*this.cols + i + 1);
            indices = indices.concat(j*this.cols + i);

			num_tris += 2;
        }
    }
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    this.indexBuffer.itemSize = 1;
    this.indexBuffer.numItems = 3*num_tris;

    this.texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
    this.texCoordBuffer.itemSize = 2;
    this.texCoordBuffer.numItems = this.num_verts;

    this.draw = function(frontTexture, backTexture) {
        var vertBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verts), gl.STATIC_DRAW);
        vertBuffer.itemSize = 3;
        vertBuffer.numItems = this.num_verts;

        var accumulateNormal = function(n,verts,v1,v2,v3) {
            var a = verts[v2*3+0] - verts[v1*3+0];
            var b = verts[v2*3+1] - verts[v1*3+1];
            var c = verts[v2*3+2] - verts[v1*3+2];
            var d = verts[v3*3+0] - verts[v1*3+0];
            var e = verts[v3*3+1] - verts[v1*3+1];
            var f = verts[v3*3+2] - verts[v1*3+2];
            n[0] += b*f - c*e;
            n[1] += c*d - a*f;
            n[2] += a*e - b*d;
        }

        var normals = [];
        for(var i = 0; i < this.num_verts; ++i) {
            var onLeft = i % this.cols == 0;
            var onRight = (i+1) % this.cols == 0;
            var onBottom = i < this.cols;
            var onTop = i >= this.num_verts - this.cols;

            var accumulated_normal = [0.0, 0.0, 0.0];

            if(!onLeft) {
                if(!onTop) {
                    accumulateNormal(accumulated_normal, this.verts, i+this.cols-1, i+this.cols, i);
                    accumulateNormal(accumulated_normal, this.verts, i+this.cols-1, i, i-1);
                }
                if(!onBottom) {
                    accumulateNormal(accumulated_normal, this.verts, i, i-this.cols, i-1);
                }
            }

            if(!onRight) {
                if(!onTop) {
                    accumulateNormal(accumulated_normal, this.verts, i+this.cols, i+1, i);
                }
                if(!onBottom) {
                    accumulateNormal(accumulated_normal, this.verts, i, i+1, i-this.cols+1);
                    accumulateNormal(accumulated_normal, this.verts, i, i-this.cols+1, i-this.cols);
                }
            }

            // normalizing will occur in the shader
            normals = normals.concat(accumulated_normal[0]);
            normals = normals.concat(accumulated_normal[1]);
            normals = normals.concat(accumulated_normal[2]);
        }

        var normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
        normalBuffer.itemSize = 3;
        normalBuffer.numItems = this.num_verts;

        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.texCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, frontTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, backTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.cullFace(gl.FRONT);
        gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        gl.cullFace(gl.BACK);
	}
}
