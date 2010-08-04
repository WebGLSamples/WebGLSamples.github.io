// Copyright 2010 Google Inc. All Rights Reserved.

nodeNames = [
  "head",     // 0
  "head L",   // 1
  "ear L",    // 2
  "chin L",   // 3
  "chin",     // 4
  "chin R",   // 5
  "ear R",    // 6
  "head R",   // 7
  "nose",     // 8
  "mouth L",  // 9
  "mouth R",  // 10
  "eye L",    // 11
  "eye R"     // 12
]
 
lines = [
  {s: 0, e: 1},
  {s: 1, e: 2},
  {s: 2, e: 3},
  {s: 3, e: 4},
  {s: 4, e: 5},
  {s: 5, e: 6},
  {s: 6, e: 7},
  {s: 7, e: 0},
  {s: 9, e: 10},
]

// Util functions
function circle(ctx,x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function circlestroke(ctx,x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.stroke();
}

function rect(ctx,x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
}

function line(ctx,x1,y1,x2,y2) {
  ctx.beginPath()
  ctx.moveTo(x1,y1)
  ctx.lineTo(x2,y2)
  ctx.closePath()
  ctx.stroke()
}

function distance(a, b) {
  dx = a.x - b.x
  dy = a.y - b.y
  return Math.sqrt(dx*dx+dy*dy)
}

function formatFace(f) {
  str = "<code>[<br>"
  for (i in f) {
    str += "&nbsp;&nbsp;{x:" + f[i].x.toFixed(3) + ", y:" + f[i].y.toFixed(3) + "},<br>"
  }
  str += "]</code>"
  return str
}

w = 300
h = 380

function MorphEditor(id, json_id) {
  var ctx = $(id)[0].getContext("2d")
  var leftLeft = $(id).offset().left;
  var leftTop = $(id).offset().top;
  var selected = -1
  var dragging = false
  var image = new Image()
  var crop = {}
  var face = null

  function mouseCoord(ev) {
    return {
      x: ev.pageX - leftLeft,
      y: ev.pageY - leftTop
    }
  }

  function draw() {
    if (!image || !face)
      return
    ctx.drawImage(image, crop.x, crop.y, crop.w, crop.h, 0, 0, w, h)
    //ctx.drawImage(image, 0, 0, w, h)

    ctx.fillStyle = "rgba(255, 255, 255, 1.0)"
    ctx.strokeStyle = "rgba(255, 255, 255, 1.0)"
    ctx.lineWidth = 3
    for (l in lines) {
      start = face[lines[l].s]
      end = face[lines[l].e]
      line(ctx, start.x * w, start.y * h, end.x * w, end.y * h)
    }

    ctx.lineWidth = 1.5
    for (p in face) {
      circle(ctx, face[p].x * w, face[p].y * h, selected == p ? 8 : 6)
    }

    ctx.fillStyle = "rgba(0,0,0,1.0)"
    ctx.strokeStyle = "rgba(0,0,0,1.0)"
    for (l in lines) {
      start = face[lines[l].s]
      end = face[lines[l].e]
      line(ctx, start.x * w, start.y * h, end.x * w, end.y * h)
    }
    ctx.font = "bold 12px sans-serif"
    ctx.textBaseline = "top"
    ctx.textAlign = "center"
    for (p in face) {
      ctx.fillStyle = selected == p ? "rgba(36,200,118,1.0)" : "rgba(0,0,0,1.0)"
      var x = face[p].x * w
      var y = face[p].y * h
      circle(ctx, x, y, 5)
      ctx.fillStyle = selected == p ? "rgba(36,200,118,1.0)" : "rgba(255,255,255,1.0)"
      ctx.fillText(nodeNames[p], x + 1, y + 5)
      ctx.fillStyle = "rgba(0,0,0,1.0)"
      ctx.fillText(nodeNames[p], x, y + 4)
    }
  }

  this.draw = draw

  this.setImage = function(new_image, new_crop) {
    image = new_image
    crop = new_crop
    if (crop.x + crop.w > image.width) { crop.w = image.width - crop.x }
    if (crop.y + crop.h > image.height) { crop.h = image.height - crop.y }
    draw()
  }

  this.setFace = function(new_face) {
    face = new_face
  }

  $(id).mousedown(function(ev) {
    pos = mouseCoord(ev)
    pos.x = pos.x / w
    pos.y = pos.y / h
    for (p in face) {
      if (distance(face[p], pos) < 0.03) {
        selected = p
        draw()
        dragging = true
        return
      }
    }
    selected = -1
    dragging = false
    return false  // prevent mouse selection
  });

  $(id).mousemove(function(ev) {
    pos = mouseCoord(ev)
    if (dragging && selected != -1) {
      pos.x /= w
      pos.y /= h
      face[selected].x = pos.x
      face[selected].y = pos.y
    }
    draw()
  });

  $(id).mouseup(function(ev) {
    dragging = false
    draw()
    // Uncomment to grab code for edited face
    // $(json_id).html(formatFace(face))
  });
}

function Slider(id, notify) {
  var ctx = $(id)[0].getContext("2d")
  var w = $(id).width()
  var h = $(id).height()
  var dragging = false
  var morphPos = 0.5
  var draggable = true

  function draw() {
    var thumb_size = 20
    var x = morphPos * (w - thumb_size) + thumb_size / 2
    ctx.fillStyle = "#FFFFFF"
    rect(ctx, 0, 0, w, h)

    ctx.strokeStyle = "rgba(0,0,0,1.0)"
    ctx.lineWidth = 2
    line(ctx, thumb_size/2, h/2, w-thumb_size/2, h/2)

    ctx.fillStyle = draggable ? "rgba(0,255,0,1.0)" : "rgba(150,150,150,1.0)"
    circle(ctx, x, h/2, thumb_size / 2 - 2)
    circlestroke(ctx, x, h/2, thumb_size / 2 - 2)
  }

  function setPos(pos) {
    morphPos = pos
    notify.sliderValue(morphPos)
    draw()
  }
  function setDraggable(d) {
    draggable = d
    if (!draggable) {
      dragging = false
    }
    draw()
  }
  this.draw = draw
  this.setPos = setPos
  this.setDraggable = setDraggable

  $(id).mousedown(function(ev) {
    if (!draggable) return false;
    var leftLeft = $(id).offset().left;
    dragging = true
    morphPos = (ev.pageX - leftLeft) * 1.0 / w
    if (notify != null) {
      notify.sliderValue(morphPos)
    }
    draw()
    return false  // prevent mouse selection
  })
  $(id).mousemove(function(ev) {
    if (!draggable) return;
    if (dragging) {
      var leftLeft = $(id).offset().left;
      morphPos = (ev.pageX - leftLeft) * 1.0 / w
      if (morphPos < 0) morphPos = 0
      if (morphPos > 1) morphPos = 1
      if (notify != null) {
        notify.sliderValue(morphPos)
      }
      draw()
    }
  })
  $(id).mouseup(function(ev) {
    dragging = false
    draw()
  })

  draw()
}

