# How to run Aquarium with WEBGL_multiview acceleration

WEBGL_multiview is a WebGL extension intended to improve stereo rendering performance by up to 2x.

## Platform requirements

At the time of writing (2018-08-13), the platform requirements for WEBGL_multiview are:

* DirectX 11.3 capable GPU (such as NVIDIA GeForce 900 series Maxwell GPU or newer)
* Windows 10
* Chrome version 70 or newer (Chrome Canary or Chromium built from source works)

OpenGL support for Linux is also partially implemented but not fully functional yet.

## To run

Start Chrome with these command line arguments:

chrome.exe --enable-webgl-draft-extensions --use-cmd-decoder=passthrough

Use also --allow-file-access-from-files in case you are opening Aquarium from the local filesystem using a file: URL.

Open:

aquarium-vr.html?enableMultiview=true&fitWindow=true

Then either enter VR mode or toggle stereo demo mode on from the UI. With these query parameters multiview is on by default, but can be toggled on or off from the options menu in the UI.
