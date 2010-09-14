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

/**
* retunds string names of available models
* @return array with string name of each model currently available
*/
function getAvailableModels()
{
    return g_meshMan.getModelNames();
}

/**
* returns a models camera
* @return camera
*/
function setModelCamera(modelName) 
{
    g_meshMan.setModelCamera(modelName);
}

function getModelCamera(modelName) 
{
    g_meshMan.getModelCamera(modelName);
}

/**
* loads the model passed in as the current working model
* @param model - model to load
*/
function setActiveModel(modelName) 
{
    if(g_activeModel)
    {
        if(!removeModelFromScene(g_activeModel))
        {
/*
            gl.console.log("could not remove active model: \"" + g_activeModel + "\" from scene, could not make model: \"" + modelName + "\" the new active model");
*/
        }
        else
         {
            // save camera
            setModelCamera(g_activeModel);
            
            g_activeModel = modelName;
            addModelToScene(modelName);
            // fetch previous
            getModelCamera(modelName);
        }
    }
    else
    {
        g_activeModel = modelName;
        addModelToScene(modelName);
        // fetch previous
        getModelCamera(modelName);
    }    
}

function apiSetGraphicsQuality(quality)
{
    if(quality == "low")
    {
        removeModelFromScene("backdropReceiver");
        removeModelFromScene("backdropProject");
        g_hiQu = false;
    }
    else if(quality == "high")
    {
        // remove models in case they were allready added
        removeModelFromScene("backdropReceiver");
        removeModelFromScene("backdropProject");
        
        // add the models
        addModelToScene("backdropReceiver");
        addModelToScene("backdropProject");
        g_hiQu = true;
    }
}

function apiUseToolSelected(name) 
{
    var stringList = name.split(' ');
    if (stringList[0] == "undo") 
    {
        g_cam.undosticker();
    }
	else if(stringList[0] == "doll1")
	{
		setActiveModel("dollbaseMale");
	}
	else if(stringList[0] == "doll2")
	{
		setActiveModel("dollbaseFemale");
	}    
	else if(stringList[0] == "zoom")
	{
	    g_cam.zoom();
	}
	else if(stringList[0] == "cameraReset")
	{
	    g_cam.reset();
	}
}


function apiSetColor(color)
{
    colorFillLayer(new vec4(color.R/255.0, color.G/255.0, color.B/255.0, color.A/255.0));
}

function apiSelectIntent(name)
{
    g_IntentSelected = mapUIToIntentIndex(name);
    selectModelIntent(g_IntentText[g_IntentSelected]);
}

function apiPushMaterial(uiName)
{
/*
    gl.console.log("api setting: " + uiName);
*/
    
    var arr = uiName.split('_');
    //check if envmap or texture
    if("mat" == arr[0])
    {
        pushShaderToModel(arr[1]);
    }
    else if ("sticker" == arr[0]) 
    {
        // procedurally build name of texture from index
        var texName = "StampDecal_";
        if (arr[1] < 10) texName += "0";
        texName += arr[1] + "_DM.png";
        g_cam.selecttexture(g_texMan.getTextureByName(texName));
    }
    else
    {
        // get numeric value
        var val = parseInt(arr[1]);
        var texTable = g_texMan.getTextureSetNamesByLayerAndPart(getActiveLayer(), getActivePartName());
        pushTextureToModelPart(texTable[val%texTable.length]);
         // debug
/*
         var texSet = g_texMan.getTextureSetByName(texTable[val%texTable.length]);
        gl.console.log("TEXTURE PUSH TO MODEL PART: setName" + texSet.name + ", diffName: " + texSet.diff.name + ", diffValue: " + texSet.diff + "specName: " + texSet.spec.name +
                        ", specValue: " + texSet.spec + " normalName: " + texSet.norm.name + ", normLayer: " + texSet.layer + ", normalValue: " + texSet.norm);
*/
    }
}

function selectModelIntent(partName)
{
    switch(partName)
    {
        case "None":
            setActiveLayer(-1);
            setSelectedPrimSet(-1);
        break;
        case "Skin":
            setActiveLayer(2);
            setSelectedPrimSet(0);
        break;
        case "Hair":
            setSelectedPrimSet(1);
            setActiveLayer(1);
        break;
        case "Face":
            setSelectedPrimSet(1);
            setActiveLayer(0);
        break;
        case "Body":
            setSelectedPrimSet(0);
            setActiveLayer(1);
        break;
        case "Legs":
            setSelectedPrimSet(0);
            setActiveLayer(0);
        break;
    }

/*
    // set the colour picker
    setColourPickersColour();*/


    // clear sticker selection
    if (partName != "Sticker") 
    {
        g_cam.clearselection();
    }
    
}

/**
* Fills layer1 components (eyes or shirt) components with color passed in
* @param color - vec4: the color to fill with
* @return false if failed
*/

function colorFillLayer(color) 
{
    if(getActiveLayer() == 2)
    {
        return colorFillSkin(color);
    }
	
	if(getSelectedPrimSet() == null || getSelectedPrimSet().length == 0)
		return false;
    
    primSet = getSelectedPrimSet()[0];
    if (primSet && color && getActiveLayer() >=0) 
    {
        primSet.material.fillColor[getActiveLayer()].x = color.x;
        primSet.material.fillColor[getActiveLayer()].y = color.y;
        primSet.material.fillColor[getActiveLayer()].z = color.z;
        primSet.material.fillColor[getActiveLayer()].w = color.w;
        return true;
    }
    return false;
}

function colorFillSkin(color) 
{
	if(!getActiveModel().mesh.loaded)
		return false;
		
    primSets = getActiveModel().mesh.primSets
    if (primSets && color) 
    {
        for(var index = 0; index < primSets.length; index++)
        {
            primSets[index].material.fillColor[2].x = color.x;
            primSets[index].material.fillColor[2].y = color.y;
            primSets[index].material.fillColor[2].z = color.z;
            primSets[index].material.fillColor[2].w = color.w;
        }
        return true;
    }
    return false;
}

function setColourPickersColour()
{
    var color = new vec4();
    
    // get skin col
    if(getActiveLayer() == 2)
    {
        primSets = getActiveModel().mesh.primSets
        color.x = primSets[0].material.fillColor[2].x;
        color.y = primSets[0].material.fillColor[2].y;
        color.z = primSets[0].material.fillColor[2].z;
        color.w = primSets[0].material.fillColor[2].w;
//        Picker.setColor(color);
    }
    else
    {
        primSet = getSelectedPrimSet()[0];
        if (primSet && color && getActiveLayer() >=0) 
        {
            color.x = primSet.material.fillColor[getActiveLayer()].x;
            color.y = primSet.material.fillColor[getActiveLayer()].y;
            color.z = primSet.material.fillColor[getActiveLayer()].y;
            color.w = primSet.material.fillColor[getActiveLayer()].w;
//            Picker.setColor(color);
         }
    }
}     

/**
* creates a new sticker projection session to place a sticker/decal
* on the model
* @param texture - to place on the model
* @return false if activation failed
*/
function activateStickerPlacement(textureName) 
{
    
}


/**
* Pushes the passed in texture to the top of the give texture stack,
* the new texture becoms the active texture for all model parts in the model
* @param textureName - name of the texture to load
* @return false if failed
**/
function pushTextureToModel(textureName) 
{
    return texturePush(TEXTYPE.SET1, getActiveModel().mesh.primSets, textureName);
}

/**
* Pops the top most diffuse texture form the stack for all primsets in the model,
* previous texture becomes active, note: popping the last texture applies a default
* texture, further attempts result in the same behavior
* @return false if failed
**/
function popTextureFromModel() 
{
    return texturePop(TEXTYPE.SET1, getActiveModel().mesh.primSets);
}

/**
* Pushes the passed in texture to the top of the given texture stack,
* the new texture becoms the active texture
* @param textureName - name of the texture to load
* @return false if failed
**/
function pushTextureToModelPart(textureName) 
{
    return texturePush(TEXTYPE.SET1, getSelectedPrimSet(), textureName);
}

/**
* Pops the top most texture form the given stack, previous texture becomes active,
* note: popping the last texture applies a default texture, further attempts
* result in the same behavior
* @return false if failed
*/
function popTextureFromModelPart() 
{
    return texturePop(TEXTYPE.SET1, getSelectedPrimSet());
}

/**
* Pushes the passed in shader to the top of the give shader stack,
* the new shader becoms the active shader for all model parts in the model
* @param shaderName - name of the shader to load
* @return false if failed
**/
function pushShaderToModel(shaderName) 
{
     return shaderPush(getActiveModel().mesh.primSets, shaderName, getActiveModel().mesh.vertexData);
}

/**
* Pops the top most shader form the stack for all model parts in the model,
* previous shader becomes active, note: popping the last shader applies a default
* shader, further attempts result in the same behavior
* @return false if nothing to pop or failed
**/
function popShaderFromModel() 
{
    return shaderPop(getActiveModel().mesh.primSets);
}

/**
* Pushes the passed in shader to the top of the give shader stack,
* the new shader becomes the active shader for the model part
* @param shaderName - name of the shader to load
* @return false if failed
**/
function pushShaderToModelPart(shaderName) 
{
    return shaderPush(getSelectedPrimSet(), shaderName, getActiveModel().mesh.vertexData);
}

/**
* Pops the top most shader form the stack for all model parts in the model,
* previous shader becomes active, note: popping the last shader applies a default
* shader, further attempts result in the same behavior
* @return false if nothing to pop or failed
**/
function popShaderFromModelPart() 
{
    return shaderPop(getSelectedPrimSet());
}

function createModelURL()
{
   var modelURL = buildModelURL() + "&stickers=" + g_cam.getstickurl();
/*
   gl.console.log("URL length: " + modelURL.length);
*/
   return modelURL;
}

function loadModelFromURL()
{
    // load model
    loadMeshFromURL();
    
    // load stickers
    loadStickersFromURL();
    
    g_cam.updateStickerCounter();
}