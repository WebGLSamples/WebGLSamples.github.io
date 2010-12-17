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

//----------------------WebGL Globals----------------------//

g_cam                   = new camera();
g_width                 = document.getElementById("canvas").width;
g_height                = document.getElementById("canvas").height;
g_camMoveSpeed          = 25.0;
gl                      = null; //webGL handle
g_worldObjects          = [];
g_collMan               = new CollisionManager();
g_meshMan               = new MeshManager();
g_texMan                = new TextureManager();
g_shaderMan             = new ShaderManager();
g_mouseDown             = false;
g_defaultTex            = null;
g_alphaTex              = null;
g_hiQu                  = true;

/*
 * This is the list of choices to "paint"
 *  1 = skin
 *  2 = face
 *  3 = hair
 *  4 = body
 *  5 = legs
 *  6 = stickers
 */
g_IntentSelected        = 1;
g_IntentText            = ["None", "Skin", "Face", "Hair", "Body", "Legs", "Stickers"];

//---------------------------------------------------------//

function tick()
{
  draw(gl);
  mouse = new vec2(0,0);
  mouse = getCursorPos();
  /* debug
  document.getElementById("mouse_state").innerHTML = "Mouse Status: down [" + g_mouseDown + "], pos [" + mouse.x + ", " + mouse.y + "]";

  document.getElementById("dbg_intent").innerHTML = "Intent:" + g_IntentText[g_IntentSelected];
  if(g_activeModel == null)
    document.getElementById("dbg_model").innerHTML = "Model: None";
  else
    document.getElementById("dbg_model").innerHTML = "Model:" + g_activeModel;
    */
}

function preload()
{
  gl = preinit();
}

function start()
{
  // call back functions
  document.onkeydown = inputKB;
  element = document.getElementById("pageContainer");
  element.onmousemove = function(e)
  {
    updateCursorPos(e, g_mouseDown);
  }
  element.onmouseup = function(e)
  {
      g_mouseDown = false;
      return mouseUp(e);
  }
  init();
  framerate = new Framerate("fps");
  setInterval("tick()", 25);
}
