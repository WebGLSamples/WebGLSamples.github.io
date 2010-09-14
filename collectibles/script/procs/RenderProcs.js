//
//Copyright (c) 2010 Human Engines Inc. All rights reserved.
//
//Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are
//met:
//
//   * Redistributions of source code must retain the above copyright
//notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above
//copyright notice, this list of conditions and the following disclaimer
//in the documentation and/or other materials provided with the
//distribution.
//
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
//A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
//OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
//THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
//OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

/**
 *  supported uniform types
 */
function __UNIFORMTYPE()
{
	this.INT	        = 0x3F0;
	this.FLOAT  		= 0x3E8;
	this.FLOAT2 		= 0x3E9;
	this.FLOAT3 		= 0x3EA;
	this.FLOAT4 		= 0x3EB;
	this.MATRIX3 		= 0x3EC;
	this.MATRIX4		= 0x3ED;
	this.TEXTURE2D		= 0x3EE;
	this.TEXTURECUBE	= 0x3EF;
}
UNIFORMTYPE = new __UNIFORMTYPE();

/**
 * RenderObject - contains references to all the data need to render, including vertex buffers, uniform handles, and matrices
 * @param shaderHandle
 */
function RenderObject(shaderHandle)
{
	this.shader         = shaderHandle;
	this.world 	 	    = null;
	this.bindings 	    = new ShaderData();
	this.initRenderProc = null;
	this.renderProc     = null;
	this.postRenderProc = null;
}

/**
 * Adds a uniform to the render object to bound during render
 * @param name - name of the uniform
 * @param value - reference to value that will get bound (will be referenced from now on, don't delete the ref)
 * @param type	- type of uniform, use UNIFORMTYPE
 */
RenderObject.prototype.addUniform = function(name, value, type)
{
	var  uniform = gl.getUniformLocation(this.shader, name);
	if(uniform)
	{
		uniform.debugName = name;
		this.bindings.uniforms.push( new UniformPair(uniform, value, type));
	}
/*
	else
	{
		gl.console.log("ERROR: uniform - " + name + " not found!");
	}
*/
};

/**
* Adds a uniform to the render object to bound during render
* @param name - name of the uniform
* @param value - reference to value that will get bound (will be referenced from now on, don't delete the ref)
* @param type	- type of uniform, use UNIFORMTYPE
*/
RenderObject.prototype.addUniformArray = function(name, value, type, size)
{
	var  uniform = gl.getUniformLocation(this.shader, name);
	if (uniform)
	{
        for (var index=0; index<size; index)
        {
		    uniform.debugName = name+index;
		    this.bindings.uniforms.push( new UniformPair(uniform, value[index], type));
		    uniform+=value[index].length;
		    value++;
	    }
    }
/*
	else
	{
		gl.console.log("ERROR: uniform - " + name + " not found!");
	}*/
};
/**
 * Add texture to uniform
 * @param name - handle to the texture
 * @param unit - texture slot to use
 * @param type - UNIFORMTYPE.TEXTURE2D or TEXTURE2D.TEXTURECUBE
 */
RenderObject.prototype.addTexture = function(name, unit, type)
{
	var  uniform = gl.getUniformLocation(this.shader, name);
	if(uniform)
	{
		this.bindings.textures.push( new TexUniform(uniform, unit, type));
	}
/*
	else
	{
		gl.console.log("ERROR: texture uniform - " + name + " not found!");
	}
*/
};

/**
 * Adds a vertex buffer to the render object
 * @param buffer		- buffer to use
 * @param glBufferType	- type of buffer i.e. gl.ARRAY_BUFFER
 * @param attribSize	- if using attrib the size of an element (3 for vec3)
 * @param attribIndex	- the index slot the attrib goes in
 * @param glAttribType	- type of the attrib i.e. gl.FLOAT
 */
RenderObject.prototype.addBuffers = function(buffer, glBufferType, attribSize, attribIndex, glAttribType)
{
	//gl.useProgram(this.shader);
	if( attribSize == undefined || attribIndex == undefined || glAttribType == undefined ||
		attribSize == null 		|| attribIndex == null		|| glAttribType == null	)
	{
		this.bindings.buffers.push( new BufferAttrib(buffer, glBufferType, null, null, null));
	}
	else
	{
		this.bindings.buffers.push( new BufferAttrib(buffer, glBufferType, attribSize, attribIndex, glAttribType));
	}
	//gl.useProgram(null);
};

/**
 * bind the matrices, vertices and floats to shader uniforms
 */
RenderObject.prototype.bindUniforms = function()
{
	for(var uniIndex = 0; uniIndex < this.bindings.uniforms.length; uniIndex++)
	{
		var bind = this.bindings.uniforms[uniIndex];
		switch(bind.type)
		{
		    case UNIFORMTYPE.INT:
				gl.uniform1i(bind.uniform, bind.value);
				break;
			case UNIFORMTYPE.FLOAT:
				gl.uniform1f(bind.uniform, bind.value);
				break;
			case UNIFORMTYPE.FLOAT2:	
				gl.uniform2fv(bind.uniform, bind.value.getAsWebGLFloatArray());
				break;
			case UNIFORMTYPE.FLOAT3:	
				gl.uniform3fv(bind.uniform, bind.value.getAsWebGLFloatArray());
				break;
			case UNIFORMTYPE.FLOAT4:	
				gl.uniform4fv(bind.uniform, bind.value.getAsWebGLFloatArray());
				break;
			case UNIFORMTYPE.MATRIX3:	
				gl.uniformMatrix3fv(bind.uniform, false, bind.value.getAsWebGLFloatArray());
				break;
			case UNIFORMTYPE.MATRIX4:	
				gl.uniformMatrix4fv(bind.uniform, false, bind.value.getAsWebGLFloatArray());
				break;
			default:
//			    gl.console.log("RenderObject: trying to bind unknown texture type");
			    break;
		}
	}
};

/**
 * binds the texture uniform to texture slots
 */
RenderObject.prototype.bindTextures = function()
{
	for(var uniIndex = 0; uniIndex < this.bindings.textures.length; uniIndex++)
	{
		var bind = this.bindings.textures[uniIndex];
		var error = 0;
		switch(bind.type)
		{
			case UNIFORMTYPE.TEXTURE2D:
				gl.activeTexture(gl.TEXTURE0 + bind.unit);
                gl.uniform1i(bind.uniform, bind.unit);
				break;
			case UNIFORMTYPE.TEXTURECUBE:
				gl.activeTexture(gl.TEXTURE0 + bind.unit);
				gl.uniform1i(bind.uniform, bind.unit);
				break;
			default:
//				gl.console.log("RenderObject: trying to bind unknown texture type");
			    break;
		}
	}
};
/**
 * Binds all buffers and enables any vertexAttribs
 */
RenderObject.prototype.bindBuffers = function() {
    for (var bufIndex = 0; bufIndex < this.bindings.buffers.length; bufIndex++) 
    {
        var bind = this.bindings.buffers[bufIndex];
        gl.bindBuffer(bind.glBufferType, bind.buffer);

        if (bind.glAttribType != null) {
            // enable the attribute and point buffer to it
            gl.enableVertexAttribArray(bind.attribIndex);

            gl.vertexAttribPointer(bind.attribIndex, bind.attribSize, bind.glAttribType, false, 0, 0);
        }
    }
};

RenderObject.prototype.unBindBuffers=function() 
{
    for(var bufIndex=0;bufIndex<this.bindings.buffers.length;bufIndex++) 
    {
        var bind=this.bindings.buffers[bufIndex];
        
        if(bind.glAttribType!=null) 
        {
            // enable the attribute and point buffer to it
            gl.disableVertexAttribArray(bind.attribIndex);
        }

        gl.bindBuffer(bind.glBufferType, null);


    }
};

RenderObject.prototype.initialize = function(initRenderProc)
{
	initRenderProc(this);
};

RenderObject.prototype.clear = function()
{
	this.world 	 = new CanvasMatrix4();
	this.bindings = new ShaderData();
};


/***
 * Shader data proto
 */
function ShaderData()
{
	this.uniforms 		= [];
	this.textures 		= [];
	this.buffers 		= [];
}

/***
 * Structure to contain reference data for binding to during render
 */
function UniformPair(uniform, value, type)
{
	this.uniform = uniform;
	this.value = value;
	this.type = type;
}

function TexUniform(uniform, unit, type)
{
	this.uniform = uniform;
	this.unit = unit;
	this.type = type;
}

function BufferAttrib(buffer, glBufferType, attribSize, attribIndex, glAttribType)
{
	// buffer data
	this.buffer 		= buffer;
	this.glBufferType	= glBufferType;
	
	// attribute data (can be null)
	this.attribSize 	= attribSize;
	this.glAttribType 	= glAttribType;
	this.attribIndex 	= attribIndex;
}



/*-------------------------------------------------------------RENDER PROC HANDLES----------------------------------------------------------------------*/
renderProcDefault       = __renderProcDefault;
postRenderProcDefault   = __postRenderProcDefault;
renderProcLines         = __renderProcLines;
renderProcScreenQuad    = __renderProcScreenQuad;
renderProcDepthMap      = __renderProcDepthMap;
renderProcShadowReceiver= __renderProcShadowReceiver;
renderProcShadowProjection = __renderProcShadowProjection;

/*----------------------------------------------------------------RENDER PROCS--------------------------------------------------------------------------*/
function __setActiveTexture(id, texture) 
{
    gl.activeTexture(id);
    gl.bindTexture(gl.TEXTURE_2D, texture);
}

function __renderProcDefault(primSet)
{   
    //gl.disable(gl.DEPTH_TEST);
    //gl.disable(gl.CULL_FACE);
    gl.mvMatrix.load(g_cam.view);
    gl.mvMatrix.multRight(primSet.parentMesh.world);
    gl.normalMatrix.load(gl.mvMatrix);
    gl.normalMatrix.invert();
    gl.normalMatrix.transpose();

    gl.invMvMatrix.load(gl.mvMatrix);
    gl.invMvMatrix.invert();

    // update shadow light MV matrix
    gl.useProgram(arrayPeek(primSet.material.shader).shaderHandle);
    // Bind the texture

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(primSet.material.tex.set1).diff );
    
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(primSet.material.tex.set2).diff );
    
     gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(primSet.material.tex.set1).spec );
    
     gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(primSet.material.tex.set2).spec );
    
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(primSet.material.tex.env) );

    gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D, arrayPeek(primSet.material.tex.envDiff) );
    
    // stickers
    __setActiveTexture(gl.TEXTURE7, g_cam.stickerTexture[0]);
    __setActiveTexture(gl.TEXTURE8, g_cam.stickerTexture[1]);
    __setActiveTexture(gl.TEXTURE9, g_cam.stickerTexture[2]);
    __setActiveTexture(gl.TEXTURE10, g_cam.stickerTexture[3]);
    __setActiveTexture(gl.TEXTURE11, g_cam.stickerTexture[4]);
    __setActiveTexture(gl.TEXTURE12, g_cam.stickerTexture[5]);
    __setActiveTexture(gl.TEXTURE13, g_cam.stickerTexture[6]);
    __setActiveTexture(gl.TEXTURE14, g_cam.stickerTexture[7]);

    // copy current cams matrix
    for (var i = 0; i < 8; i++) 
    {
        primSet.parentMesh.stickers[i].load(g_cam.stickers[i]);
        primSet.parentMesh.stickersPos[i].setvec(g_cam.stickersPos[i]);
    }
    __setActiveTexture(gl.TEXTURE15, arrayPeek(primSet.material.tex.set1).norm);
    __setActiveTexture(gl.TEXTURE6, arrayPeek(primSet.material.tex.set2).norm);

    //bind buffers and attribs
    arrayPeek(primSet.material.renderObj).bindBuffers();

    // bind shader uniforms
    arrayPeek(primSet.material.renderObj).bindTextures();
    
    arrayPeek(primSet.material.renderObj).bindUniforms();
    
    gl.drawElements(gl.TRIANGLES, primSet.size, gl.UNSIGNED_SHORT, primSet.indexInBuffer*2);
}

function __renderProcLines(renderObj, r, g, b, a)
{
	gl.useProgram(renderObj.shader);
	
	renderObj.lineColor.x = r;
	renderObj.lineColor.y = g;
	renderObj.lineColor.z = b;
	renderObj.lineColor.w = a;
	
	//bind buffers and attribs
	renderObj.bindBuffers();
	
	// bind shader uniforms
	renderObj.bindUniforms();

	// draw the AABBs
	gl.drawArrays(gl.LINES, 0, renderObj.numPoints/3);
	
	gl.useProgram(null);
}

function __renderProcScreenQuad(quad)
{
    gl.disable(gl.DEPTH_TEST);
	gl.useProgram(quad.shader);

	//bind buffers and attribs
	quad.renderObj.bindBuffers();
	
	// bind shader uniforms
	quad.renderObj.bindTextures();
	quad.renderObj.bindUniforms();
	
	// render
	var offset = 0;
	// Bind the texture
	gl.bindTexture(gl.TEXTURE_2D, quad.texture);
	gl.drawArrays(gl.TRIANGLES, 0, 6);

	gl.useProgram(null);
	gl.enable(gl.DEPTH_TEST);
}

// post render proc
function __postRenderProcDefault(primSet) {
    gl.useProgram(arrayPeek(primSet.material.renderObj).shader);

    //bind buffers and attribs
    //arrayPeek(primSet.material.renderObj).unBindBuffers();

    gl.useProgram(null);
}

function __renderProcDepthMap(primSet)
{
    gl.useProgram(g_depthMap.shader)

     //bind buffers
    arrayPeek(primSet.material.renderObj).bindBuffers();

    g_depthMap.bindUniforms();
    
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.POLYGON_OFFSET_FILL);
	gl.cullFace(gl.FRONT);

    gl.drawElements(gl.TRIANGLES, primSet.size, gl.UNSIGNED_SHORT, primSet.indexInBuffer*2);

	gl.cullFace(gl.BACK);
	gl.disable(gl.POLYGON_OFFSET_FILL);
	gl.disable(gl.CULL_FACE);
	//gl.disable(gl.DEPTH_TEST);
    
	gl.useProgram(null);
}

function __renderProcShadowReceiver(primSet)
{

    // ---- initial pass, render shadow to target
	gl.bindFramebuffer(gl.FRAMEBUFFER, primSet.shadowTarget.frameBuffer);
    gl.viewport(0, 0, primSet.shadowTarget.frameBuffer.width, primSet.shadowTarget.frameBuffer.height);
    gl.clearDepth(g_farZ);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
     gl.useProgram(arrayPeek(primSet.material.shader).shaderHandle);
    
    // Bind the texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, g_depthMap.depthRT);
    
    // bind shader uniforms
    arrayPeek(primSet.material.renderObj).bindTextures();

    //gl.disable(gl.DEPTH_TEST);
	//gl.enable(gl.CULL_FACE);
	
	
    gl.mvMatrix.load(g_defaultView);
    gl.mvMatrix.multRight(primSet.parentMesh.world);
    
    arrayPeek(primSet.material.renderObj).bindUniforms();
    error = gl.getError();

    //bind buffers and attribs
    arrayPeek(primSet.material.renderObj).bindBuffers();
	gl.drawElements(gl.TRIANGLES, primSet.size, gl.UNSIGNED_SHORT, primSet.indexInBuffer*2);
    
    //gl.enable(gl.DEPTH_TEST);
	//gl.disable(gl.CULL_FACE);
	
	gl.useProgram(null);
    
    gl.bindTexture(gl.TEXTURE_2D, primSet.shadowTarget);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, theSceneRTT.frameBuffer);
    gl.viewport(0, 0, theSceneRTT.frameBuffer.width, theSceneRTT.frameBuffer.height);
    
    //----------change buffers render blur pass to quad
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, primSet.shadowTargetFinal.frameBuffer);
    gl.viewport(0, 0, primSet.shadowTargetFinal.frameBuffer.width, primSet.shadowTargetFinal.frameBuffer.height);
    gl.clearDepth(g_farZ);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    primSet.screenQuad.setTexture(primSet.shadowTarget);
    primSet.screenQuad.render(renderProcScreenQuad);

	gl.bindTexture(gl.TEXTURE_2D, primSet.shadowTargetFinal);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, theSceneRTT.frameBuffer);
    gl.viewport(0, 0, theSceneRTT.frameBuffer.width, theSceneRTT.frameBuffer.height);
    
    //----------change buffers render blur pass to quad again
    
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, primSet.shadowTarget.frameBuffer);
    gl.viewport(0, 0, primSet.shadowTarget.frameBuffer.width, primSet.shadowTarget.frameBuffer.height);
    gl.clearDepth(g_farZ);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
    primSet.screenQuad.setTexture(primSet.shadowTargetFinal);
    primSet.screenQuad.render(renderProcScreenQuad);

	gl.bindTexture(gl.TEXTURE_2D, primSet.shadowTarget);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, theSceneRTT.frameBuffer);
    gl.viewport(0, 0, theSceneRTT.frameBuffer.width, theSceneRTT.frameBuffer.height);    

}

function __renderProcShadowProjection(primSet)
{
    gl.useProgram(arrayPeek(primSet.material.shader).shaderHandle);
    // Bind the texture

    var error = gl.getError();
    gl.activeTexture(gl.TEXTURE0);
    error=gl.getError(gl.bindTexture(gl.TEXTURE_2D, g_depthMap.shadowTarget));
    gl.bindTexture(gl.TEXTURE_2D, g_meshMan.getModelByName("backdropReceiver").mesh.shadowToProject);
    
    // bind shader uniforms
    arrayPeek(primSet.material.renderObj).bindTextures();

    gl.mvMatrix.load(g_defaultView);
    gl.mvMatrix.multRight(primSet.parentMesh.world);
    
    arrayPeek(primSet.material.renderObj).bindUniforms();

    //bind buffers and attribs
    arrayPeek(primSet.material.renderObj).bindBuffers();

    gl.drawElements(gl.TRIANGLES, primSet.size, gl.UNSIGNED_SHORT, primSet.indexInBuffer*2);
	
	gl.useProgram(null);
    
}
