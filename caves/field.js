
// Provides access to a large (but sparsely allocated) 3d voxel field.

// TODO: subdivide only so far, and then allocate Float32Array blocks.


field = {}


field.NodeState = {
    UNIFORM: 0,  // All voxels have the same value: node.value.
    SUBDIVIDED: 1,  // Node has children. Descend into them to get values.
    LEAF: 2  // This is a leaf node. Look at node.field array.
};


// A FieldNode is a cube of field space.
// If not subdivided, this.value represents the value within the whole cube.
// size and blockSize must be powers of two.
field.FieldNode = function(minX, minY, minZ, size, blockSize) {
  this.minX = minX;
  this.minY = minY;
  this.minZ = minZ;
  this.size = size;
  
  this.midX = this.minX + this.size * 0.5; 
  this.midY = this.minY + this.size * 0.5; 
  this.midZ = this.minZ + this.size * 0.5; 

  this.blockSize = blockSize;
  this.value = 1.0;
  this.state = field.NodeState.UNIFORM;
  this.children = [];
};

field.FieldNode.prototype.whichChild = function(x, y, z) {
  return 1 * (x >= this.midX) |
         2 * (y >= this.midY) |
         4 * (z >= this.midZ);
}

field.FieldNode.prototype.getValue = function(x, y, z) {
  if (this.state === field.NodeState.UNIFORM) {
    return this.value;
  } else if (this.state === field.NodeState.SUBDIVIDED) {
    var child = this.whichChild(x, y, z);
    return this.children[child].getValue(x, y, z);
  } else {
    // state === field.NodeState.LEAF
    // TODO
  }
}

field.FieldNode.prototype.subdivide = function() {
  // No bounds/size checking performed!
  var halfSize = size / 2;
  this.children[0] = new field.FieldNode(this.minX, this.minY, this.minZ, halfSize);
  this.children[1] = new field.FieldNode(this.minX + halfSize, this.minY, this.minZ, halfSize);
  this.children[2] = new field.FieldNode(this.minX, this.minY + halfSize, this.minZ, halfSize);
  this.children[3] = new field.FieldNode(this.minX + halfSize, this.minY + halfSize, this.minZ, halfSize);
  this.children[4] = new field.FieldNode(this.minX, this.minY, this.minZ, halfSize);
  this.children[5] = new field.FieldNode(this.minX + halfSize, this.minY, this.minZ + halfSize, halfSize);
  this.children[6] = new field.FieldNode(this.minX, this.minY + halfSize, this.minZ + halfSize, halfSize);
  this.children[7] = new field.FieldNode(this.minX + halfSize, this.minY + halfSize, this.minZ + halfSize, halfSize);
  this.state = field.NodeState.SUBDIVIDED;
}

/**
 * This function allows the caller to perform actions across regions of voxel space.
 * The tree will be subdivided down to block level for the region specified, and the
 * function XX called for each block.
 * 
 * @param func = function(minX, minY, minZ, blockSize, fieldArray)
 */
field.FieldNode.prototype.walkTree = function(minX, minY, minZ, maxX, maxY, maxZ, func) {
}

/*
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
*/

