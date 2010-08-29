
// Provides access to a large (but sparsely allocated) 3d voxel field.

// TODO: subdivide only so far, and then allocate Float32Array blocks.


field = {}



// A FieldNode is a cube of field space.
// If not subdivided, this.value represents the value within the whole cube.
field.FieldNode = function(minX, minY, minZ, size) {
  this.minX = minX;
  this.minY = minY;
  this.minZ = minZ;
  this.size = size;
  
  this.midX = this.minX + this.size * 0.5; 
  this.midY = this.minY + this.size * 0.5; 
  this.midZ = this.minZ + this.size * 0.5; 

  this.value = 1.0;
  this.subdivided = false;
  this.children = [];
};

field.FieldNode.prototype.whichChild(x, y, z) = function() {
  return 1 * (x >= this.midX) |
         2 * (y >= this.midY) |
         4 * (z >= this.midZ);
}

field.FieldNode.prototype.getValue(x, y, z) = function() {
  if (this.subdivided) {
    var child = this.whichChild(x, y, z);
    return this.children[child].getValue(x, y, z);
  } else {
    return this.value;
  }
}

field.FieldNode.prototype.subdivide() = function() {
  var halfSize = size / 2;
  this.children[0] = new field.FieldNode(this.minX, this.minY, this.minZ, halfSize);
  this.children[1] = new field.FieldNode(this.minX + halfSize, this.minY, this.minZ, halfSize);
  this.children[2] = new field.FieldNode(this.minX, this.minY + halfSize, this.minZ, halfSize);
  this.children[3] = new field.FieldNode(this.minX + halfSize, this.minY + halfSize, this.minZ, halfSize);
  this.children[4] = new field.FieldNode(this.minX, this.minY, this.minZ, halfSize);
  this.children[5] = new field.FieldNode(this.minX + halfSize, this.minY, this.minZ + halfSize, halfSize);
  this.children[6] = new field.FieldNode(this.minX, this.minY + halfSize, this.minZ + halfSize, halfSize);
  this.children[7] = new field.FieldNode(this.minX + halfSize, this.minY + halfSize, this.minZ + halfSize, halfSize);
  this.subdivided = true;
}

field.FieldNode.prototype.setValue(x, y, z, value) = function() {
  if (this.subdivided) {
    var child = this.whichChild(x, y, z);
    this.children[child].setValue(x, y, z, value);
  } else if (this.size > 1) {
    this.subdivide();
    var child = this.whichChild(x, y, z);
    this.children[child].setValue(x, y, z, value);
  } else {
    this.value = value;
  }
}

// Returns value if uniform across node, else undefined.
field.FieldNode.prototype.getUniformValue() = function() {
  if (this.subdivided) {
    var value = this.children[0].getUniformValue();
    if (value !== undefined) {
      for (var i = 1; i < 8; ++i) {
        var subValue = this.children[i].getUniformValue();
        if (subValue !== value) {
          value = undefined;
          break;
        }
      }
    }
    return value;
  } else {
    return this.value;
  }
}

field.FieldNode.prototype.optimize() = function() {
  if (this.subdivided) {
    var value = this.getUniformValue();
    if (value !== undefined) {
      this.subdivided = false;
      this.children = [];
      this.value = value;
    } else {
      for (var i = 0; i < 8; ++i) {
        // We can't optimize ourself, but maybe our children can.
        this.children[i].optimize();
      }
    }
  }
}


field.SparseField = function() {
  
  // SparseField is a sparse voxel octree. It only subdivides non-uniform
  // regions. It has dimensions [-maxDim, maxDim-1] in each axis.
  this.maxDim = 1 << 16;

  this.rootNode = new field.FieldNode(-maxDim, -maxDim, -maxDim, maxDim * 2);
};

