
// Provides access to a large (but sparsely allocated) 3d voxel field.


field = {}


field.NodeState = {
    UNIFORM: 0,  // All voxels have the same value: node.value.
    SUBDIVIDED: 1,  // Node has children. Descend into them to get values.
    ALLOCATED: 2  // This node has a field buffer.
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

  this.value = 1.0;
  this.state = field.NodeState.UNIFORM;
  this.children = [];
  this.field = null;

  // Values shared for the whole tree. If there are more, they should be moved to
  // a shared object.
  this.blockSize = blockSize;
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

// Subdivide, or allocate a field buffer.
field.FieldNode.prototype.subdivide = function() {
  if (this.size > this.blockSize) {
    var halfSize = size / 2;
    this.children[0] = new field.FieldNode(this.minX, this.minY, this.minZ, halfSize, blockSize);
    this.children[1] = new field.FieldNode(this.minX + halfSize, this.minY, this.minZ, halfSize, blockSize);
    this.children[2] = new field.FieldNode(this.minX, this.minY + halfSize, this.minZ, halfSize, blockSize);
    this.children[3] = new field.FieldNode(this.minX + halfSize, this.minY + halfSize, this.minZ, halfSize, blockSize);
    this.children[4] = new field.FieldNode(this.minX, this.minY, this.minZ, halfSize, blockSize);
    this.children[5] = new field.FieldNode(this.minX + halfSize, this.minY, this.minZ + halfSize, halfSize, blockSize);
    this.children[6] = new field.FieldNode(this.minX, this.minY + halfSize, this.minZ + halfSize, halfSize, blockSize);
    this.children[7] = new field.FieldNode(this.minX + halfSize, this.minY + halfSize, this.minZ + halfSize, halfSize, blockSize);
    this.state = field.NodeState.SUBDIVIDED;
  } else {
    // We're already block sized. Allocate a field.
    this.state = field.NodeState.ALLOCATED;
  }
}

/**
 * This function allows the caller to perform actions across regions of voxel space.
 * The tree will be subdivided down to block level for the region specified, and the
 * function XX called for each block.
 * 
 * Precondition: specified bounds must be entirely contained in this node.
 * 
 * Callback functions are called on leaf nodes: fieldFunc if subdivided, otherwise uniformFunc.
 * Operations on the field must be deterministic!
 *
 * @param uniformFunc = function(minX, minY, minZ, size, value)
 *   Called for nodes which have a uniform value.
 *   Parameters correspond to the whole node, not just the intersecting region.
 *   Return true if the node should be subdivided and its children walked.
 * @param fieldFunc = function(minX, minY, minZ, size, fieldArray)
 *   Called for leaf nodes which have a fieldArray.
 *   Parameters correspond to the whole node, not just the intersecting region.
 *   fieldArray has dimensions (size+1)^3.
 */
field.FieldNode.prototype.walkTree = function(minX, minY, minZ, size, uniformFunc, leafFunc) {
  if (this.state === field.NodeState.UNIFORM) {
    if (uniformFunc(minX, minY, minZ, size, this.value)) {
      this.subdivide();
    }
  }
  // At this point we may have subdivided, so no 'else'.
  if (this.state === field.NodeState.SUBDIVIDED)
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

