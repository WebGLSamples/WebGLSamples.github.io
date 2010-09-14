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

function TextureSet()
{
    this.name="unnamed";
    this.diff = g_alphaTex;
    this.spec = g_alphaTex;
    this.norm = g_alphaTex;
    this.layer = 0;
    this.partName=null;
}

function TextureManager()
{
    this.textureMap  = [];
    this.rttMap      = [];
    this.materialMap = [];
    this.normalMap = [];
    this.specMap = [];
    this.textureSetMap  = [];
}

TextureManager.prototype.loadTexture = function(name)
{
    return this.loadTexAddToMap(this.textureMap, name);
};

TextureManager.prototype.loadTextureSet = function(setName, diffName, specName, normalName, layer, partName)
{
    if(this.textureSetMap[setName] == undefined)
    {
        var texSet = new TextureSet();
        
        if(diffName && diffName.image)
            texSet.diff                 = diffName;
        else
            texSet.diff                 = diffName      == undefined ? null : this.loadTexAddToMap(this.textureMap, diffName);
        
        if(specName && specName.image)
            texSet.spec                 = specName;
        else    
            texSet.spec                 = specName      == undefined ? null : this.loadTexAddToMap(this.specMap, specName);
        
        if(normalName && normalName.image)
            texSet.norm                 = normalName;
        else
            texSet.norm                 = normalName    == undefined ? null : this.loadTexAddToMap(this.normalMap, normalName);
            
        // set to default if something didnt work right
        texSet.diff = ((texSet.diff == null || texSet.diff == undefined) ? g_alphaTex : texSet.diff);
        texSet.spec = ((texSet.spec == null || texSet.diff == undefined) ? g_alphaTex : texSet.spec);
        texSet.norm = ((texSet.norm == null || texSet.diff == undefined) ? (layer == 0 ? g_defaultNorm1 : g_defaultNorm2) : texSet.norm);
        
        // debug
//         gl.console.log("TEXTURE SET LOADED: setName" + setName + ", diffName: " + diffName + ", diffValue: " + texSet.diff + "specName: " + specName +
//                         ", specValue: " + texSet.spec + " normalName: " + normalName + ", normLayer: " + layer + ", normalValue: " + texSet.norm);
            
        texSet.layer    = layer;
        texSet.partName = partName;
        texSet.name     = setName
         
        this.textureSetMap[setName]          = texSet;
        this.textureSetMap[setName].name     = setName;
    }
    
    return this.textureSetMap[setName];
};

TextureManager.prototype.loadRenderTarget=function(name,width,height) 
{
    if(this.rttMap[name] == undefined)
    {
        this.rttMap[name] = createRenderTargetTexture(width, height);
        if(this.rttMap[name] != null)
            this.rttMap[name].name = name;
    }
    
    return this.rttMap[name];
};

TextureManager.prototype.loadMaterial=function(name) 
{
    return this.loadTexAddToMap(this.materialMap, name);
};

TextureManager.prototype.loadNormalMap=function(name) 
{
    return this.loadTexAddToMap(this.normalMap, name);
};

TextureManager.prototype.loadSpecMap=function(name) 
{
    return this.loadTexAddToMap(this.specMap, name);
};

TextureManager.prototype.loadTexAddToMap=function(map, name)
{
    if(map[name] == undefined)
    {
        map[name] = loadImageTexture(gl,"content/texture/" + name);
        map[name].name = name;
    }
    
    return map[name];
}

TextureManager.prototype.addTexture = function(name, handle)
{
    this.textureMap[name] = handle;
};

TextureManager.prototype.getTextureSetNames = function()
{
    var names = [];
    for(var index in this.textureSetMap)
    {
        names.push(this.textureSetMap[index].name);
    }
    
    return names;
};

// layer index 0, 1
// partName "head", "body"
TextureManager.prototype.getTextureSetNamesByLayerAndPart = function(layerIndex, partName)
{
    var names = [];
    for(var index in this.textureSetMap)
    {
        if(this.textureSetMap[index].layer == layerIndex && this.textureSetMap[index].partName == partName)
        {
            names.push(this.textureSetMap[index].name);
        }
    }
    
    return names;
};

TextureManager.prototype.getTextureSetByName = function(name)
{
    var tex = this.textureSetMap[name];
    
    if(tex != undefined)
        return tex;
        
//     gl.console.log("No texture set by the name of: \"" + name + "\"");
    
    return null;
};

TextureManager.prototype.getTextureByName = function(name)
{
    var tex = this.textureMap[name];
    
    if(tex == undefined)
        tex = this.rttMap[name];
        
    if(tex == undefined)
        tex = this.materialMap[name];
        
    if(tex == undefined)
        tex = this.normalMap[name];
        
    if(tex == undefined)
        tex = this.specMap[name];
        
    if(tex != undefined)
        return tex;
        
//     gl.console.log("No texture by the name of: \"" + name + "\"");
    
    return null;
};

TextureManager.prototype.init = function()
{
    this.loadTextureSet("defaultHead", "alphaTex.png", "whiteTex.png", "defaultNormMap1.jpg", 0, "Head");
    this.loadTextureSet("defaultHair", "alphaTex.png", "whiteTex.png", "defaultNormMap2.jpg", 1, "Head");
    this.loadTextureSet("defaultBody", "alphaTex.png", "whiteTex.png", "defaultNormMap1.jpg", 0, "Body");
    this.loadTextureSet("defaultLeg",  "alphaTex.png", "whiteTex.png", "defaultNormMap2.jpg", 1, "Body");

    this.loadTexture("StampDecal_01_DM.png");
    this.loadTexture("StampDecal_02_DM.png");
    this.loadTexture("StampDecal_03_DM.png");
    this.loadTexture("StampDecal_04_DM.png");
    this.loadTexture("StampDecal_05_DM.png");
    this.loadTexture("StampDecal_06_DM.png");
    this.loadTexture("StampDecal_07_DM.png");
    this.loadTexture("StampDecal_08_DM.png");
    this.loadTexture("StampDecal_09_DM.png");
    this.loadTexture("StampDecal_10_DM.png");
    
    // number of texture to load - pulled this from asset folder
    var numHeadSets = 10;
    for(var index = 0; index < numHeadSets; ++index)
    {
        var texNum = index < 9 ? "0" + (index+1) : (index+1);
        
        // head
        this.loadTextureSet("Head" + texNum, "Head/HeadDecal" + texNum + "_DM.png", "Head/HeadDecal" + texNum + "_ColorM.jpg", "Head/HeadDecal" + texNum + "_NM.jpg", 0, "Head");
        
        // hair
        this.loadTextureSet("Hair" + texNum, "Hair/HairDecal" + texNum + "_DM.png", "Hair/HairDecal" + texNum + "_ColorM.jpg", "Hair/HairDecal" + texNum + "_NM.jpg", 1, "Head");

    }
    
    var numBodySets = 10;
    for(var index = 0; index < numBodySets; ++index)
    {
        var texNum = index < 9 ? "0" + (index+1) : (index+1);

        // body
        this.loadTextureSet("Body" + texNum, "Body/BodyDecal" + texNum + "_DM.png", "Body/BodyDecal" + texNum + "_ColorM.jpg", "Body/BodyDecal" + texNum + "_NM.jpg", 1, "Body");
        
        // legs
        this.loadTextureSet("Legs" + texNum, "Legs/LegDecal" + texNum + "_DM.png", "Legs/LegDecal" + texNum + "_ColorM.jpg", "Legs/LegDecal" + texNum + "_NM.jpg", 0, "Body");

    }
};
