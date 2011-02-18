
// An auto-growing array/buffer.


Growable = function(opt_type, opt_startsize) {
  opt_type = opt_type || 'Float32Array';
  opt_startsize = opt_startsize || 10000;
  var type = window[opt_type];
  this.buffer = new type(opt_startsize);
  this.type = opt_type;
  this.usedSize = 0;
};

Growable.prototype.clear = function() {
  this.usedSize = 0;
};

Growable.prototype.checkSize = function(newSize) {
  if (newSize > this.buffer.length) {
    var growSize = this.buffer.length * 2;
    while (newSize > growSize) {
      growSize *= 2;
    }
    var newBuffer = new window[this.type](growSize);
    // Is there a faster way to copy the array?
    for (var i = 0; i < this.usedSize; ++i) {
      newBuffer[i] = this.buffer[i];
    }
    this.buffer = newBuffer;
  }
};

Growable.prototype.push = function(val) {
  var newSize = this.usedSize + 1;
  this.checkSize(newSize);
  this.buffer[this.usedSize] = val;
  this.usedSize = newSize;
};

Growable.prototype.pushArray = function(arr) {
  var newSize = this.usedSize + arr.length;
  this.checkSize(newSize);
  for (var i = 0; i < arr.length; ++i) {
    this.buffer[this.usedSize + i] = arr[i];
  }
  this.usedSize = newSize;
};

Growable.prototype.getLength = function() {
  return this.usedSize;
}

Growable.prototype.getArray = function() {
  return new window[this.type](this.buffer.subarray(0, this.usedSize));
};

// Returns a fake AttribBuffer.
Growable.prototype.getAttribBuffer = function(numComponents) {
  return {
    buffer: new window[this.type](this.buffer.subarray(0, this.usedSize)),
    numComponents: numComponents,
    numElements: this.usedSize / numComponents,
    type: this.type
  };
};
