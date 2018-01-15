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

function Model(name, mesh)
{
	this.name = name;
	this.mesh = mesh;
	this.camera = null;
}

function MeshManager()
{
    this.modelList = [];
    this.readyList = []; // meshes that have data ready but have not been processed
    this.meshesLoading = true; // indicates that no meshes have loaded or that they are still loading
    this.postMeshLoadCallbackList = [];
}

MeshManager.prototype.loadMesh = function(name, objURL, mtrlURL, defaultShader) 
{
    var newMesh = new Mesh({ vertexData: objURL, mtrl: mtrlURL });
    newMesh.defaultShaderName = defaultShader;
    
    var model=new Model(name,newMesh);
    this.readyList.push(model);
    
    newMesh.loadMesh();
};

MeshManager.prototype.getModelByName = function(name)
{
	for(var index in this.modelList)
	{
		if(name == this.modelList[index].name)
			return this.modelList[index];
	}
	
	// if here the model is ready or name is bad
	// add as the model to make active when it loads
	this.meshToAdd = name;
	
	return null;
};

MeshManager.prototype.getModelNames = function()
{
    var names = [];
	for(var index in this.modelList)
	{
		names.push(this.modelList[index].name);
	}
	
	return names;
};

MeshManager.prototype.setModelCamera = function(name) 
{
    var model = this.getModelByName(name);
    if (model.camera == null)
    {
        model.camera = new camera();
    }
    model.camera.copy(g_cam);
};

MeshManager.prototype.getModelCamera = function(name) 
{
    var model = this.getModelByName(name);
    if (model && model.camera) 
    {
        g_cam.copy(model.camera);
    }
    else
    {
        // dont have a model camera yet
        g_cam.clearstickers();
    }
    
    g_cam.updateStickerCounter();
};

MeshManager.prototype.addToScene = function(name) 
{
	var model = this.getModelByName(name);
	
	if(model)
	    g_worldObjects.push(model);
	else // add as the model to make active when it loads
	    this.meshToAdd = name;
	
	return null;
};


MeshManager.prototype.processMeshData = function()
{
    // loop through meshes and load ready data
    for(var index in this.readyList)
    {   
         // if item is ready load it
        if(this.readyList[index] && this.readyList[index].mesh.readyToProcess)
        {
            // pop the item
            var model = this.readyList[index];
            this.readyList.splice(index, 1);
            
            model.mesh.initialize();
            
            this.modelList.push(model);
            
            if(this.meshToAdd)
            {
                if(this.meshToAdd == model.name)
                {   
                    g_worldObjects.push(model);
                    this.meshToAdd = null;
                }
            }
            
            if(this.readyList.length == 0 && g_initComplete == true) // all meshes have loaded, call post mesh load init
            {
                this.onLoaded();
            }
            
            break;
        }
       
    }
}

MeshManager.prototype.addOnLoadedCallback = function(callback)
{
    this.postMeshLoadCallbackList.push(callback)
}

MeshManager.prototype.onLoaded = function()
{
    for(var index in this.postMeshLoadCallbackList)
    {
        // call the functions
        this.postMeshLoadCallbackList[index]();
    }
}
