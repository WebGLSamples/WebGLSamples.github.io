#  Native Aquarium
Native Aquarium is a native implementation of [WebGL Aquarium](https://github.com/WebGLSamples/WebGLSamples.github.io). The goal of this project is to compare the performance of WebGL version to its native version.

# Progress
<table>
  <tr align=center>
    <td><strong>OS</td>
    <td><strong>Backend</td>
    <td><strong>Supported</td>
  </tr>
  <tr align=left>
    <td>Linux</td>
    <td>OpenGL</td>
    <td>Y</td>
  </tr>
  <tr align=left>
    <td>macOS</td>
    <td>OpenGL</td>
    <td>Y</td>
  </tr>
  <tr align=left>
    <td>Windows</td>
    <td>OpenGL</td>
    <td>Y</td>
  </tr>
</table>


## Build

Native Aquarium uses cmake to build on Linux, macOS and Windows.
```sh
# cd the repo
cd aquarium-native

# get submodules
git submodule init && git submodule update

# make build directory
mkdir build && cd build

# build on Windows
cmake -G "Visual Studio 15 2017 Win64" ..
open build/Aquarium.sln using visual studio, set Aquarium as StartUp project and build

# build on Linux or macOS
cmake ..
make
```

# Run
```sh
# "--num-fish": specifies how many fishes will be rendered

# run on Windows
run it in Visual Studio
or
aquarium.exe --num-fish 10000

# run on Linux and macOS
./aquarium  --num-fish 10000
```
