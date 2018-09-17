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

project( aquarium )

include_directories(thirdparty/stb)
include_directories(thirdparty/glfw/include)
include_directories(thirdparty/glad/include)
include_directories(thirdparty/rapidjson/include)
  
# Glad
add_library(glad STATIC
  thirdparty/glad/src/glad.c
  thirdparty/glad/include/glad/glad.h
  thirdparty/glad/include/KHR/khrplatform.h
)
set(GLAD_INCLUDE_DIR thirdparty/glad/include)
  
# GLFW
set(GLFW_BUILD_DOCS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(GLFW_INSTALL OFF CACHE BOOL "" FORCE)
add_subdirectory(thirdparty/glfw)

target_include_directories(glad SYSTEM PUBLIC ${GLAD_INCLUDE_DIR})
#DawnExternalTarget("third_party" glad)
  
list(APPEND THIRDPARTY_LIBS
  glad
  glfw
)

include_directories(${CMAKE_SOURCE_DIR} thirdparty/rapidjson)

add_executable( aquarium src/Aquarium.h
src/ASSERT.h
src/Buffer.h
src/Context.h
src/ContextFactory.h
src/ContextFactory.cpp
src/FishModel.h
src/FPSTimer.cpp
src/FPSTimer.h
src/GenericModel.h
src/InnerModel.h
src/Matrix.h
src/Model.h
src/Model.cpp
src/OutsideModel.h
src/Program.h
src/SeaweedModel.h
src/Texture.h
src/Texture.cpp
src/opengl/BufferGL.h
src/opengl/BufferGL.cpp
src/opengl/ContextGL.h
src/opengl/ContextGL.cpp
src/opengl/FishModelGL.h
src/opengl/FishModelGL.cpp
src/opengl/GenericModelGL.h
src/opengl/GenericModelGL.cpp
src/opengl/InnerModelGL.h
src/opengl/InnerModelGL.cpp
src/opengl/OutsideModelGL.h
src/opengl/OutsideModelGL.cpp
src/opengl/ProgramGL.h
src/opengl/ProgramGL.cpp
src/opengl/SeaweedModelGL.h
src/opengl/SeaweedModelGL.cpp
src/opengl/TextureGL.h
src/opengl/TextureGL.cpp
src/Aquarium.cpp
src/Main.cpp
)

target_link_libraries(aquarium ${THIRDPARTY_LIBS})
