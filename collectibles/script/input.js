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

function inputKB(e)
{
	var key;
	if(window.event)
	{
		key = window.event.keyCode;
	}
	else
	{
		key = e.keyCode;
	}

/*
	// move the camera position
	if(key == 65) // LEFT
	{
		g_cam.translateOnX(g_camMoveSpeed*g_dt);
	}
	if(key == 87) // FWRD
	{
		g_cam.translateOnZ(g_camMoveSpeed*g_dt);
	}
	if(key == 68) // RIGHT
	{
		g_cam.translateOnX(-g_camMoveSpeed*g_dt);
	}
	if(key == 83) // BACK
	{
		g_cam.translateOnZ(-g_camMoveSpeed*g_dt);
	}
*/
	
/*
	if(key == 90) // Zoom in/out
	{
	    g_cam.zoom();
	}

	if (key == 32) 
	{
	    g_cam.nextSticker();
	}
	
	
	// DEBUG
	if(key == 81)
	{
		//test vector project and unProject
	}
	
*/
/*
	// E - paint random color
	if(key == 69)
	{
	    colorFillLayer(getRandColor());
	}
*/
	
//	// F - paint random color
//	if(key == 70)
//	{
//	    colorFillLayer2(getRandColor());
//	}
	
/*
	// Assign a texture
	// R            = Assign texture to selected model part
	// ALT + R      = Pop texture from selected piece
	// SHIFT + R    = push texture to every model part
	// ALT+SHIFT+R  = pop current texture from every model part
	if(key==82) 
	{
	    if(e.shiftKey)
	    {
	        if(e.altKey)
            {
                popTextureFromModel();
            }
            else
            {
                pushTextureToModel(getNextTexture());
            }
	    }else
	    {
	        if(e.altKey)
	        {
	            popTextureFromModelPart();
	        }
	        else
	        {
	            pushTextureToModelPart(getNextTexture(getActiveLayer()));
	        }
	    }
	}

	// Assign a shader
	// T            = Assign shader to model
	// ALT + T      = Pop shader from model
	if(key==84) 
	{
        if(e.altKey)
        {
            popShaderFromModel();
        }
        else
        {
            pushShaderToModel(getNextShader());
        }
	}
	
	// 1/2 - switch models
	if(!e.shiftKey && !e.altKey)
	{
	    if(key==49)
	    {
	        setActiveModel("dollbaseMale");
	    }
	    if(key==50)
	    {
	        setActiveModel("dollbaseFemale");
	    }	
	}
	
	// Intents
	if(e.shiftKey && key >= 48 && key < 55)
	{
        g_IntentSelected = key - 48;
        
        // selected component
        selectModelIntent(g_IntentText[g_IntentSelected]);
	}
	
*/
/*
	// P = export
	if(key==80) 
	{
        var url = createModelURL();
        gl.console.log("MODEL URL: " + url);
        
        // parse the URL
        var params = urlParam(url);
	}
	// G = import
	if(key==71) 
	{

	}
*/
}

var xMouse = 0;
var yMouse = 0;

function mouseDown(ev)
{
	vp = gl.getParameter(gl.VIEWPORT);
	var near = unProject(ev.pageX, vp[3] - ev.pageY, 0.0, g_cam.view, gl.perspectiveMatrix, vp);
	var far = unProject(ev.pageX,  vp[3] - ev.pageY, 1.0, g_cam.view, gl.perspectiveMatrix, vp);

	// clear collision list
/*
	g_collMan.BV = [];
	
	// test meshes
	for(var index in g_worldObjects)
	{
		// if the mesh has a Bounding Volume List test the volumes
		if(g_worldObjects[index].mesh.BVL)
		{
			hitBV = hitTest(g_worldObjects[index].mesh, near, far);
			if(hitBV)
				g_collMan.BV.push(hitBV);
		}
	}
*/
	
	xMouse=window.event.clientX;
	yMouse=window.event.clientY;
	
	return false;
}

function mouseUp(ev)
{

	if ((Math.abs(window.event.clientX - xMouse) < 5) && (Math.abs(window.event.clientY - yMouse) < 5))	
	{
	    g_cam.nextSticker();
	}
	return false;
}

stickerCursor = new vec2(0,0);
cursor = new vec2(0,0);
lastMousePos = new vec2(0,0);
firstTime = true;

function updateCursorPos(e, bMouseDown)
{
	e = e || window.event;

    cursor.x = e.x;
    cursor.y = e.y;
        
    if(firstTime)
    {
    	firstTime = false;
    	lastMousePos.x = cursor.x;
    	lastMousePos.y = cursor.y;
    }
    else 
    {
        var de = document.documentElement;
        var b = document.body;
        cursor.x = e.clientX + (de.scrollLeft || b.scrollLeft) - de.clientLeft;
        cursor.y = e.clientY + (de.scrollTop || b.scrollTop) - de.clientTop;

        if(!bMouseDown)
        {
            lastMousePos.x = cursor.x;
            lastMousePos.y = cursor.y;
        }
    }

    var elem = document.getElementById("canvas");
    var w = elem.width / 2;
    var h = elem.height / 2;
    
    stickerCursor.x = ((cursor.x - elem.parentNode.offsetLeft) - w) / w;
    stickerCursor.y = ((cursor.y - elem.parentNode.offsetTop) - h) / h;

        
//    stickerCursor.x = (e.layerX - w) / w;
  //  stickerCursor.y = (e.layerY - h) / h;

    //gl.console.log("spammy : " + w + "," + h + " | " + cursor.x + ", " + cursor.y + " | " + stickerCursor.x + ", " + stickerCursor.y);

}

var stickerZoom = 1;
var zoomDirty = false;

function wheel(event) 
{
    var delta = 0;
    if (!event) /* For IE. */
        event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
        delta = event.wheelDelta / 120;
        /** In Opera 9, delta differs in sign as compared to IE.
        */
        if (window.opera)
            delta = -delta;
    } else if (event.detail) { /** Mozilla case. */
        /** In Mozilla, sign of delta is different than in IE.
        * Also, delta is multiple of 3.
        */
        delta = -event.detail / 3;
    }
    /** If delta is nonzero, handle it.
    * Basically, delta is now positive if wheel was scrolled up,
    * and negative, if wheel was scrolled down.
    */
    if (delta < 0) 
    {
        stickerZoom-=0.5;
        if (stickerZoom < 1.0)stickerZoom = 1.0;
        else zoomDirty = true;
    }
    else if (delta > 0) 
    {
        stickerZoom+=0.5;
        zoomDirty = true;
        if (stickerZoom > 4.0)stickerZoom = 4.0;
        else zoomDirty = true;
    }
        
    /** Prevent default actions caused by mouse wheel.
    * That might be ugly, but we handle scrolls somehow
    * anyway, so don't bother here..
    */
    if (event.preventDefault)
        event.preventDefault();
    event.returnValue = false;
}

function getCursorPos() 
{
    return cursor;
}

function getStickerPos()
{
    return stickerCursor;
}

function getStickerZoom() 
{
    return stickerZoom;
}
