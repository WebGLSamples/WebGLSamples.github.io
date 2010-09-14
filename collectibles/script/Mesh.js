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

function Material()	
{
	this.name	= null;
	this.amb 	= new vec4(0,0,0,1);
	this.diff	= new vec4(0,0,0,1);
	this.spec 	= new vec4(0,0,0,1);
	this.pwr 	= 64;
	this.tex 	= { diffuse1    : [g_alphaTex],   diffuse2    : [g_alphaTex],
	                spec1       : [g_alphaTex],   spec2       : [g_alphaTex],
	                normal1     : [g_alphaTex],   normal2     : [g_alphaTex], 
	                env         : [g_alphaTex],   envDiff     : [g_alphaTex],
	                set1        : [new TextureSet()], set2      : [new TextureSet()]};
//	this.fillColor1 = new vec4(1.0, 1.0, 1.0, 1.0);
//	this.fillColor2 = new vec4(1.0, 1.0, 1.0, 1.0);
    this.fillColor  = [new vec4(1.0, 1.0, 1.0, 1.0), new vec4(1.0, 1.0, 1.0, 1.0), new vec4(1.0, 1.0, 1.0, 1.0)];
	this.shader     = [];
	this.renderObj  = [];
	this.pickable       = true;
};


//function TextureSet()
//{
//    this.name="unnamed";
//    this.diff = g_alphaTex;
//    this.spec = g_alphaTex;
//    this.norm = g_alphaTex;
//    this.layer = 0;
//    this.partName=null;
//}

//function Shader(name, shaderHandle, renderProc, initRenderProc, envMap)
//{
//    this.name           = name;
//    this.shaderHandle   = shaderHandle;
//    this.initRenderProc = initRenderProc;
//    this.renderProc     = renderProc;
//    this.postRenderProc = postRenderProcDefault;
//    this.envMap         = envMap;
//    this.envDiff        = envMap;
//}


/***
 * vertex data prototype
 */
function MeshData()
{
	this.numIndices = 0;
	this.primSets = null;
	this.vertexObject = null;
	this.texCoordObject = null;
	this.normalObject = null;
	this.indexObject = null;
}

/***
 * Class : Mesh
 * @param meshDataSrc - the data to pass contains vertex data and material data. Example:<br>
 * <code> var meshDataSrc = {  vertexData:"content/mesh/model.obj", mtrl:"content/mesh/mtrl"};</code>
 */
function Mesh(meshDataSrc)
{
	this.glCtx			= gl;				// handle webGL context
	this.meshDataSrc	= meshDataSrc;		// URLs of the data to load
	this.vertexData		= null;				// the model data
	this.mtrlData		= null;
	this.loaded         = false;
	this.readyToProcess = false;
	this.BVL			= null;
	//this.renderObj		= null;
	this.world          = new CanvasMatrix4();
	this.primSets       = [];
	this.defaultShaderName = "default";

    // instanced data 
	this.stickers = new Array();
	this.stickersPos = new Array();
	
	for (var i = 0; i < 9; i++) 
	{
	    this.stickers[i] = new CanvasMatrix4();
	    this.stickersPos[i] = new vec3(0.0, 0.0, 0.0);
	}
}


/***
 * called to load and parse the mesh data
 */
Mesh.prototype.loadMesh = function()
{
	loadObjVertexMtrl(this, this.initialize);
};

Mesh.prototype.preInit = function() 
{
    if(this.vertexData && this.mtrlData)
	{
	    this.readyToProcess = true;
	}
};


/***
 * initialize the mesh
 */
Mesh.prototype.initialize = function()
{
	processMatVertData(this);
	
	// setup parent reference
	for(var index in this.primSets)
	{
	    this.primSets[index].parentMesh = this;
	}

    // pushing a shader initializes the primSets
	this.pushShaderToModel(this.defaultShaderName);

	// init render calls initProcs for each material
	//this.initRender();
	
	this.generateMaterialBVL();
	
	// debug - enables drawing of bounding volumes
	//this.initBVLDraw();
	
/*
	this.glCtx.console.log("Model loaded");
*/
	
	this.loaded = true;
};


/***
 * Creates a bounding volume list based on the mesh material
 */
Mesh.prototype.generateMaterialBVL = function()
{
    if (this.primSets != undefined )
	{
		this.BVL = [];
		
		for(var index = 0; index < this.primSets.length; index++)
		{
		    if(this.primSets[index].material.pickable == false)
		        continue;
		    
			// a new min,max structure
		    this.BVL.push({ min: null, max: null , primSetRef : this.primSets[index]});
			
			//find min and max for this prim set

			var minX = null; var minY = null; var minZ = null;
			var maxX = null; var maxY = null; var maxZ = null;
			var curX = 0; var curY = 0; var curZ = 0;
			
			//debug
			//var offset = this.primSets[index].indexInBuffer;
			
			for(var vert = 0; vert < this.primSets[index].points.length; vert+=3)
			{
				curX = this.primSets[index].points[vert];
				curY = this.primSets[index].points[vert + 1];
				curZ = this.primSets[index].points[vert + 2];

				
/*
				if(curX == undefined || curY == undefined || curZ == undefined)
				{
					gl.console.log("CurXYZ is undefined");
				}
*/
				
				// check for min value
				if(curX < minX || minX == null)
				{
					minX = curX;
					//gl.console.log("minX: " + minX + " found on vert: " + (offset + vert));
				}
				if(curY < minY || minY == null)
				{
					minY = curY;
					//gl.console.log("minY: " + minY + " found on vert: " + (offset + vert +1) );
				}
				if(curZ < minZ || minZ == null)
				{
					minZ = curZ;
					//gl.console.log("minZ: " + minZ + " found on vert: " + (offset + vert +2) );
				}
				
				//check for max value
				if(curX > maxX || maxX == null)
				{
					maxX = curX;
					//gl.console.log("maxX: " + maxX + " found on vert: " + (offset + vert));
				}
				if(curY > maxY || maxY == null)
				{
					maxY = curY;
					//gl.console.log("maxY: " + maxY + " found on vert: " + (offset + vert + 1));
				}
				if(curZ > maxZ || maxZ == null)
				{
					maxZ = curZ;
					//gl.console.log("maxZ: " + maxZ + " found on vert: " + (offset + vert +2));
				}
			}
			
			// let go of point data
			this.primSets[index].points = null;
			
/*
			gl.console.log("---FINAL---minX: " + minX + "minY: " + minY + "minZ: " + minZ);
			gl.console.log("---FINAL---maxX: " + maxX + "maxY: " + maxY + "maxZ: " + maxZ);
*/

			this.BVL[index].min = new vec3(minX, minY, minZ);
			this.BVL[index].max = new vec3(maxX, maxY, maxZ);
		}
	}
/*
	else
	{
		this.glCtx.console.log("***Mesh: Attempting to create BVL from undefined primSet");
	}
*/
};

// debug
g_lineVShader = null; g_lineFShader = null;
g_lineShader = null;
g_u_mvp = null;

Mesh.prototype.initBVLDraw = function()
{
	//create render object for BVL
	// create and bind shader to use
	if(g_lineVShader == null && g_lineFShader == null)
		var shaderBVLines = g_lineShader = createShader(gl, linesVShader, linesFShader, ["point"]);
	
	// create arrays
	var pointList = [];
	for(var index = 0; index < this.BVL.length; index++)
	{
		
		var min = this.BVL[index].min;
		var max = this.BVL[index].max;
		
		
		this.BVL[index].renderObj = new RenderObject(shaderBVLines);
		this.BVL[index].renderObj.world = this.world;
		this.BVL[index].renderObj.lineColor = new vec4(1,0,0,1);
		this.BVL[index].renderObj.addUniform("u_lineColor",this.BVL[index].renderObj.lineColor,UNIFORMTYPE.FLOAT4);
		this.BVL[index].renderObj.addUniform("u_worldMatrix",this.world,UNIFORMTYPE.MATRIX4);
		this.BVL[index].renderObj.addUniform("u_viewMatrix",g_cam.view,UNIFORMTYPE.MATRIX4);
		this.BVL[index].renderObj.addUniform("u_projMatrix",gl.perspectiveMatrix,UNIFORMTYPE.MATRIX4);
								
		var cube = 			[ 
		           			  	//Minimum face
		           			  	min.x, min.y, min.z,
		                        max.x, min.y, min.z,
		                        
								max.x, min.y, min.z,
								max.x, max.y, min.z,
							
								max.x, max.y, min.z,
								min.x, max.y, min.z,
							
								min.x, max.y, min.z,
								min.x, min.y, min.z,
							
								// Maximum face
								min.x, min.y, max.z,
								max.x, min.y, max.z,
							
								max.x, min.y, max.z,
								max.x, max.y, max.z,
							
								max.x, max.y, max.z,
								min.x, max.y, max.z,
							
								min.x, max.y, max.z,
								min.x, min.y, max.z,
							
								// Edges
								min.x, min.y, min.z,
								min.x, min.y, max.z,
							
								max.x, min.y, min.z,
								max.x, min.y, max.z,
							
								max.x, max.y, min.z,
								max.x, max.y, max.z,
							
								min.x, max.y, min.z,
								min.x, max.y, max.z  ];
		
		this.BVL[index].renderObj.numPoints = cube.length;
		// create a new object to hold the array
		this.BVL[index].buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.BVL[index].buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube), gl.STATIC_DRAW);
		
		// add ref to render object
		this.BVL[index].renderObj.addBuffers(this.BVL[index].buffer, gl.ARRAY_BUFFER,3,0, gl.FLOAT);

	}
	
};

//Mesh.prototype.initRenderOverride = function(initRenderProc) 
//{
//    initRenderProc(this);
//};

//Mesh.prototype.initRender = function() 
//{
//    for(var index = 0; index < this.primSets.length; index++)
//	{
//	    primSets[index].material.renderObj = new RenderObject();
//	    primSets[index].material.shader[primSets[index].material.shader.length - 1].initRenderProc(primSets[index].material.renderObj);
//	}
//};

Mesh.prototype.pushShaderToPrimSet = function(shaderName, primSetIndex) 
{
    shaderPush([this.primSets[primSetIndex]], shaderName, this.vertexData);
};

Mesh.prototype.popShaderFromPrimSet = function(primSetIndex) 
{
    return shaderPop([this.primSets[primSetIndex]]);
};

Mesh.prototype.pushShaderToModel = function(shaderName) 
{
    shaderPush(this.primSets, shaderName, this.vertexData);
};

Mesh.prototype.popShaderFromModel = function() 
{
     return shaderPop(this.primSets);
};

Mesh.prototype.render=function() 
{
    if(this.loaded) 
    {
        for(var setIndex=0;setIndex<this.primSets.length;setIndex++)
        {
            var material = this.primSets[setIndex].material;
            material.shader[material.shader.length - 1].renderProc(this.primSets[setIndex]);
            material.shader[material.shader.length - 1].postRenderProc(this.primSets[setIndex]);
        }
    }
};


Mesh.prototype.renderOverride = function(renderProc, postRenderProc)
{
	if(this.loaded)
	{
	    for(var setIndex = 0; setIndex < this.primSets.length; setIndex++)
	    {
	        renderProc(this.primSets[setIndex]);
	        if(postRenderProc)
	            postRenderProc(this.primSets[setIndex]);
	    }
	}
};

Mesh.prototype.flattenMaterial = function()
{
    for(var setIndex=0;setIndex<this.primSets.length;setIndex++)
    {
       var material = this.primSets[setIndex].material;
       material.shader.splice(0, material.shader.length - 1);
       material.renderObj.splice(0, material.renderObj.length - 1);
       
       for(var tex in material.tex)
       {
            material.tex.splice(0, tex.length - 1);
       }
    }
};

Mesh.prototype.createMaterialURL = function()
{
    this.flattenMaterial();
    
    var modelURL = "";
    
    for(var setIndex=0;setIndex<this.primSets.length;setIndex++)
    {
        var m = this.primSets[setIndex].material;
        modelURL    +="&" + setIndex  + "name="+m.name
                    //+ "&" + setIndex  + "mat="+m.amb.toURLString()+"+"+m.diff.toURLString()+"+"+m.spec.toURLString()                                                                                          // material data
                    + "&" + setIndex  + "set1="+m.tex.set1[0].name+"+"+m.tex.set1[0].diff.name+"+"+m.tex.set1[0].spec.name+"+"+m.tex.set1[0].norm.name+"+"+m.tex.set1[0].layer+"+"+m.tex.set1[0].partName     // tex set1
                    + "&" + setIndex  + "set2="+m.tex.set2[0].name+"+"+m.tex.set2[0].diff.name+"+"+m.tex.set2[0].spec.name+"+"+m.tex.set2[0].norm.name+"+"+m.tex.set2[0].layer+"+"+m.tex.set2[0].partName     // tex set2
                    + "&" + setIndex  + "clr="+m.fillColor[0].toURLString()+"+"+m.fillColor[1].toURLString()+"+"+m.fillColor[2].toURLString()
                    + "&" + setIndex  + "shdr="+m.shader[0].name;
                    
    }
    
    return modelURL;
};


Mesh.prototype.flattenMaterial = function()
{
    for(var setIndex=0;setIndex<this.primSets.length;setIndex++)
    {
       var material = this.primSets[setIndex].material;
       material.shader.splice(0, material.shader.length - 1);
       material.renderObj.splice(0, material.renderObj.length - 1);
       material.tex.diffuse1.splice(0,  material.tex.diffuse1.length - 1);
       material.tex.diffuse2.splice(0,  material.tex.diffuse2.length - 1);
       material.tex.spec1.splice(0,  material.tex.spec1.length - 1);
       material.tex.spec2.splice(0,  material.tex.spec2.length - 1);
       material.tex.normal1.splice(0,  material.tex.normal1.length - 1);
       material.tex.normal2.splice(0,  material.tex.normal2.length - 1);
       material.tex.env.splice(0,  material.tex.env.length - 1);
       material.tex.envDiff.splice(0,  material.tex.envDiff.length - 1);
       material.tex.set1.splice(0,  material.tex.set1.length - 1);
       material.tex.set2.splice(0,  material.tex.set2.length - 1);
    }
};