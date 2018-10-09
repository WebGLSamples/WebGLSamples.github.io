cmake_minimum_required(VERSION 3.0)
set (CMAKE_CXX_STANDARD 11)
set(CMAKE_BUILD_TYPE Release)

OPTION(_NDEBUG "skip ASSERT of the project" ON)
if(_NDEBUG)
  ADD_DEFINITIONS(-D_NDEBUG)
endif(_NDEBUG)

if (UNIX AND NOT APPLE)
	set (LINUX TRUE)
endif()

project( Aquarium )

find_package(OpenGL REQUIRED)
include_directories(${OPENGL_INCLUDE_DIR})

find_package(PkgConfig REQUIRED)
find_package(GLEW REQUIRED)
include_directories(${GLEW_INCLUDE_DIRS})
add_definitions(-DGLEW_STATIC)

if (APPLE)
  include_directories(/usr/local/include)
  link_directories(/usr/local/lib/)
  include_directories(/usr/local/include/SOIL)
  include_directories(/usr/local/include/GLFW)
  find_library(COCOA_LIBRARY Cocoa REQUIRED)
  find_library(IOKIT_LIBRARY IOKit REQUIRED)
  find_library(COREVID_LIBRARY CoreVideo REQUIRED)
  find_package(GLUT REQUIRED)
  include_directories(${GLUT_INCLUDE_DIR})
endif (APPLE)

if (LINUX)
pkg_search_module(GLFW REQUIRED glfw3)
include_directories(${GLFW_INCLUDE_DIRS})
include_directories(/usr/include/SOIL)
link_directories(/usr/lib)
endif(LINUX)

include_directories(${CMAKE_SOURCE_DIR}/Aquarium/rapidjson)

add_executable( Aquarium Aquarium/Main.cpp
Aquarium/Scene.h
Aquarium/Scene.cpp
Aquarium/Texture.h
Aquarium/Texture.cpp
Aquarium/Model.h
Aquarium/Model.cpp
Aquarium/AttribBuffer.h
Aquarium/AttribBuffer.cpp
Aquarium/Buffer.h
Aquarium/Buffer.cpp
Aquarium/FPSTimer.h
Aquarium/FPSTimer.cpp
Aquarium/Extent.h
Aquarium/Globals.h
Aquarium/ParticleSystem.h
Aquarium/ParticleSystem.cpp
Aquarium/Program.h
Aquarium/Program.cpp
Aquarium/Primitives.h
Aquarium/Primitives.cpp
Aquarium/Uniform.h
Aquarium/Uniform.cpp
Aquarium/ASSERT.h
)

if (APPLE)
target_link_libraries(Aquarium ${OPENGL_LIBRARY} ${GLUT_LIBRARY} ${COCOA_LIBRARY} ${IOKIT_LIBRARY} ${COREVIDEO_LIBRARY} GLFW ${GLEW_LIBRARIES} SOIL)
endif(APPLE)

if (LINUX)
target_link_libraries(Aquarium ${OPENGL_LIBRARY} ${GLFW_STATIC_LIBRARIES} ${GLEW_LIBRARIES} SOIL)
endif(LINUX)
