/*
Copyright (c) 2010 Human Engines Inc. All rights reserved.
 
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:
 
   * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.

   * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// simple camera

function camera()
{
	// the view mat
	this.view = new CanvasMatrix4();
	
	// world view
	this.world =  new CanvasMatrix4();
	this.oldWorld = new CanvasMatrix4();
	this.orbitMatrix = new CanvasMatrix4();
	
	// maintained cam position/look (for memory reference)
	this.position   = new vec3(0,0,0);
	this.look       = new vec3(0,0,0);
	
	this.sticker    = new CanvasMatrix4();
	this.zoomed = false;
	this.orbiting = false;
	this.orbitingVec = new vec2(0.0, 0.0);
	this.inertialVec = new vec2(0.0, 0.0);

	this.stickers = new Array();
	this.stickersPos = new Array();
	this.stickersLookAt = new Array();
	this.stickerTexture = new Array();
	this.partZoom = 1.0;
	
	
	this.clearstickers();
}

camera.prototype.reset = function()
{
    this.view=new CanvasMatrix4();

    // world view
    this.world=new CanvasMatrix4();
    this.oldWorld=new CanvasMatrix4();
    this.orbitMatrix=new CanvasMatrix4();

    // maintained cam position/look (for memory reference)
    this.position=new vec3(0,0,0);
    this.look=new vec3(0,0,0);
    
    this.zoomed=false;
    this.orbiting=false;

    this.setLookAt(new vec3(0,0,10),zeroVec(),upVec());
}

camera.prototype.clearstickers = function()
{
	for (var i = 0; i < 9; i++) 
	{
	    this.stickers[i] = new CanvasMatrix4();
	    this.stickersPos[i] = new vec3(0.0, 0.0, 0.0);
	    this.stickersLookAt[i] = new vec3(0.0, 0.0, 0.0);
	    this.stickerTexture[i] = g_alphaTex;
	}
	
	this.currentSticker = 0;
}

camera.prototype.copy = function(cam) {
    this.view.load(cam.view);
    this.world.load(cam.world);
    this.oldWorld.load(cam.oldWorld);
    this.orbitMatrix.load(cam.orbitMatrix);

    // maintained cam position/look (for memory reference)
    this.position.setvec(cam.position);
    this.look.setvec(cam.look);

    this.sticker.load(cam.sticker);
    this.zoomed = cam.zoomed;

    //copy array
    for (var i = 0; i < 9; i++) {
        this.stickers[i].load(cam.stickers[i]);
        this.stickers[i].curScale = 1.0;
        this.stickersPos[i].setvec(cam.stickersPos[i]);
        this.stickersLookAt[i].setvec(cam.stickersPos[i]);
        this.stickerTexture[i] = cam.stickerTexture[i];
    }

    this.currentSticker = cam.currentSticker;
    this.orbiting = false;
    this.partZoom = cam.partZoom;

    this.updateStickerCounter();
}



camera.prototype.updateView = function()
{
	// update position reference
	this.position.x = this.world.m41;
	this.position.y = this.world.m42;
	this.position.z = this.world.m43;
	
	this.look.x = this.world.m31;
	this.look.y = this.world.m32;
	this.look.z = this.world.m33;
	
	// create ortho-normal inverse
	tempM = new CanvasMatrix4(this.world);
				
	tempM.m31 *= -1;
	tempM.m32 *= -1; 
	tempM.m33 *= -1; 
	
	tempM.m11 *= -1;
	tempM.m12 *= -1; 
	tempM.m13 *= -1; 
	
	this.view.load(tempM);
	
	this.view.m41 = 0;
	this.view.m42 = 0;
	this.view.m43 = 0;
	
	this.view.transpose();
	
	this.view.m41 = -dotVec3(new vec3(tempM.m11, tempM.m12, tempM.m13), new vec3(tempM.m41, tempM.m42,tempM.m43));
	this.view.m42 = -dotVec3(new vec3(tempM.m21, tempM.m22, tempM.m23), new vec3(tempM.m41, tempM.m42,tempM.m43));
	this.view.m43 = -dotVec3(new vec3(tempM.m31, tempM.m32, tempM.m33), new vec3(tempM.m41, tempM.m42,tempM.m43));
};


camera.prototype.setLookAt = function(posVec, targetVec, upVec)
{
	var w_axis = new vec3(posVec.x, posVec.y, posVec.z);
	
	var z_axis = subVec3(targetVec, w_axis);
	z_axis.normalize();
	
	var x_axis = crossVec3(upVec, z_axis);
	x_axis.normalize();

	var y_axis = crossVec3(z_axis, x_axis);
	y_axis.normalize();
	
	// use vectors to create world matrix
	this.world.set(x_axis,y_axis, z_axis, w_axis);
	
	this.updateView();
};

camera.prototype.pitch = function(radians)
{
	var xRot = createRotationX(radians);
	this.world.multLeft(xRot);
	this.updateView();
};

camera.prototype.yaw = function(radians)
{
	var yRot = createRotationY(radians);
	this.world.multLeft(yRot);
	this.updateView();
};

camera.prototype.roll = function(radians)
{
	var zRot = createRotationZ(radians);
	this.world.multLeft(zRot);
	this.updateView();
};

camera.prototype.translateOnZ = function(dist)
{
	var dir = scaleVec3(this.world.zAxisCopy(), dist); 
	this.world.translate(dir.x, dir.y, dir.z);
	this.updateView();
};

camera.prototype.translateOnX = function(dist)
{
	var dir = scaleVec3(this.world.xAxisCopy(), dist); 
	this.world.translate(dir.x, dir.y, dir.z);
	this.updateView();
};

camera.prototype.translateOnY = function(dist)
{
	var dir = scaleVec3(this.world.yAxisCopy(), dist); 
	this.world.translate(dir.x, dir.y, dir.z);
	this.updateView();
};

camera.prototype.zoom = function() {
    // we only zoom in on selection
    if (!this.zoomed && !g_collMan.BV.length)
        return;

    this.zoomed = !this.zoomed;

    if (this.zoomed) {
        boxMin = g_collMan.BV[0].min;
        boxMax = g_collMan.BV[0].max;
        boxCenter = addVec3(boxMin, boxMax);
        boxCenter.scale(0.5);

        bW = Math.abs(boxMax.x - boxMin.x);
        bH = Math.abs(boxMax.y - boxMin.y);
        bD = Math.abs(boxMax.z - boxMin.z);

        radius = bW > bH ? (bW > bD ? bW : bD) : (bH > bD ? bH : bD);

        curPos = this.world.wAxisCopy();

        zoomVec = subVec3(boxCenter, curPos);
        zoomVec.normalize();
        zoomVec.scale(radius * 2.0);

        targetPos = subVec3(boxCenter, zoomVec);

        this.oldWorld.load(this.world);

        this.setLookAt(targetPos, boxCenter, this.world.yAxisCopy());
        
        // portion of scale
        this.partZoom = radius * 2.0 / 10.0;
    }
    else {
        this.world.load(this.oldWorld);
        this.updateView();

        this.partZoom = 1.0;
    }
}

camera.prototype.mouseLook = function(dt) {
    mousePos = getCursorPos();

    mouseDiff = new vec2(0.0, 0.0);

    if (lastMousePos.x == mousePos.x && lastMousePos.y == mousePos.y) {
        if (this.orbiting) {
            this.inertialVec.x = mousePos.x - this.inertialVec.x;
            this.inertialVec.y = mousePos.y - this.inertialVec.y;
        }

        this.orbiting = false;
        this.inertialVec.x *= 0.8;
        this.inertialVec.y *= 0.8;
        mouseDiff.x = this.inertialVec.x;
        mouseDiff.y = this.inertialVec.y;
        this.orbitMatrix.load(this.world);
    }
    else {
        if (!this.orbiting) {
            this.orbiting = true;
            this.orbitingVec.x = mousePos.x;
            this.orbitingVec.y = mousePos.y;
            this.orbitMatrix.load(this.world);
        }
        // mouse inertial direction

        mouseDiff = new vec2(mousePos.x - this.orbitingVec.x, mousePos.y - this.orbitingVec.y);

        this.inertialVec.x = mousePos.x;
        this.inertialVec.y = mousePos.y;
    }

    var width = 512.0;
    var degreesRotatedOverWidth = 180.0
    // read canvas width
    var elem = document.getElementById("canvas");
    if (elem) width = elem.width;

    // rotation in radians.. so need to convert 
    mouseDiff.scale(3.142 / 180.0);
    mouseDiff.scale(degreesRotatedOverWidth / width);       // 180degrees movment across canvas width  (need to use canvas.w)

    mouseDiffDisplay = new vec2(mouseDiff.x * 180.0, mouseDiff.y * 180.0);

    /* for debugging 
    if(mouseDiff.x != 0 || mouseDiff.y != 0)
    document.getElementById("mouse_delta").innerHTML = "mouse delta: [" + mouseDiffDisplay.x + ", " + mouseDiffDisplay.y +"]";
    */
    this.world.load(this.orbitMatrix);
    var camUp = this.world.yAxisCopy();
    var camRight = this.world.xAxisCopy();

    this.world.rotate(mouseDiff.y * 180 / 3.142, camRight.x, camRight.y, camRight.z);
    this.world.rotate(-mouseDiff.x * 180 / 3.142, camUp.x, camUp.y, camUp.z);

    this.world.setXAxis(this.world.xAxisCopy().normalized());
    this.world.setYAxis(this.world.yAxisCopy().normalized());
    this.world.setZAxis(this.world.zAxisCopy().normalized());

    this.updateView();

    // fetch mouse location relative to center
    stickerPos = getStickerPos();

    // zoom
    var zoomy = 1.0 / getStickerZoom() * 2;

    // compute the mouse coordinate and convert movement into screenspace
    var scaleVec = new vec3();
    var mat = new CanvasMatrix4();
    mat.load(this.view);
    mat.multLeft(gl.perspectiveMatrix);
    scaleVec.setvec(mat.vectorMultLeft(new vec4(1.8, 0.0, 0.0, 0.0)));
    var length = scaleVec.length();
    var mouseVec = new vec4(-stickerPos.x * length, -stickerPos.y * length, 0.0, 0.0);
    mouseVec.x += 0.5 / zoomy;
    mouseVec.y -= 0.5 / zoomy;
    var transVec = this.world.vectorMultLeft(mouseVec);
    if (this.partZoom != 1.0) {
        mouseVec.y += (this.world.m42 - this.oldWorld.m42) * this.partZoom;
        mouseVec.x += (this.world.m41 - this.oldWorld.m41) * this.partZoom;
    }


    // set the stickers projection position from the camera's position
    this.stickersPos[this.currentSticker].setvec(this.world.wAxisCopy());

    // set the target look at based on the mouse location
    this.stickersLookAt[this.currentSticker].setvec(transVec);

    // build the stickers projection look matrices
    this.buildstickermatrix();

    // scale the scratch pad
    this.sticker.scale(zoomy);

    // copy the scratch matrix into the current sticker being edited
    this.stickers[this.currentSticker].load(this.sticker);
    // save the current scale
    this.stickers[this.currentSticker].curScale = zoomy;

    // debugging url save/load
    //    this.setstickurl(this.getstickurl());

    /* for debugging	
    document.getElementById("mtx_x").innerHTML = "matrix-x: [" + this.world.m11.toFixed(2) + ", " + this.world.m12.toFixed(2) + ", " + this.world.m13.toFixed(2) + "]";
    document.getElementById("mtx_y").innerHTML = "matrix-y: [" + this.world.m21.toFixed(2) + ", " + this.world.m22.toFixed(2) + ", " + this.world.m23.toFixed(2) + "]";
    document.getElementById("mtx_z").innerHTML = "matrix-z: [" + this.world.m31.toFixed(2) + ", " + this.world.m32.toFixed(2) + ", " + this.world.m33.toFixed(2) + "]";
    document.getElementById("mtx_t").innerHTML = "matrix-t: [" + this.world.m41.toFixed(2) + ", " + this.world.m42.toFixed(2) + ", " + this.world.m43.toFixed(2) + "]";
    */

};

camera.prototype.nextSticker = function() 
{
    if (this.currentSticker < 8 && this.stickerTexture[this.currentSticker]!=g_alphaTex) 
    {
        this.stickerTexture[this.currentSticker+1] = this.stickerTexture[this.currentSticker];
        this.currentSticker++;
        zoomDirty = true;
    }
    
    this.updateStickerCounter(); // TR
}

camera.prototype.updateStickerCounter = function() // TR
{
    var stickerCount;
    if (this.currentSticker == 8)
    {
        stickerCount = "<b>FULL</b>";
    }
    else
    {
        stickerCount = this.currentSticker + "/8";
    }
    jQuery("numSticker#stickerCounter").html(stickerCount);
}

camera.prototype.undosticker = function()  
{
    this.stickerTexture[this.currentSticker] = g_alphaTex;
    if (this.currentSticker>0) this.currentSticker--;
    jQuery("numSticker#stickerCounter").html(this.currentSticker + "/8");
}

camera.prototype.selecttexture = function(v) 
{
    this.stickerTexture[this.currentSticker] = v;
}

camera.prototype.selecttextureindex = function(idx) 
{
    var texName = "StampDecal_";
    if (arr[1] < 10) texName += "0";
    texName += idx + "_DM.png";
    this.selecttexture(g_texMan.getTextureByName(texName));
}

camera.prototype.clearselection = function() 
{
    this.stickerTexture[this.currentSticker] = g_alphaTex;
}

camera.prototype.buildstickermatrix = function() {
    // save view and world matrices
    var tempWorld = new CanvasMatrix4();
    var tempView = new CanvasMatrix4();
    tempWorld.load(this.world);
    tempView.load(this.view);
    var up = this.world.yAxisCopy();

    // look at the target from the position and load into scratch
    this.setLookAt(this.stickersPos[this.currentSticker], this.stickersLookAt[this.currentSticker], up);
    this.sticker.load(this.view);

    // recover world and view
    this.world.load(tempWorld);
    this.view.load(tempView);
}

camera.prototype.setstickurl = function(desc) 
{
    // deliminated string, count, index, pos, scale, look, index, pos, scale, look, etc // TR - added scale
    var se = desc.split(',');

    // reset stickers
    var numStickers = se[0];
    this.currentSticker = 0;
    var sn = 1;

    for (var i = 0; i < numStickers; i++)
    {
        this.selecttexture(g_texMan.getTextureByName(se[sn++]));

        this.stickersPos[this.currentSticker].x = se[sn++] / 100.0;
        this.stickersPos[this.currentSticker].y = se[sn++] / 100.0;
        this.stickersPos[this.currentSticker].z = se[sn++] / 100.0;
        
        var newScale = se[sn++] / 100.0;

        this.stickersLookAt[this.currentSticker].x = se[sn++] / 100.0;
        this.stickersLookAt[this.currentSticker].y = se[sn++] / 100.0;
        this.stickersLookAt[this.currentSticker].z = se[sn++] / 100.0;

        this.buildstickermatrix();
        // scale matrix
        this.sticker.scale(newScale);
        
        // copy built sticker to the array
        this.stickers[this.currentSticker].load(this.sticker);
        // store scale
        this.stickers[this.currentSticker].curScale = newScale;
        

        this.currentSticker++
    }
}


camera.prototype.getstickurl = function() 
{
    var descUrl = new String();
    descUrl += this.currentSticker;    // count of stickers

    for (var i = 0; i < this.currentSticker; i++) 
    {
        descUrl += "," + this.stickerTexture[i].name;

        descUrl += "," + (this.stickersPos[i].x * 100.0).toFixed();
        descUrl += "," + (this.stickersPos[i].y * 100.0).toFixed();
        descUrl += "," + (this.stickersPos[i].z * 100.0).toFixed();
        
        descUrl += "," + (this.stickers[i].curScale * 100.0).toFixed();

        descUrl += "," + (this.stickersLookAt[i].x * 100.0).toFixed();
        descUrl += "," + (this.stickersLookAt[i].y * 100.0).toFixed();
        descUrl += "," + (this.stickersLookAt[i].z * 100.0).toFixed();
    }

    return descUrl
}
