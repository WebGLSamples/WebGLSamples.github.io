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


function setRandTimer(func)
{
    return setInterval(func + "()", randTimer());
}
 
function randTimer() 
{
    return (Math.random()*4000) + 1000;
}

function getRandColor()
{
	var r = Math.random();
	var g = Math.random();
	var b =Math.random();
	
	return new vec4(r, g, b, 1.0);
}
var lastTex = 0;
function getNextTexture(layer)
{   
    if(layer != undefined)
        texTable = g_texMan.getTextureSetNamesByLayerAndPart(layer, getActivePartName());
    else
        texTable = g_texMan.getTextureSetNames();
    
    var index = (lastTex++)%texTable.length;
    
    return texTable[index];
}
var lastShader = 0
function getNextShader()
{
    shaderTable = g_shaderMan.getShaderNames();
    
    var index = (lastShader++)%shaderTable.length;
    
    return shaderTable[index];
}


function unProject( winx, winy, winz, modelMatrix, projMatrix, viewport)
{
    var finalMatrix = new CanvasMatrix4(modelMatrix);
    
    var inVal 	= [0,0,0,0];

    finalMatrix.multRight(projMatrix);
    
    if(!finalMatrix.invert())
    	return  null;

    inVal[0]=winx;
    inVal[1]=winy;
    inVal[2]=winz;
    inVal[3]=1.0;

    /* Map x and y from window coordinates */
    inVal[0] = (inVal[0] - viewport[0]) / viewport[2];
    inVal[1] = (inVal[1] - viewport[1]) / viewport[3];

    /* Map to range -1 to 1 */
    inVal[0] = inVal[0] * 2 - 1;
    inVal[1] = inVal[1] * 2 - 1;
    inVal[2] = inVal[2] * 2 - 1;

    var v4Out = finalMatrix.vectorMultLeft(new vec4(inVal[0], inVal[1], inVal[2], inVal[3]));
    
    if (v4Out.w == 0.0) return null;
    v4Out.x /= v4Out.w;
    v4Out.y /= v4Out.w;
    v4Out.z /= v4Out.w;
    
    return new vec3(v4Out.x, v4Out.y, v4Out.z);
}

function AABB2LineSegment(box, startPoint, endPoint )
{
	c = addVec3(box.min, box.max);
	c.scale(0.5);
	e = subVec3(box.max, box.min);
	d = subVec3(endPoint, startPoint);
	m = addVec3(startPoint, endPoint); 
	m = subVec3(m, box.min),
	m = subVec3(m, box.max);

	var adx = Math.abs(d.x);
	if( Math.abs(m.x) > e.x + adx ) return false;
	
	var ady = Math.abs(d.y);
	if( Math.abs(m.y) > e.y + ady ) return false;

	var adz = Math.abs(d.z);
	if( Math.abs(m.z) > e.z + adz ) return false;

	adx += 1.192092896e-07;
	ady += 1.192092896e-07;
	adz += 1.192092896e-07;

	if( Math.abs(m.y * d.z - m.z * d.y) > e.y * adz + e.z * ady ) return false;
	if( Math.abs(m.z * d.x - m.x * d.z) > e.x * adz + e.z * adx ) return false;
	if( Math.abs(m.x * d.y - m.y * d.x) > e.x * ady + e.y * adx ) return false;

	debug = 0;
	debug++;
	return true;
}

gLineBuffer = null;
function updateDrawLine(begin, end)
{
	if(g_lineShader)
	{
		if(gLineBuffer)
			gl.deleteBuffer(gLineBuffer);
		
		verts = [begin.x, begin.y, begin.z,
		         end.x, end.y, end.z	];
		gLineBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, gLineBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new WebGLFloatArray(verts), gl.STATIC_DRAW);
		
	}
}

function drawLine(mvp)
{
	if(g_lineShader && g_u_mvp && gLineBuffer)
	{
		gl.useProgram(g_lineShader);
		
		gl.uniformMatrix4fv(g_u_mvp, false, mvp.getAsWebGLFloatArray());
		
		gl.bindBuffer(gl.ARRAY_BUFFER, gLineBuffer);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);
		gl.drawArrays(gl.LINES, 0, 2);
		
		gl.useProgram(null);
	}
}

function hitTest(mesh, near, far)
{
	// holds distance to the nearst BV
	var dist = null;
	var BV = null;
	
	for(var index = 0; index < mesh.BVL.length; index++)
	{
		if(AABB2LineSegment(mesh.BVL[index], near, far))
		{
			var center = addVec3(mesh.BVL[index].min, mesh.BVL[index].max);
			center.scale(0.5);
			var newDist = dotVec3(g_cam.world.zAxisCopy(), center);
			if(newDist < dist || dist == null)
			{
				dist = newDist;
				BV = mesh.BVL[index];
			}
		}
	}
	return BV;
}


function drawBVLColor(BV, r, g, b, a)
{
	renderProcLines(BV.renderObj, r, g, b, a);
}

function drawBVL(BV)
{
	renderProcLines(BV.renderObj, 1,0,0,1);
}


function getScreenAlignedQuad()
{

	//	Screen aligned quad
	var	vertices = new Float32Array([
	                                
	                                -1.0,1.0,0.0,
	                                1.0,1.0,0.0,
									-1.0,-1.0,0.0,
									
									-1.0,-1.0,0.0,
	                                1.0,1.0,0.0,
									1.0,-1.0,0.0
									]);
	
	var	uv 	= new Float32Array([ 0.0,0.0,
								0.0,1.0,
								1.0,1.0,
								1.0,1.0,
								1.0,0.0,
								0.0,0.0]);

	// setup the buffers
	var retval = {};
    retval.vertexObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, retval.vertexObject);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    retval.texCoordObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, retval.texCoordObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
    
    return retval;
}

/*
function throwOnGLError(err, funcName, args) {
    alert(WebGLDebugUtils.glEnumToString(err) + " was caused by call to '" + funcName + "'");
    window.console.log(WebGLDebugUtils.glEnumToString(err) + " was caused by call to '" + funcName + "'");    
};
*/

/*
function contextLostHandler()
{
    window.alert("Context lost");
}

function contextRestoredHandler()
{
    window.alert("Context restored");
}
*/

function initWebGL(canvasName,  clearColor, clearDepth)
{
    var canvas = document.getElementById(canvasName);
/*
    canvas.addEventListener("webglcontextlost", contextLostHandler, false);
    canvas.addEventListener("webglcontextrestored", contextRestoredHandler, false);
*/
    
    var ctxt_;
    try
    {
        ctxt_ = canvas.getContext("experimental-webgl", true, true, false, true, true);

        if (!ctxt_) ctxt_ = canvas.getContext("webgl", true, true, false, true, true);
        if (!ctxt_) ctxt_ = canvas.getContext("webkit-3d", true, true, false, true, true);
        if (!ctxt_) ctxt_ = canvas.getContext("moz-webgl", true, true, false, true, true);
    }
    catch (err){}
    if (!ctxt_)
    {
        jQuery('#webGLerror').removeClass("hide");

	return null;
    }
    
/*
    var gl = WebGLDebugUtils.makeDebugContext(ctxt_, throwOnGLError);
    
    if(!gl)
    {
        alert("could not get a debug webgl context");
        gl = ctxt_;
    }
*/
    var gl = ctxt_;
    
    // Add a console
    gl.console = ("console" in window) ? window.console : { log: function() { } };

    gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
    gl.clearDepth(clearDepth);
    gl.depthFunc(gl.LESS);

    gl.enable(gl.DEPTH_TEST);
    //gl.enable(gl.BLEND);
    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
   

    return gl;
}

//
// loadShader
//
// 'shaderId' is the id of a <script> element containing the shader source string.
// Load this shader and return the WebGLShader object corresponding to it.
//
function loadShader(ctx, shaderType, shaderStr)
{

    // Create the shader object
    var shader = ctx.createShader(shaderType);
    if (shader == null) {
/*
        ctx.console.log("*** Error: unable to create shader '"+shaderType+"'");       
*/
        return null;
    }

    // Load the shader source
    ctx.shaderSource(shader, shaderStr);

    // Compile the shader
    ctx.compileShader(shader);

    // Check the compile status
    var compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
    if (!compiled) {
        // Something went wrong during compilation; get the error
        var error = ctx.getShaderInfoLog(shader);

        ctx.console.log("*** Error compiling shader '"+shaderType+"':"+error);

        ctx.deleteShader(shader);
        return null;
    }

    return shader;
}

function createShader(ctx, vShader, fShader, attribs)
{
	gl.useProgram(null);
	// create our shaders
    var vertexShader = loadShader(ctx, gl.VERTEX_SHADER, vShader);
    var fragmentShader = loadShader(ctx, gl.FRAGMENT_SHADER, fShader);

    if (!vertexShader || !fragmentShader)
        return null;

    // Create the program object
    var program = ctx.createProgram();

    if (! program)
        return null;

    // Attach our two shaders to the program
    ctx.attachShader (program, vertexShader);
    ctx.attachShader (program, fragmentShader);

    // Bind attributes
    for (var i in attribs)
        ctx.bindAttribLocation (program, i, attribs[i]);

    // Link the program
    ctx.linkProgram(program);

    // Check the link status
    var linked = ctx.getProgramParameter( program, ctx.LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        var error = ctx.getProgramInfoLog (program);

        ctx.console.log("Error in program linking:"+error);


        ctx.deleteProgram(program);
        ctx.deleteProgram(fragmentShader);
        ctx.deleteProgram(vertexShader);

        return null;
    }

	return program;
}

/**
* Returns a reference to the selected primSet of active model loaded
* @return the primSet selected or null if nothing is selected
*/
function getSelectedPrimSet() 
{
    if( g_collMan.BV.length ) 
    {
        return [g_collMan.BV[0].primSetRef];
    }
    
    return null;
}

function setSelectedPrimSet(setIndex) 
{
    model = getActiveModel();
	if(model == null)
		return;
    
    g_collMan.BV = [];
    
    if(setIndex < 0)
        return;
    
    if(setIndex > model.mesh.primSets.length)
        setIndex = model.mesh.primSets.length - 1;
    
    g_collMan.BV.push(model.mesh.BVL[setIndex]);
}

function setActiveLayer(layerIndex)
{
    g_activeLayer = layerIndex;
}


function getActiveLayer(layerIndex)
{
    return g_activeLayer;
}

function getActivePartName()
{
    // map sub part to major part
    switch(g_IntentText[g_IntentSelected])
    {
        case "Hair":
            return "Head";
        case "Face":
            return "Head";
        case "Body":
            return "Body";
        case "Legs":
            return "Body";
        default:
            gl.console.log("ERROR: cannot determine the active part");
    }
}

function getTexSlotByPartName()
{
    // map sub part to tex slot
    switch(g_IntentText[g_IntentSelected])
    {
        case "Hair":
            return TEXTYPE.SET2;
        case "Face":
            return TEXTYPE.SET1;
        case "Body":
            return TEXTYPE.SET2;
        case "Legs":
            return TEXTYPE.SET1;
        default:
            gl.console.log("ERROR: cannot determine the active part");
    }
}

function setActivePartName(name)
{
    return g_IntentText[g_IntentSelected];
}

/**
*Array extension to provided item on top
*/
function arrayPeek(array)
{
    return array[array.length - 1];
}

/**
* defines texture types, used to push an pop on appropriate stacks
*/
TEXTYPE = new __texType();

function __texType()
{
    this.DIF1       = 0;
    this.DIF2       = 1;
    this.SPEC1      = 2;
    this.SPEC2      = 3;
    this.NORM1      = 4;
    this.NORM2      = 5;
    this.ENV        = 6;
    this.ENVDIFF    = 7;
    this.SET1       = 8;
    this.SET2       = 9;
    this.MAX        = 10;
}

function getTexStack(texType, primSet)
{
    switch(texType)
    {
        case TEXTYPE.DIF1:
            return primSet.material.tex.diffuse1;
        case TEXTYPE.DIF2:
            return primSet.material.tex.diffuse2;
        case TEXTYPE.SPEC1:
            return primSet.material.tex.spec1;
        case TEXTYPE.SPEC2:
            return primSet.material.tex.spec2;
        case TEXTYPE.NORM1:
            return primSet.material.tex.normal1;
        case TEXTYPE.NORM2:
            return primSet.material.tex.normal2;
        case TEXTYPE.ENV:
            return primSet.material.tex.env;
        case TEXTYPE.ENVDIFF:
            return primSet.material.tex.envDiff;
        case TEXTYPE.SET1:
            return primSet.material.tex.set1;
        case TEXTYPE.SET2:
            return primSet.material.tex.set2;
        default:
            gl.console.log("ERROR: Unknown texture type used when trying to request a texture stack");
            return null;
    }
}

/**
* gets the current working model
* @return the model in use
*/
function getActiveModel() 
{
    if(g_activeModel)
        return g_meshMan.getModelByName(g_activeModel);
        
        return null;
}

/**
* Helper function for pushing/popping textures on a stack
*/
function texturePop(texType, primSetsArray)
{
    if(primSetsArray == undefined || primSetsArray == null)
        return false
        
    for( var primIndex in primSetsArray)
    {
        var texStack = getTexStack(texType, primSetsArray[primIndex]);
        
        if(texStack)
        {
            if(texStack.length > 1)
            {
                texStack.pop();
            }
        }
        else
        {
            return false;
        }
    }
    
    return true;
}

function texturePush(texType, primSetsArray, textureName)
{
    // determine which slot to push too based on part name selected
    texType = getTexSlotByPartName();
    
    if(primSetsArray == undefined || primSetsArray == null)
        return false
        
    var texture = g_texMan.getTextureSetByName(textureName);
    
    if(texture == null)
        return false;
    
    for( var primIndex in primSetsArray)
    {
        var texStack = getTexStack(texType, primSetsArray[primIndex]);
        
        if(texStack)
        {
            texStack.push(texture);
        }
        else
        {
            return false;
        }
    }
    
    return true;
    
}

/**
* Helper function for pushing/popping textures on a stack
*/
function shaderPop(primSetsArray)
{
    if(primSetsArray == undefined || primSetsArray == null)
        return false
        
    for( var primIndex in primSetsArray)
    {
        //return getActiveModel().mesh.popShaderFromPrimSet(primIndex);
        if(primSetsArray[primIndex].material.shader.length > 1)
        {
            var curShader = arrayPeek(primSetsArray[primIndex].material.shader);
            if(curShader.envMap)
                primSetsArray[primIndex].material.tex.env.pop();
            
            primSetsArray[primIndex].material.shader.pop();
            primSetsArray[primIndex].material.renderObj.pop();
        }
    }
    
    return true;
}

function shaderPush(primSetsArray, shaderName, vertexData)
{
    if(primSetsArray == undefined || primSetsArray == null)
        return false
        
    var shader = g_shaderMan.getShaderByName(shaderName);
    
    if(shaderName == null)
        return false;
    
    for( var primIndex in primSetsArray)
    {
       primSetsArray[primIndex].material.renderObj.push(new RenderObject(shader.shaderHandle));
       primSetsArray[primIndex].material.shader.push(shader);
       shader.initRenderProc(primSetsArray[primIndex], vertexData);
    }
    
    return false;
    
}

function createRenderTargetTexture(width,height)
{
   // create framebuffer
    var renderTargetFrameBuffer=gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER,renderTargetFrameBuffer);
    
    // setup parameters (width, hight, filtering)
    renderTargetFrameBuffer.width=width;
    renderTargetFrameBuffer.height=height;
    
    // create the texture
    renderTarget=gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,renderTarget);
    try {
	    // Do it the way the spec requires
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, renderTargetFrameBuffer.width, renderTargetFrameBuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    } catch(exception) {
        // Workaround for what appears to be a Minefield bug.
        var textureStorage=new WebGLUnsignedByteArray(renderTargetFrameBuffer.width*renderTargetFrameBuffer.height*4);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,renderTargetFrameBuffer.width,renderTargetFrameBuffer.height,0,gl.RGBA,gl.UNSIGNED_BYTE,textureStorage);
    }
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    

    // set frame buffer storage and texture
    var renderBuffer=gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER,renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,renderTargetFrameBuffer.width,renderTargetFrameBuffer.height);

    // bind
    error = gl.getError(gl.bindFramebuffer(gl.FRAMEBUFFER,renderTargetFrameBuffer));
    error = gl.getError(gl.bindRenderbuffer(gl.RENDERBUFFER,renderBuffer));
    error=gl.getError(gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,renderTargetFrameBuffer.width,renderTargetFrameBuffer.height));
    gl.bindRenderbuffer(gl.RENDERBUFFER,null);
    
    // bind texture handle and renderBuffer to frame buffer
    error = gl.getError(gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,renderTarget,0));

    error=gl.getError(gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,renderBuffer));

    gl.bindFramebuffer(gl.FRAMEBUFFER,null);

/*
    var status=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    switch(status) {
        case gl.FRAMEBUFFER_COMPLETE:
            break;
        case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            gl.console.log("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
            return null;
        case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            gl.console.log("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
            return null;
        case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            gl.console.log("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
            return null;
        case gl.FRAMEBUFFER_UNSUPPORTED:
            gl.console.log("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
            return null;
        default:
            gl.console.log("Incomplete framebuffer: "+status);
            return null;
    }
*/
    
    // unbind
    gl.bindTexture(gl.TEXTURE_2D,null);
    gl.bindRenderbuffer(gl.RENDERBUFFER,null);
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);

    renderTarget.frameBuffer = renderTargetFrameBuffer;
    return renderTarget;
}

// map ui controlls to collectible intents
var uiToIntentMap = [];
uiToIntentMap["none"]=0;uiToIntentMap["body"] = 1;uiToIntentMap["eye"]=2;uiToIntentMap["hair"]=3;
uiToIntentMap["shirt"]=4;uiToIntentMap["pants"]=5;uiToIntentMap["sticker"]=6;

// return the ui-to-intent name
function mapUIToIntentIndex(name)
{
    name = name.split(' ')[0];
    return uiToIntentMap[name];
}

function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.indexOf('/', 14));


    if (baseURL.indexOf('http://localhost') != -1) {
        // Base Url for localhost
        var url = location.href;  // window.location.href;
        var pathname = location.pathname;  // window.location.pathname;
        var index1 = url.indexOf(pathname);
        var index2 = url.indexOf("/", index1 + 1);
        var baseLocalUrl = url.substr(0, index2);

        return baseLocalUrl + "/";
    }
    else {
        // Root Url for domain name
        return baseURL + "/";
    }

}

function buildModelURL()
{
    return location.href + "?" + "model=" + getActiveModel().name + getActiveModel().mesh.createMaterialURL();
}

function loadMeshFromURL()
{
        setActiveModel(urlParam("model"));
        
    	var primSetData =[];
	    primSetData.push({ name: null, mat:null, set1:null, set2: null, clr:null, shdr:null});
	    primSetData.push({ name: null, mat:null, set1:null, set2: null, clr:null, shdr:null});
	    
        // parse the URL
        for(var setIndex=0;setIndex<primSetData.length;setIndex++)
        {
            primSetData[setIndex].name = urlParam(setIndex + "name");
            //primSetData[setIndex].mat = urlParam(setIndex + "mat");
            primSetData[setIndex].set1 = urlParam(setIndex + "set1");
            primSetData[setIndex].set2 = urlParam(setIndex + "set2");
            primSetData[setIndex].clr = urlParam(setIndex + "clr");
            primSetData[setIndex].shdr = urlParam(setIndex + "shdr");
        }
        
        var mesh = getActiveModel().mesh;
        
        
        //var bodyParts = [ ["Body", "Legs"], ["Hair", "Face"] ];
        var bodyParts = [ ["Hair", "Face"], ["Hair", "Face"] ];
        
        for(var primSetIndex=0;primSetIndex < mesh.primSets.length;primSetIndex++)
        {
            var texSet1 = new TextureSet(); texSet2 = new TextureSet();
            var setArr = [texSet1, texSet2];
        
            var set1Arr =  primSetData[primSetIndex].set1.split("+");
            var set2Arr =  primSetData[primSetIndex].set2.split("+");
            var setData = [set1Arr, set2Arr];
            
            // save intent
            //var intentSave = g_IntentSelected;
            for(var setIndex=0;setIndex < 2;setIndex++)
            {
                setArr[setIndex].name = setData[setIndex][0];                             // set name
                setArr[setIndex].diff = g_texMan.getTextureByName(setData[setIndex][1]);                             // set diff
                setArr[setIndex].spec = g_texMan.getTextureByName(setData[setIndex][2]);                             // set spec
                setArr[setIndex].norm = g_texMan.getTextureByName(setData[setIndex][3]);                             // set norm
                setArr[setIndex].layer = parseInt(setData[setIndex][4]);                  // set norm
                setArr[setIndex].partName    = setData[setIndex][5];                    // part name
                
             }  
              
            //g_texMan.loadTextureSet("URLLoad" + setIndex, setArr[setIndex].diff, setArr[setIndex].spec, setArr[setIndex].norm, setArr[setIndex].layer, setArr[setIndex].partName);

            mesh.primSets[primSetIndex].material.tex.set1.push(setArr[0]);
            mesh.primSets[primSetIndex].material.tex.set2.push(setArr[1]);
            
            var colorArr = primSetData[primSetIndex].clr.split("+");
            var clr1Arr = colorArr[0].split(",");
            var clr2Arr = colorArr[1].split(",");
            var clr3Arr = colorArr[2].split(",");
            
            var color1 = new vec4(parseFloat(clr1Arr[0])/10.0, parseFloat(clr1Arr[1])/10.0, parseFloat(clr1Arr[2])/10.0,  parseFloat(clr1Arr[3])/10.0);
            var color2 = new vec4(parseFloat(clr2Arr[0])/10.0, parseFloat(clr2Arr[1])/10.0, parseFloat(clr2Arr[2])/10.0,  parseFloat(clr2Arr[3])/10.0);
            var color3 = new vec4(parseFloat(clr3Arr[0])/10.0, parseFloat(clr3Arr[1])/10.0, parseFloat(clr3Arr[2])/10.0,  parseFloat(clr3Arr[3])/10.0);
            
            mesh.primSets[primSetIndex].material.fillColor[0].setvec(color1);
            mesh.primSets[primSetIndex].material.fillColor[1].setvec(color2);
            mesh.primSets[primSetIndex].material.fillColor[2].setvec(color3);
            
            var shader = primSetData[0].shdr;
            
            mesh.pushShaderToModel(shader);
            
            
        }
        
}

function loadStickersFromURL()
{
    var stickerData = urlParam("stickers");
    
    setModelCamera(urlParam("model"));
    
    g_cam.setstickurl(stickerData);
}
