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

function loadObjVertexMtrl(mesh, completedCallback)
{

    // vertex req
	var reqVerts = new XMLHttpRequest();
	reqVerts.obj = { meshObj : mesh};
	reqVerts.onreadystatechange = function () { onResponseLoadVerts(reqVerts); };
	reqVerts.open("GET", mesh.meshDataSrc.vertexData, true);
	
	// mtrl req
	var reqMtrl = new XMLHttpRequest();
	reqMtrl.obj = { meshObj : mesh};
	reqMtrl.onreadystatechange = function () { onResponseLoadMtrl(reqMtrl); };
	reqMtrl.open("GET", mesh.meshDataSrc.mtrl, true);
	
	reqMtrl.send(null);
	reqVerts.send(null);
}

function onResponseLoadMtrl(req) 
{
// 	gl.console.log("req="+req);
    // only if req shows "complete"
    if (req.readyState == 4 ) 
    {
    	req.obj.meshObj.mtrlData = req.responseText;
    	req.obj.meshObj.preInit();
    }
};

function onResponseLoadVerts(req) 
{
// 	gl.console.log("req="+req);
    // only if req shows "complete"
    if (req.readyState == 4 ) 
    {
    	req.obj.meshObj.vertexData = req.responseText;
    	req.obj.meshObj.preInit();
    }
};

function processMatVertData(mesh)
{
    //mesh.mtrlData   = procObjMtrl(mesh.mtrlData);
    var mtrlData = procObjMtrl(mesh.mtrlData);
	mesh.vertexData = procObjVertices(mesh.primSets, mtrlData, mesh.vertexData);
	//mesh.generateMaterialBVL();
}

function procObjMtrl(text)
{
	
	var matArray = [];
	
	var materials = text.split("newmtl");
	
	var texSet = new TextureSet();
    var texSet2 = new TextureSet();
        
    for (var mtrlIndex = 0; mtrlIndex < materials.length; mtrlIndex++) 
    {
        
        
    	var material = new Material();
    	var lines = materials[mtrlIndex].split("\n");
    	
    	if(lines.length == 1)
    		continue;
    	
    	material.name = lines[0].substring(1);
    	lines = lines.slice(1);
    	
        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) 
        {
            var line = lines[lineIndex].replace(/[ \t]+/g, " ").replace(/\s\s*$/, "");
        
            
	        // ignore comments
	        if (line[0] == "#")
	            continue;
	        
	        var array = line.split(" ");
	        
	        // ambient mat
	        if(array[0] == "Ka")
	        {
	        	material.amb.x = array[1];
	        	material.amb.y = array[2];
	        	material.amb.z = array[3];
	        	if(array.length > 4)
	        		material.amb.w = array[4];
	        }
	        
	        // diffuse mat
	        else if(array[0] == "Kd")
	        {
	        	material.diff.x = array[1];
	        	material.diff.y = array[2];
	        	material.diff.z = array[3];
	        	if(array.length > 4)
	        		material.diff.w = array[4];
	        }
	        
	   	 	// spec mat
	        else if(array[0] == "Ks")
	        {
	        	material.spec.x = array[1];
	        	material.spec.y = array[2];
	        	material.spec.z = array[3];
	        	if(array.length > 4)
	        		material.spec.w = array[4];
	        }
	        
	        // spec power
	        else if(array[0] == "Ns")
	        {
	        	material.pwr = array[1];
	        }
	        
	        //read in textures
	        
	        // sets
	        else if(array[0] == "map_set1")
	        {
	            // add to texture manager
	            
// 	        	gl.console.log("Loading texture: " + array[1]);
	        	
	        	texSet.name = array[1];
	        	// look up the tex sets
                material.tex.set1.push(g_texMan.getTextureSetByName(texSet.name));
	        }
	        else if(array[0] == "map_set2")
	        {
	            // add to texture manager
	            
// 	        	gl.console.log("Loading texture: " + array[1]);
	        	
	        	texSet2.name = array[1];
	        	// look up the tex sets
                material.tex.set2.push(g_texMan.getTextureSetByName(texSet2.name));
	        }
	        
	        else if(array[0] == "map_Kd")
	        {
	            // add to texture manager
	            
// 	        	gl.console.log("Loading texture: " + array[1]);
	        	
	        	texSet.diff = array[1];
	        	material.tex.diffuse1.push(g_texMan.loadTexture(array[1]));
	        }
	        
	         // diffuse
	        else if(array[0] == "map_Kd2")
	        {
	            // add to texture manager
	            
// 	        	gl.console.log("Loading texture: " + array[1]);
	        	
	        	texSet2.diff = array[1];
	        	material.tex.diffuse2.push(g_texMan.loadTexture(array[1]));
	        }
	        
	        // spec
	        else if(array[0] == "map_Ks")
	        {
	            texSet.spec = array[1];
	        	material.tex.spec1.push(g_texMan.loadSpecMap(array[1]));
	        }
	        
	        // spec
	        else if(array[0] == "map_Ks2")
	        {
	            texSet2.spec = array[1];
	        	material.tex.spec2.push(g_texMan.loadSpecMap(array[1]));
	        }
	        
	        //normal
	        else if(array[0] == "bump")
	        {
	            texSet.norm = array[1];
	        	material.tex.normal1.push(g_texMan.loadNormalMap(array[1]));
	        }
	        
	        //normal
	        else if(array[0] == "bump2")
	        {
	            texSet2.norm = array[1];
	        	material.tex.normal2.push(g_texMan.loadNormalMap(array[1]));
	        }
	        
	        else if(array[0] == "shader")
	        {
	        	//material.shader.push(---);
	        }
	        
	        else if(array[0] == "pickable")
	        {
	        	material.pickable = (array[1] == "true" ? true : false);
	        }
	        
        }
        
        
        
        // add material to list
        if(material.name != null)
        	matArray.push(material);
    }
    
    
    
    return matArray;

};

function procObjVertices(primSets, matArray, text)
{
	var data = 	new MeshData();
					
	
    var vertexArray = [];
    var normalArray = [];
    var textureArray = [];
    
    var indexSets = [];
    var curMatName = null;
    for(var index in matArray)
    {
    	subArr = [];
    	indexSets.push(subArr);
    	indexSets[index].points = [];
    }
    
    var vertex = [ ];
    var normal = [ ];
    var texture = [ ];
    var facemap = { };
    var index = 0;
        
    var lines = text.split("\n");
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        var line = lines[lineIndex].replace(/[ \t]+/g, " ").replace(/\s\s*$/, "");
        
        // ignore comments
        if (line[0] == "#")
            continue;
        
        var array = line.split(" ");
        
        if(array[0] == "usemtl")
        {
        	curMatName = array[1];
        }
        else if (array[0] == "v") {
            // vertex
            vertex.push(parseFloat(array[1]));
            vertex.push(parseFloat(array[2]));
            vertex.push(parseFloat(array[3]));
        }
        else if (array[0] == "vt") {
            // normal
            texture.push(parseFloat(array[1]));
            texture.push(parseFloat(array[2]));
        }
        else if (array[0] == "vn") {
            // normal
            normal.push(parseFloat(array[1]));
            normal.push(parseFloat(array[2]));
            normal.push(parseFloat(array[3]));
        }
        else if (array[0] == "f") {
            // face
            if (array.length != 4) {
//                 gl.console.log("*** Error: face '"+line+"' not handled");
                continue;
            }
            
            for (var i = 1; i < 4; ++i) {
                if (!(array[i] in facemap)) {
                    // add a new entry to the map and arrays
                    var f = array[i].split("/");
                    var vtx, nor, tex;
                    
                    if (f.length == 1) {
                        vtx = parseInt(f[0]) - 1;
                        nor = vtx;
                        tex = vtx;
                    }
                    else if (f.length = 3) {
                        vtx = parseInt(f[0]) - 1;
                        tex = parseInt(f[1]) - 1;
                        nor = parseInt(f[2]) - 1;
                    }
                    else {
//                         obj.ctx.console.log("*** Error: did not understand face '"+array[i]+"'");
                        return null;
                    }
                    
                    // do the vertices
                    var x = 0;
                    var y = 0;
                    var z = 0;
                    if (vtx * 3 + 2 < vertex.length) {
                        x = vertex[vtx*3];
                        y = vertex[vtx*3+1];
                        z = vertex[vtx*3+2];
                    }
                    vertexArray.push(x);
                    vertexArray.push(y);
                    vertexArray.push(z);
                    
                    // save points for creating BVLs
                    var indicesIndex = getIndexOfName(matArray, curMatName);
                    indexSets[indicesIndex].points.push(x);
                    indexSets[indicesIndex].points.push(y);
                    indexSets[indicesIndex].points.push(z);
                    
                    // do the textures
                    x = 0;
                    y = 0;
                    if (tex * 2 + 1 < texture.length) {
                        x = texture[tex*2];
                        y = texture[tex*2+1];
                    }
                    textureArray.push(x);
                    textureArray.push(y);
                    
                    // do the normals
                    x = 0;
                    y = 0;
                    z = 1;
                    if (nor * 3 + 2 < normal.length) {
                        x = normal[nor*3];
                        y = normal[nor*3+1];
                        z = normal[nor*3+2];
                    }
                    normalArray.push(x);
                    normalArray.push(y);
                    normalArray.push(z);
                    
                    facemap[array[i]] = index++;
                }
                
                var indicesIndex = getIndexOfName(matArray, curMatName);
                
                indexSets[indicesIndex].push(facemap[array[i]]);
                
            }
        }
    }
    
    // set the VBOs
    data.vertexObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, data.vertexObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
	
    data.normalObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, data.normalObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalArray), gl.STATIC_DRAW);

    data.texCoordObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, data.texCoordObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureArray), gl.STATIC_DRAW);
    
    
    var indexArray = new Array(30000); // create a new array with all the indices
  
    var prevArrayLen = 0;
    var indexIndex = 0;
    for(var index=0; index<matArray.length; index++)
    {
        primSets.push({ size: 0, indexInBuffer: prevArrayLen, points: indexSets[index].points, material: matArray[index] });
    	var face = 0;
    	for(; face < indexSets[index].length; face++)
    	{
    		indexArray[indexIndex++] = (indexSets[index][face]);
    	}

    	primSets[index].size = face;
    	
    	prevArrayLen = prevArrayLen + indexSets[index].length;
    }
    
    indexArray = indexArray.slice(0,  indexIndex);
    
	data.numIndices = indexArray.length;
	data.indexObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, data.indexObject);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STREAM_DRAW);
  
    return data;
}

function getIndexOfName(matArray, name)
{
	for(var index = 0; index < matArray.length; index++)
	{
		if(name == matArray[index].name)
		{
			return index;
		}
	}
	
	return 0;
}
