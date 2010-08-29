
// Provides access to a large voxel field.
// Uses a slightly loose octree for sparse allocation.


field = {}


field.NodeState = {
    UNIFORM: 0,  // All voxels inside this node have the same value: node.value.
    SUBDIVIDED: 1,  // Node has children. Descend into them to get values.
    ALLOCATED: 2  // This node has a field buffer.
};


/**
 * A FieldNode is a cube of field space.
 * 
 * If not subdivided, this.value represents the value within the whole cube.
 * size and blockSize must be powers of two.
 * 
 * minX,Y,Z define one corner of cube. size is the length of the cube edges.
 */
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
  this.children = null;
  this.field = null;

  // Values shared for the whole tree. If there are more, they should be moved to
  // a shared object.
  this.blockSize = blockSize;
};

/**
 * Subdivide node, or allocate a field buffer if already small enough.
 */
field.FieldNode.prototype.subdivideOrAllocate = function() {
  if (this.size > this.blockSize) {
    this.state = field.NodeState.SUBDIVIDED;
    var halfSize = size / 2;
    this.children = [];
    this.children[0] = new field.FieldNode(this.minX, this.minY, this.minZ, halfSize, blockSize);
    this.children[1] = new field.FieldNode(this.minX + halfSize, this.minY, this.minZ, halfSize, blockSize);
    this.children[2] = new field.FieldNode(this.minX, this.minY + halfSize, this.minZ, halfSize, blockSize);
    this.children[3] = new field.FieldNode(this.minX + halfSize, this.minY + halfSize, this.minZ, halfSize, blockSize);
    this.children[4] = new field.FieldNode(this.minX, this.minY, this.minZ, halfSize, blockSize);
    this.children[5] = new field.FieldNode(this.minX + halfSize, this.minY, this.minZ + halfSize, halfSize, blockSize);
    this.children[6] = new field.FieldNode(this.minX, this.minY + halfSize, this.minZ + halfSize, halfSize, blockSize);
    this.children[7] = new field.FieldNode(this.minX + halfSize, this.minY + halfSize, this.minZ + halfSize, halfSize, blockSize);
  } else {
    // We're already minimum size. Allocate a field.
    this.state = field.NodeState.ALLOCATED;
    this.field = new Float32Array((this.size+1) * (this.size+1) * (this.size+1));
  }
}

/**
 * This function allows the caller to perform actions across regions of voxel space.
 * The tree will be subdivided down to block level for the region specified, and the
 * function XX called for each block.
 * 
 * Precondition: specified bounds must be entirely contained in this node. (is this really necessary?)
 * 
 * Callback functions are called on leaf nodes: fieldFunc if subdivided, otherwise uniformFunc.
 * Operations on the field must be deterministic! (because of node overlap)
 * 
 * @param uniformFunc = function(minX, minY, minZ, size, value)
 *   Called for nodes which have a uniform value.
 *   Parameters correspond to the whole node, not just the intersecting region.
 *   Return true if the node should be subdivided and its children walked.
 * @param fieldFunc = function(minX, minY, minZ, size, array)
 *   Called for leaf nodes which have a fieldArray.
 *   Parameters correspond to the whole node, not just the intersecting region.
 *   array is a Float32Array(size^3).
 */
field.FieldNode.prototype.walkSubTree = function(minX, maxX, minY, maxY, minZ, maxZ, uniformFunc, fieldFunc) {
  if (this.state === field.NodeState.UNIFORM) {
    if (uniformFunc(this.minX, this.minY, this.minZ, this.size, this.value)) {
      this.subdivideOrAllocate();
    }
  }
  // At this point we may have subdivided or allocated, so no 'else'.
  if (this.state === field.NodeState.SUBDIVIDED) {
    for (var i = 0; i < 8; ++i) {
      var child = this.children[i];
      // Note that this includes 1-voxel region overlaps.
      // This could be optimized a bit...
      if (child.minX <= maxX &&
          child.minX + child.size >= minX &&
          child.minY <= maxY &&
          child.minY + child.size >= minY &&
          child.minZ <= maxZ &&
          child.minZ + child.size >= minZ) {
        child.walkSubTree(minX, maxX, minY, maxY, minZ, maxZ, uniformFunc, fieldFunc);
      }
    }
  } else if (this.state === field.NodeState.ALLOCATED) {
    fieldFunc(this.minX, this.minY, this.minZ, this.size + 1, this.field);
  }
}

/**
 * Simpler version of walkSubTree.
 */
field.FieldNode.prototype.walkTree = function(uniformFunc, fieldFunc) {
  if (this.state === field.NodeState.UNIFORM) {
    if (uniformFunc(this.minX, this.minY, this.minZ, this.size, this.value)) {
      this.subdivideOrAllocate();
    }
  }
  // At this point we may have subdivided or allocated, so no 'else'.
  if (this.state === field.NodeState.SUBDIVIDED) {
    for (var i = 0; i < 8; ++i) {
      var child = this.children[i];
      child.walkTree(uniformFunc, fieldFunc);
    }
  } else if (this.state === field.NodeState.ALLOCATED) {
    fieldFunc(this.minX, this.minY, this.minZ, this.size + 1, this.field);
  }
}
