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

renderInitProcDefault   = __renderInitProcDefault;
renderInitScreenQuad    = __renderInitScreenQuad;
renderInitProcDepthMap  = __renderInitProcDepthMap;
renderInitShadowReceiver= __renderInitShadowReceiver;
renderInitShadowProjection = __renderInitShadowProjection;

function __renderInitProcDefault(primSet, vertexData)
{
        var material = primSet.material;
        
        //push envMap tex
        material.tex.env.push(arrayPeek(material.shader).envMap);
        material.tex.envDiff.push(arrayPeek(material.shader).envDiff);
        
        gl.useProgram(arrayPeek(material.shader).shaderHandle);
        
        arrayPeek(material.renderObj).addTexture("layerMap1", 0, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("layerMap2", 1, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("colorMeMap1", 2, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("colorMeMap2", 3, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("envMap", 4, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("envDiff", 5, UNIFORMTYPE.TEXTURE2D);

        arrayPeek(material.renderObj).addTexture("normalMap1", 15, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("normalMap2", 6, UNIFORMTYPE.TEXTURE2D);

        arrayPeek(material.renderObj).addTexture("stickerMap0", 7, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("stickerMap1", 8, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("stickerMap2", 9, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("stickerMap3", 10, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("stickerMap4", 11, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("stickerMap5", 12, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("stickerMap6", 13, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addTexture("stickerMap7", 14, UNIFORMTYPE.TEXTURE2D);

        arrayPeek(material.renderObj).addUniform("u_normalMatrix", gl.normalMatrix, UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_mvMatrix", gl.mvMatrix, UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_invMvMatrix", gl.invMvMatrix, UNIFORMTYPE.MATRIX4);
        
        arrayPeek(material.renderObj).addUniform("u_stickerMatrix0", primSet.parentMesh.stickers[0], UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_stickerMatrix1", primSet.parentMesh.stickers[1], UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_stickerMatrix2", primSet.parentMesh.stickers[2], UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_stickerMatrix3", primSet.parentMesh.stickers[3], UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_stickerMatrix4", primSet.parentMesh.stickers[4], UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_stickerMatrix5", primSet.parentMesh.stickers[5], UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_stickerMatrix6", primSet.parentMesh.stickers[6], UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_stickerMatrix7", primSet.parentMesh.stickers[7], UNIFORMTYPE.MATRIX4);

        arrayPeek(material.renderObj).addUniform("u_stickerPos0", primSet.parentMesh.stickersPos[0], UNIFORMTYPE.FLOAT3);
        arrayPeek(material.renderObj).addUniform("u_stickerPos1", primSet.parentMesh.stickersPos[1], UNIFORMTYPE.FLOAT3);
        arrayPeek(material.renderObj).addUniform("u_stickerPos2", primSet.parentMesh.stickersPos[2], UNIFORMTYPE.FLOAT3);
        arrayPeek(material.renderObj).addUniform("u_stickerPos3", primSet.parentMesh.stickersPos[3], UNIFORMTYPE.FLOAT3);
        arrayPeek(material.renderObj).addUniform("u_stickerPos4", primSet.parentMesh.stickersPos[4], UNIFORMTYPE.FLOAT3);
        arrayPeek(material.renderObj).addUniform("u_stickerPos5", primSet.parentMesh.stickersPos[5], UNIFORMTYPE.FLOAT3);
        arrayPeek(material.renderObj).addUniform("u_stickerPos6", primSet.parentMesh.stickersPos[6], UNIFORMTYPE.FLOAT3);
        arrayPeek(material.renderObj).addUniform("u_stickerPos7", primSet.parentMesh.stickersPos[7], UNIFORMTYPE.FLOAT3);
        

        arrayPeek(material.renderObj).addUniform("u_projMatrix", gl.perspectiveMatrix, UNIFORMTYPE.MATRIX4);
        
        arrayPeek(material.renderObj).addUniform("u_fillColor1",  material.fillColor[0], UNIFORMTYPE.FLOAT4);
        arrayPeek(material.renderObj).addUniform("u_fillColor2",  material.fillColor[1], UNIFORMTYPE.FLOAT4);
        arrayPeek(material.renderObj).addUniform("u_skinColor",   material.fillColor[2], UNIFORMTYPE.FLOAT4);
        

        // debug---
        vertexData.vertexObject.name   = "vertexObject";
        vertexData.normalObject.name   = "normalObject";
        vertexData.texCoordObject.name = "texCoordObject";
        vertexData.indexObject.name    = "indexObject";
        //----------
        
        arrayPeek(material.renderObj).addBuffers(vertexData.vertexObject,     gl.ARRAY_BUFFER, 3, 0, gl.FLOAT);
        arrayPeek(material.renderObj).addBuffers(vertexData.normalObject,     gl.ARRAY_BUFFER, 3, 1, gl.FLOAT);
        arrayPeek(material.renderObj).addBuffers(vertexData.texCoordObject,   gl.ARRAY_BUFFER, 2, 2, gl.FLOAT);
        arrayPeek(material.renderObj).addBuffers(vertexData.indexObject,      gl.ELEMENT_ARRAY_BUFFER);

       
     //}

     gl.useProgram(null);
//     gl.console.log("Mesh Init done!");

}

function __renderInitScreenQuad(quad, shader)
{
    if(shader == undefined)
    {
	    quad.shader = createShader(gl, screenQuad_vShader, screenQuad_fShader, [ "vert", "texcoord"]);
	}
	else
	{
	    quad.shader = shader;
	}
	
	quad.renderObj = new RenderObject(quad.shader);
	
	quadBuf = getScreenAlignedQuad();
	
	quad.vertBuffer = quadBuf.vertexObject;
	quad.uvBuffer	= quadBuf.texCoordObject;
	
	
	quad.renderObj.addTexture("basemap", 0, UNIFORMTYPE.TEXTURE2D);
	
	quad.renderObj.addUniform("u_inv_viewport_width", 1.0/g_width, UNIFORMTYPE.FLOAT);
	quad.renderObj.addUniform("u_inv_viewport_height", 1.0/g_height, UNIFORMTYPE.FLOAT);
	
	quad.renderObj.addBuffers(quad.vertBuffer, 	gl.ARRAY_BUFFER,  3, 0, gl.FLOAT);
	quad.renderObj.addBuffers(quad.uvBuffer, 	gl.ARRAY_BUFFER,  2, 2, gl.FLOAT);
}

function __renderInitProcDepthMap(renderObj)
{
    renderObj.shader = g_depthShader.shaderHandle;//createShader(gl, depthMapVShader, depthMapFShader, [ "vert", "normal", "texcoord"]);
    
    gl.useProgram(renderObj.shader);

    renderObj.addUniform("u_mvpLightMatrix",  g_mainLight.mvpMatrix, UNIFORMTYPE.MATRIX4);
    //renderObj.addUniform("u_mvpLightMatrixWTF",  g_mainLight.mvpMatrix, UNIFORMTYPE.MATRIX4);
   // var uni = gl.getUniformLocation(renderObj.shader, "u_mvpLightMatrixWTF");
//    renderObj.addUniform("u_WTF1",  g_lightMat[0], UNIFORMTYPE.FLOAT4);
//    renderObj.addUniform("u_WTF2",  g_lightMat[1], UNIFORMTYPE.FLOAT4);
//    renderObj.addUniform("u_WTF3",  g_lightMat[2], UNIFORMTYPE.FLOAT4);
//    renderObj.addUniform("u_WTF4",  g_lightMat[3], UNIFORMTYPE.FLOAT4);
//    
    // since the uniform data references should not change we can just bind one time
    renderObj.bindUniforms();
    
    gl.useProgram(null);
}

function __renderInitShadowReceiver(primSet, vertexData)
{
        // setup passes
        primSet.shadowTarget = g_texMan.loadRenderTarget("shadowTarget", 256, 256);
        primSet.shadowTargetFinal = g_texMan.loadRenderTarget("shadowTargetFinal", 256, 256);
        primSet.screenQuad = new ScreenQuad(primSet.shadowTargetFinal);
        primSet.screenQuad.initialize(__renderInitRadialBlur);
        
        // set the target as the shadow to get projcetd
        primSet.parentMesh.shadowToProject = primSet.shadowTarget;
        
        //mainSceneQuad   = new ScreenQuad(primSet.shadowTarget);
        //mainSceneQuad.initialize(renderInitScreenQuad);

        var material = primSet.material;
        
        //push envMap tex
        material.tex.env.push(arrayPeek(material.shader).envMap);
        material.tex.envDiff.push(arrayPeek(material.shader).envDiff);
        
        gl.useProgram(arrayPeek(material.shader).shaderHandle);
        
        arrayPeek(material.renderObj).addTexture("shadowMap", 0, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addUniform("u_mvMatrix", gl.mvMatrix, UNIFORMTYPE.MATRIX4);
        
        arrayPeek(material.renderObj).addUniform("u_projMatrix", gl.perspectiveMatrix, UNIFORMTYPE.MATRIX4);
        
        arrayPeek(material.renderObj).addUniform("u_shadowBiasMatrix",  g_mainLight.shadowMatrix, UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_vShadowLight",  g_mainLight.view, UNIFORMTYPE.MATRIX4);
        

        // debug---
        vertexData.vertexObject.name   = "vertexObject";
        vertexData.normalObject.name   = "normalObject";
        vertexData.texCoordObject.name = "texCoordObject";
        vertexData.indexObject.name    = "indexObject";
        //----------
        
        arrayPeek(material.renderObj).addBuffers(vertexData.vertexObject,     gl.ARRAY_BUFFER, 3, 0, gl.FLOAT);
        arrayPeek(material.renderObj).addBuffers(vertexData.normalObject,     gl.ARRAY_BUFFER, 3, 1, gl.FLOAT);
        arrayPeek(material.renderObj).addBuffers(vertexData.texCoordObject,   gl.ARRAY_BUFFER, 2, 2, gl.FLOAT);
        arrayPeek(material.renderObj).addBuffers(vertexData.indexObject,      gl.ELEMENT_ARRAY_BUFFER);

       
     //}

     gl.useProgram(null);
//     gl.console.log("Mesh Init done!");
    
    //__renderInitShadowProjection(primSet, vertexData);

}


function __renderInitShadowProjection(primSet, vertexData)
{
        var material = primSet.material;
        
        //push envMap tex
        //material.tex.env.push(arrayPeek(material.shader).envMap);
        //material.tex.envDiff.push(arrayPeek(material.shader).envDiff);
        
        gl.useProgram(arrayPeek(material.shader).shaderHandle);
        
        arrayPeek(material.renderObj).addTexture("shadowMap", 0, UNIFORMTYPE.TEXTURE2D);
        arrayPeek(material.renderObj).addUniform("u_mvMatrix", gl.mvMatrix, UNIFORMTYPE.MATRIX4);
        
        arrayPeek(material.renderObj).addUniform("u_projMatrix", gl.perspectiveMatrix, UNIFORMTYPE.MATRIX4);
        
        arrayPeek(material.renderObj).addUniform("u_shadowBiasMatrix",  g_mainLight.shadowMatrix, UNIFORMTYPE.MATRIX4);
        arrayPeek(material.renderObj).addUniform("u_vShadowLight",  g_mainLight.view, UNIFORMTYPE.MATRIX4);
        

        // debug---
        vertexData.vertexObject.name   = "vertexObject";
        vertexData.normalObject.name   = "normalObject";
        vertexData.texCoordObject.name = "texCoordObject";
        vertexData.indexObject.name    = "indexObject";
        //----------
        
        arrayPeek(material.renderObj).addBuffers(vertexData.vertexObject,     gl.ARRAY_BUFFER, 3, 0, gl.FLOAT);
        arrayPeek(material.renderObj).addBuffers(vertexData.normalObject,     gl.ARRAY_BUFFER, 3, 1, gl.FLOAT);
        arrayPeek(material.renderObj).addBuffers(vertexData.texCoordObject,   gl.ARRAY_BUFFER, 2, 2, gl.FLOAT);
        arrayPeek(material.renderObj).addBuffers(vertexData.indexObject,      gl.ELEMENT_ARRAY_BUFFER);

       
     //}

     gl.useProgram(null);
//     gl.console.log("Mesh Init done!");

}

function __renderInitRadialBlur(quad, shader)
{
     if(shader == undefined)
    {
	    quad.shader = createShader(gl, radialBlur_vshader, radialBlur_fshader, [ "vert", "texcoord"]);
	}
	else
	{
	    quad.shader = shader;
	}
	
	quad.renderObj = new RenderObject(quad.shader);
	
	quadBuf = getScreenAlignedQuad();
	
	quad.vertBuffer = quadBuf.vertexObject;
	quad.uvBuffer	= quadBuf.texCoordObject;
	
	
	quad.renderObj.addTexture("basemap", 0, UNIFORMTYPE.TEXTURE2D);
	
	quad.renderObj.addUniform("u_inv_viewport_width", 1.0/g_width, UNIFORMTYPE.FLOAT);
	quad.renderObj.addUniform("u_inv_viewport_height", 1.0/g_height, UNIFORMTYPE.FLOAT);
	quad.renderObj.addUniform("u_sampRadius", 5.0, UNIFORMTYPE.FLOAT);
	// quad.renderObj.addUniform("u_numSamples", 16, UNIFORMTYPE.INT);
	quad.renderObj.addUniform("u_mapSize", 256.0, UNIFORMTYPE.FLOAT);
	
	quad.renderObj.addBuffers(quad.vertBuffer, 	gl.ARRAY_BUFFER,  3, 0, gl.FLOAT);
	quad.renderObj.addBuffers(quad.uvBuffer, 	gl.ARRAY_BUFFER,  2, 2, gl.FLOAT);
}
