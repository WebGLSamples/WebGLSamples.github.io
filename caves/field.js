
// Provides access to a large scale 3d voxel field

field = {}


field.FieldNode = function(minX, maxX, minY, maxY, minZ, maxZ) {
  this.minX = minX;
  this.maxX = maxX;
  this.minY = minY;
  this.maxY = maxY;
  this.minZ = minZ;
  this.maxZ = maxZ;
  
  this.midX = (this.minX + this.maxX) * 0.5; 
  this.midY = (this.minY + this.maxY) * 0.5; 
  this.midZ = (this.minZ + this.maxZ) * 0.5; 

  this.value = 1.0;
  this.subdivided = false;
  this.children = [];
};

field.FieldNode.prototype.getValue(x, y) = function() {
  if (this.subdivided) {
    var child =
      1 * (x >= this.midX) |
      2 * (y >= this.midY) |
      4 * (z >= this.midZ);
    return this.children[child].getValue(x, y);
  } else {
    return this.value;
  }
}


field.SparseField = function() {
  
  // SparseField is a sparse voxel octree. It only subdivides non-uniform
  // regions. It has dimensions [-maxDim, maxDim-1] in each axis.
  this.maxDim = 1 << 16;

  this.rootNode = new FieldNode(-maxDim, maxDim, -maxDim, maxDim, -maxDim, maxDim);
};

