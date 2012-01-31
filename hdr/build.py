#!/usr/bin/python
#
# Copyright (c) 2006-2010 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

"""build system for assets"""

import re
import os
import sys
import shutil
import json
from optparse import OptionParser

def main(argv):
  """This is the main function."""
  parser = OptionParser()

  (options, args) = parser.parse_args(args=argv)

  ConvertO3DJSToModelJS('assets/teapot-12kverts/scene.json', 'assets/teapot-12kverts/scene.js', False)

# Convenience functions

def UnixifyPath(file_path):
  """converts \ to /"""
  return file_path.replace("\\", "/")

def MakeTexturePath(tex_base):
  return UnixifyPath(
     os.path.abspath(
         os.path.join(
             "source_assets", "sourceimages", tex_base)))

def FindTexture(tex_path):
  """Looks for a texture by changing the extension."""
  tex_base = os.path.basename(tex_path)
  (tex_name, tex_ext) = os.path.splitext(tex_base)
  tex_path = MakeTexturePath(tex_base)
  # try converting to .png and .jpg
  for ext in [".png", ".jpg"]:
    tex_path = MakeTexturePath(tex_name + ext)
    if os.path.exists(tex_path):
      break
  if not os.path.exists(tex_path):
    return None
  return tex_path


def GetJSObjectByTypeAndId(js, type, id, throw_on_fail = True):
  """."""
  try:
    for object in js['objects'][type]:
      if object['id'] == id:
        return object
  except:
    pass
  if throw_on_fail:
    raise RuntimeError("Object %s id:%d does not exist" % (type, id))
  return None


def GetParamRef(obj, name):
  try:
    value = obj['params'][name]['value']
    if value:
      return value['ref']
    return None
  except:
    return None


def ConvertO3DJSToModelJS(
    input_file, output_file, pretty):
  """."""
  # load the scene file, extract the data we want and write it out
  file = open(input_file, "rb")
  data = file.read()
  file.close()
  js = json.loads(data)

  models = []
  data = { 'models': models }

  # Get all fieids
  fields = {}
  for vb in js['objects']['o3d.VertexBuffer']:
    for field in vb['custom']['fieldData']:
      fields[field['id']] = field

  semantics = [
    '*unknown*',
    'position',
    'normal',
    'tangent',
    'binormal',
    'color',
    'texCoord',
  ]

  # extract the models
  for prim in js['objects']['o3d.Primitive']:
    print "Model: %s" % prim['properties']['name']
    out_fields = {}
    model = {'fields': out_fields}
    models.append(model)
    # extract buffer data
    sb = GetJSObjectByTypeAndId(
        js, 'o3d.StreamBank', GetParamRef(prim, 'o3d.streamBank'))
    for stream in sb['custom']['vertexStreams']:
      field = fields[stream['stream']['field']]
      semantic = semantics[stream['stream']['semantic']]
      out_fields[semantic] = {
        'type': 'Float32Array',
        'numComponents': field['numComponents'],
        'data': field['data']
      }
    # extract index bufffer
    i_buf = GetJSObjectByTypeAndId(
          js, 'o3d.IndexBuffer', prim['custom']['indexBuffer'])
    out_fields['indices'] = {
      'type': 'Uint16Array',
      'numComponents': 3,
      'data': i_buf['custom']['fieldData'][0]['data']
    }

    # extract diffuse params and texture name
    material = GetJSObjectByTypeAndId(
        js, 'o3d.Material', GetParamRef(prim, 'o3d.material'))
    diffuseSampler = GetJSObjectByTypeAndId(
        js, 'o3d.Sampler', GetParamRef(material, 'diffuseSampler'), False)
    if diffuseSampler:
      texture_id = GetParamRef(diffuseSampler, 'o3d.texture')
      if texture_id:
        diffuseTexture = GetJSObjectByTypeAndId(
            js, 'o3d.Texture2D', texture_id)
        texture = os.path.basename(diffuseTexture['params']['o3d.uri']['value'])
        print "Texture:", texture
      else:
        print "***MISSING TEXTURE***"
        texture = "error_DM.jpg"

      textures = {}
      model['textures'] = textures
      textures['diffuse'] = texture
      # check for various textures
      for suffix in [
          {'name': 'normalMap',     'suffix': '_NM'},
          {'name': 'reflectionMap', 'suffix': '_RM'}]:
        tex = FindTexture(texture.replace('_DM', suffix['suffix']))
        if tex:
          tex = os.path.basename(tex)
          print "Texture:", tex
          textures[suffix['name']] = tex

      # copy the textures to assets
      for key in textures:
        texture = textures[key]
        shutil.copyfile(
            os.path.join('source_assets', 'sourceimages', texture),
            os.path.join('assets', texture))

  file = open(output_file, "wb")
  if pretty:
    file.write(json.dumps(data, sort_keys=True, indent=4))
  else:
    file.write(json.dumps(data, separators=(',', ':')))
  file.close()


if __name__ == '__main__':
  main(sys.argv[1:])

