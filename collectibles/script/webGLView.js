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


mainSceneQuad = null;
theSceneRTT = null;
g_depthMap = null;
g_activeModel = null;
g_activeLayer = 0;
g_mainLight = null;
g_defaultView = null;
g_radialBlur = null;
g_shadowProj = null;
g_farZ = 100.0;
g_alphaTex = null;
g_depthShader = null;

g_lightMat = null;
g_initComplete = false;

function preinit() 
{
    g_lightMat = [new vec4(0,0,0,0), new vec4(0,0,0,0), new vec4(0,0,0,0), new vec4(0,0,0,0)];
    
    // Initialize
    gl=initWebGL("canvas",[0,0,0,0],g_farZ);
    
    g_depthShader = g_shaderMan.addShader("depthShader", depthMapVShader, depthMapFShader, [ "vert", "normal", "texcoord"]);
    

/*
    gl.console.log("Max varying vectors = " + gl.getParameter(gl.MAX_VARYING_VECTORS));
    gl.console.log("Max uniform vectors = " + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
    gl.console.log("Max texture units = " + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
*/

//    gl.enable(gl.TEXTURE_2D);
    
    
    // Create some matrices to use later and save their locations in the shaders
    gl.normalMatrix=new CanvasMatrix4();
    gl.mvMatrix=new CanvasMatrix4();
    gl.invMvMatrix = new CanvasMatrix4();
    
    // initial viewport and projection
    gl.viewport(0,0,g_width,g_height);
    gl.perspectiveMatrix=new CanvasMatrix4();
    gl.perspectiveMatrix.perspective(45,g_width/g_height,1.0,g_farZ);
    
    // shadow light
    g_mainLight              = new camera();                        	// camera to represent our light's point of view
    g_mainLight.setLookAt(new vec3(-2,2,15),zeroVec(),upVec());    		// lights position and point of view
    g_mainLight.mvMatrix     = new CanvasMatrix4(g_mainLight.view); 	// hold model view transform
	g_mainLight.mvpMatrix    = new CanvasMatrix4(); 					
	g_mainLight.shadowMatrix = new CanvasMatrix4();						// shadow matrix creates shadow bias
	g_mainLight.shadowMatrix.scale(0.6, 0.6, 0.5);
	g_mainLight.shadowMatrix.translate(0.5, 0.5, 0.5);

    // start time
    startTime=new Date().getTime();

    // setup initialize lookat
    g_cam.setLookAt(new vec3(0,0,10),zeroVec(),upVec());
    g_defaultView = new CanvasMatrix4(g_cam.view);
    
        // load default texture
    g_defaultTex    = g_texMan.loadTexture("whiteTex.png");
    g_alphaTex      = g_texMan.loadTexture("alphaTex.png");
    g_defaultNorm1  = g_texMan.loadTexture("defaultNormMap1.jpg");
    g_defaultNorm2  = g_texMan.loadTexture("defaultNormMap2.jpg");
    
    // reset camera textures 
    g_cam.clearstickers();
    
    // initialize the texture manager
    g_texMan.init();
    
    // initialize the shader
    g_shaderMan.init();
    
    // stand alone shaders
    g_radialBlur = g_shaderMan.addShader("radialBlur", radialBlur_vshader, radialBlur_fshader);    

	// load up mesh data
    var backdrop2 = g_meshMan.loadMesh("backdropProject","content/mesh/backdrop.obj","content/mesh/backdrop.mtl", "shadowProj");
    var backdrop = g_meshMan.loadMesh("backdropReceiver","content/mesh/backdrop.obj","content/mesh/backdrop.mtl", "shadowReceiver");
    g_meshMan.loadMesh("dollbaseMale","content/mesh/CollectableDollBase_Maya.txt","content/mesh/CollectableDollBase_Maya.mtl", "default");
    g_meshMan.loadMesh("dollbaseFemale","content/mesh/CollectableDollBaseF_Maya.txt","content/mesh/CollectableDollBaseF_Maya.mtl", "default");
    
	g_initComplete = true;
	return gl;
}

function init()
{
    g_meshMan.addOnLoadedCallback(postMeshLoadInit);

    /*-----Setup main scene render target------*/
    theSceneRTT     = g_texMan.loadRenderTarget("mainTarget", 1024, 1024);
    mainSceneQuad   = new ScreenQuad(theSceneRTT);
    mainSceneQuad.initialize(renderInitScreenQuad);
    /*----------------------------------------*/
}

function postMeshLoadInit()
{
    /*--------------depth map setup------------*/
    g_depthMap              = new RenderObject(null);                                       // create render object to represent depthMap
    g_depthMap.initialize(renderInitProcDepthMap);                                          // init the depth map - bind uniforms and such                    
    g_depthMap.depthRT      = g_texMan.loadRenderTarget("shadowMapDepthMap", 1024, 1024);   // setup texture to hold depth map
    /*----------------------------------------*/
    
    //debug depth map - render
    //mainSceneQuad   = new ScreenQuad(g_depthMap.depthRT);
    //mainSceneQuad.initialize(renderInitScreenQuad);
    
    addModelToScene("backdropReceiver");
    addModelToScene("backdropProject");
	
	// set to skin intent
	selectModelIntent("Skin");
	
	// check to see if model needs to load
	if(maybeLoadModel())
	{
	    loadModelFromURL();
	}
    
    // switch over to postLoadDraw method
    draw = Draw;
}

function resize(gl)
{
    var canvas=document.getElementById('canvas');
    if(canvas.clientWidth==g_width&&canvas.clientHeight==g_height)
        return;
       
    // update resolution
    g_width = canvas.clientWidth;
    g_height = canvas.clientHeight;

    // Set the viewport and projection matrix for the scene
    gl.viewport(0,0,g_width,g_height);
    gl.perspectiveMatrix=new CanvasMatrix4();
    gl.perspectiveMatrix.perspective(45,g_width/g_height,1.0,g_farZ);
}

// start with pre load draw
var draw = loadingDraw;

function Draw(gl) 
{
    // get elapsed time
    curTime=new Date().getTime();
    g_dt=curTime-startTime;
    g_dt/=1000.0;
    startTime=curTime;

    if(g_dt>0.09)
        g_dt=0.05;

    // Make sure the canvas is sized correctly.
    resize(gl);

    // update camera
    g_cam.mouseLook(g_dt);

    // process data that has finished streaming
    g_meshMan.processMeshData();
    
    /*--------------draw depth map to buffer----------------*/
    if(g_hiQu)
    {
        gl.bindFramebuffer(gl.FRAMEBUFFER, g_depthMap.depthRT.frameBuffer);
        gl.viewport(0, 0, g_depthMap.depthRT.frameBuffer.width, g_depthMap.depthRT.frameBuffer.height);
        gl.clearDepth(g_farZ);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    		
        for(objIndex in g_worldObjects) 
        {
            if(g_worldObjects[objIndex]!=undefined&&g_worldObjects[objIndex].mesh.loaded==true) 
            {
                if(g_worldObjects[objIndex]!=undefined&&g_worldObjects[objIndex].name == "backdropReceiver" ||
                    g_worldObjects[objIndex]!=undefined&&g_worldObjects[objIndex].name == "backdropProject")
                {
                    continue;
                }
                    
                g_mainLight.mvpMatrix.load(g_worldObjects[objIndex].mesh.world);
                gl.invMvMatrix.load(g_cam.world);
                gl.invMvMatrix.invert();

                g_mainLight.mvpMatrix.multLeft(gl.invMvMatrix);
                g_mainLight.mvpMatrix.multLeft(g_cam.view);
                g_mainLight.mvpMatrix.multLeft(gl.perspectiveMatrix);
                g_mainLight.mvpMatrix.multLeft(g_mainLight.shadowMatrix);

                g_mainLight.mvMatrix.load(g_mainLight.view);

                var tempWorld=new CanvasMatrix4(g_cam.view)
                tempWorld.multLeft(g_worldObjects[objIndex].mesh.world);

                tempWorld.m41=0;
                tempWorld.m42=0;
                tempWorld.m43=0;
                
                g_mainLight.mvMatrix.multLeft(tempWorld);

                g_mainLight.mvpMatrix.load(gl.perspectiveMatrix);
                g_mainLight.mvpMatrix.multLeft(g_mainLight.mvMatrix);
                                
                g_worldObjects[objIndex].mesh.renderOverride(renderProcDepthMap,null);
            }
        }
    		
        gl.bindTexture(gl.TEXTURE_2D, g_depthMap.depthRT);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    gl.viewport(0,0,g_width,g_height);
    /*-------------------------------------------------------*/
    
    if(g_hiQu)
    {
        // render to the scene render target
        gl.bindFramebuffer(gl.FRAMEBUFFER, theSceneRTT.frameBuffer);
    }
    
    // Clear the target buffer
    gl.viewport(0, 0, theSceneRTT.frameBuffer.width, theSceneRTT.frameBuffer.height);

    gl.clearDepth(g_farZ);
    //gl.depthFunc(gl.LESS);
    
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    for(objIndex in g_worldObjects) 
    {
        if(g_worldObjects[objIndex]!=undefined&&g_worldObjects[objIndex].mesh.loaded==true) 
        {
            g_worldObjects[objIndex].mesh.render();
        }
    }

    if(g_hiQu)
    {
        gl.bindTexture(gl.TEXTURE_2D, theSceneRTT);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        
        gl.viewport(0,0,g_width,g_height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        // draw thescene
        renderProcScreenQuad(mainSceneQuad);
    }

    gl.flush();

    // Show the framerate
    framerate.snapshot();
    
//    if(gl.isContextLost())
//    {
//        window.alert("Context has been lost");
//    }
}

function loadingDraw(gl) 
{
    // process data that has finished streaming
    g_meshMan.processMeshData();

}


function addModelToScene(modelName) 
{
    g_meshMan.addToScene(modelName);
}


function removeModelFromScene(modelName)
 {
    for(var index in g_worldObjects) 
    {
        if(modelName == g_worldObjects[index].name) 
        {
            g_worldObjects.splice(index,1);
            return true;
        }
    }
    
    return false;
}

function clearScene() 
{
    g_worldObjects=[];
}


function maybeLoadModel()
{
    if(urlParam("0set1"))
        return true;
        
    return false;
}

function getInitComplete()
{
    return g_initComplete;
}