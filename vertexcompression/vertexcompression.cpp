// vertexcompression.cpp : Defines the entry point for the console application.
//

#define _CRT_SECURE_NO_WARNINGS

#include <assert.h>
#include <math.h>
#if !defined(_MSC_VER)
#include <stdint.h>
#else
typedef signed char int8_t;
typedef unsigned char uint8_t;
typedef short int16_t;
typedef unsigned short uint16_t;
typedef int int32_t;
typedef unsigned int uint32_t;
#endif
#include <stdio.h>
#include <algorithm>
#include <map>
#include <string>
#include <vector>

void normalize(std::vector<float>* values) {
  assert(values->size() % 3 == 0);
  for (size_t ii = 0; ii < values->size(); ii += 3) {
    float v0 = (*values)[ii + 0];
    float v1 = (*values)[ii + 1];
    float v2 = (*values)[ii + 2];
    float len = sqrtf(v0 * v0 + v1 * v1 + v2 * v2);
    if (len > 0.00001f) {
      (*values)[ii + 0] = v0 / len;
      (*values)[ii + 1] = v1 / len;
      (*values)[ii + 2] = v2 / len;
    }
  }
}

struct VectorInfo {
  float min_value;
  float max_value;
  float range;
  float scale;
};

void computeExtents(
    const std::vector<float>& values,
    size_t numComponents,
    VectorInfo* infos) {
  assert (values.size() >= numComponents);
  assert (values.size() % numComponents == 0);

  for (size_t cc = 0; cc < numComponents; ++cc) {
    float value = values[cc];
    infos[cc].min_value = value;
    infos[cc].max_value = value;
  }

  for (size_t ii = numComponents; ii < values.size(); ii += numComponents) {
    for (size_t cc = 0; cc < numComponents; ++cc) {
      float value = values[ii + cc];
      infos[cc].min_value = std::min(value, infos[cc].min_value);
      infos[cc].max_value = std::max(value, infos[cc].max_value);
    }
  }

  for (size_t cc = 0; cc < numComponents; ++cc) {
    infos[cc].range = infos[cc].max_value - infos[cc].min_value;
    infos[cc].scale = std::max(
        fabs(infos[cc].min_value), fabs(infos[cc].max_value));
  }
}


void quantize(
    const std::vector<float>& values,
    size_t numComponents,
    const float* min_values,
    const float* ranges,
    float mult,
    std::vector<int16_t>* out,
    bool check = false) {
  if (values.empty()) {
    return;
  }

  for (size_t ii = 0; ii < values.size(); ii += numComponents) {
    for (size_t cc = 0; cc < numComponents; ++cc) {
      float value = (values[ii + cc] - min_values[cc]) / ranges[cc] * mult;
      if (check) {
        if (value < 0 || value > mult) {
          printf("bad value: %d, %f %f\n", static_cast<int>(ii), value, mult);
        }
      }
      out->push_back(static_cast<int16_t>(value));
    }
  }
}

void compressTo11_10_11(
    const std::vector<int16_t>& values, std::vector<int16_t>* out) {
  assert(values.size() % 3 == 0);
  for (size_t ii = 0; ii < values.size(); ii += 3) {
    uint32_t v0 = values[ii + 0];
    uint32_t v1 = values[ii + 1] / 2;
    uint32_t v2 = values[ii + 2];
    uint32_t v = (v0 << 21) |
                 (v1 << 11) |
                 (v2 <<  0) ;
    out->push_back(v & 0xFFFF);
    out->push_back(v >> 16);
  }
}

void compressTo8(const std::vector<int16_t>& values, std::vector<int16_t>* out) {
  for (size_t ii = 0; ii < values.size(); ii += 2) {
    int16_t v0 = values[ii + 0];
    int16_t v1 = 0;
    if (ii + 1 < values.size()) {
      v1 = values[ii + 1];
    }
    uint16_t v = (static_cast<uint32_t>((v0 << 0) & 0x00FF)) |
                 (static_cast<uint32_t>((v1 << 8) & 0xFF00)) ;
    out->push_back(v);
  }
}

void addFloats(
    const float* start, const float* end, std::vector<int16_t>* data) {
  const int16_t* s = reinterpret_cast<const int16_t*>(start);
  const int16_t* e = reinterpret_cast<const int16_t*>(end);
  data->insert(data->end(), s, e);
}

uint16_t ZigZag(int16_t v) {
  return (v << 1) ^ (v >> 15);
}

void write16BitAsUTF8(
    const std::vector<int16_t>&values, const std::string& filename) {
  int counts[3] = { 0, };
  std::vector<uint8_t> data;

  bool once = true;
  for (size_t ii = 0; ii < values.size(); ++ii) {
    uint16_t v = ZigZag(values[ii]);
    if (v <= 0x7F) {
      ++counts[0];
      data.push_back(static_cast<uint8_t>(v));
    } else if (v <= 0x7FF) {
      ++counts[1];
      data.push_back(0xC0 + static_cast<uint8_t>(v >> 6));
      data.push_back(0x80 + static_cast<uint8_t>(v & 0x3F));
    } else {
      if (once && v >= 0xD800 && v <= 0xDFFF) {
        once = false;
        printf("bad! at %lu\n", ii);
      }
      ++counts[2];
      data.push_back(0xE0 + static_cast<uint8_t>(v >> 12));
      data.push_back(0x80 + static_cast<uint8_t>((v >> 6) & 0x3F));
      data.push_back(0x80 + static_cast<uint8_t>((v >> 0) & 0x3F));
    }
  }

  printf("num 1 byte: %d\n", counts[0]);
  printf("num 2 byte: %d\n", counts[1]);
  printf("num 3 byte: %d\n", counts[2]);

  std::string name(filename);
  name += std::string(".utf8");
  FILE* file = fopen(name.c_str(), "wb");
  fwrite(&data[0], 1, data.size(), file);
  fclose(file);
}

void write16BitAsBinary(
    const std::vector<int16_t>&values, const std::string& filename) {
  std::string name(filename);
  name += ".bin";
  FILE* file = fopen(name.c_str(), "wb");
  fwrite(&values[0], sizeof(values[0]), values.size(), file);
  fclose(file);
}

template <typename T>
void deltafy(typename std::vector<T>* values, int num_components) {
  assert(values->size() % num_components == 0);
  typename std::vector<T> prev(values->size());
  for (size_t ii = 0; ii < values->size(); ii += num_components) {
    for (size_t jj = 0; jj < num_components; ++jj) {
      T v = (*values)[ii + jj];
      (*values)[ii + jj] = v - prev[jj];
      prev[jj] = v;
    }
  }
}

template <typename T>
struct Vertex {
  Vertex(T _p[3], T _n[3], T _u[2]) {
    p[0] = _p[0];
    p[1] = _p[1];
    p[2] = _p[2];
    n[0] = _n[0];
    n[1] = _n[1];
    n[2] = _n[2];
    u[0] = _u[0];
    u[1] = _u[1];
  }
  T p[3];
  T n[3];
  T u[2];
};

template <typename T>
bool operator<(const T& lhs, const T& rhs) {
  for (int ii = 0; ii < 3; ++ii) {
    if (lhs.p[ii] != rhs.p[ii]) {
      return lhs.p[ii] < rhs.p[ii];
    }
    if (lhs.n[ii] != rhs.n[ii]) {
      return lhs.n[ii] < rhs.n[ii];
    }
  }
  if (lhs.u[0] != rhs.u[0]) {
    return lhs.u[0] < rhs.u[0];
  }
  return lhs.u[1] < rhs.u[1];
}


template <typename T>
class Indexer {
 public:
  typedef std::vector<T> Input;
  typedef Vertex<T> Vert;
  typedef std::map<Vert, uint16_t> VertMap;

  static uint16_t addVertex(
      T p[3], T n[3], T u[2],
      Input* positions,
      Input* normals,
      Input* uvs,
      VertMap* vertex_map) {
    // ADD ASSERTS
    Vert v(p, n, u);
    typename VertMap::iterator it = vertex_map->find(v);
    if (it != vertex_map->end()) {
      return it->second;
    }
    std::pair<typename VertMap::iterator, bool> result = vertex_map->insert(
        std::make_pair(v, vertex_map->size()));
    assert(result.second);
    (*positions).push_back(p[0]);
    (*positions).push_back(p[1]);
    (*positions).push_back(p[2]);
    (*normals).push_back(n[0]);
    (*normals).push_back(n[1]);
    (*normals).push_back(n[2]);
    (*uvs).push_back(u[0]);
    (*uvs).push_back(u[1]);
    return result.first->second;
  }
};

struct Obj {
  struct ObjIndices{
    ObjIndices(int _ndx[4][3]) {
      for (size_t ii = 0; ii < 4; ++ii) {
        for (size_t jj = 0; jj < 4; ++jj) {
          ndx[ii][jj] = _ndx[ii][jj];
        }
      }
    }
    int ndx[4][3];
  };
  std::vector<float> positions;
  std::vector<float> normals;
  std::vector<float> uvs;
  std::vector<ObjIndices> indices;
  VectorInfo position_info[3];
  VectorInfo normal_info[3];
  VectorInfo uv_info[2];

  void readObj(FILE* file) {
    char buffer[256];
    while (gets(buffer)) {
      size_t len = strlen(buffer);
      if (len > 3) {
        if (!strncmp(buffer, "v ", 2)) {
          float v0;
          float v1;
          float v2;
          sscanf(buffer, "v %f %f %f", &v0, &v1, &v2);
          positions.push_back(v0);
          positions.push_back(v1);
          positions.push_back(v2);
        } else if (!strncmp(buffer, "vn ", 3)) {
          float v0;
          float v1;
          float v2;
          sscanf(buffer, "vn %f %f %f", &v0, &v1, &v2);
          normals.push_back(v0);
          normals.push_back(v1);
          normals.push_back(v2);
        } else if (!strncmp(buffer, "vt ", 3)) {
          float v0;
          float v1;
          sscanf(buffer, "vt %f %f", &v0, &v1);
          uvs.push_back(v0);
          uvs.push_back(v1);
        } else if (!strncmp(buffer, "f ", 2)) {
          // TODO: Fix to handle more than just quads
          int ndx[4][3];
          sscanf(
              buffer, "f %d/%d/%d %d/%d/%d %d/%d/%d %d/%d/%d",
              &ndx[0][0], &ndx[0][1], &ndx[0][2],
              &ndx[1][0], &ndx[1][1], &ndx[1][2],
              &ndx[2][0], &ndx[2][1], &ndx[2][2],
              &ndx[3][0], &ndx[3][1], &ndx[3][2]);
          for (size_t ii = 0; ii < 4; ++ii) {
            for (size_t jj = 0; jj < 3; ++jj) {
              --ndx[ii][jj];
              assert(ndx[ii][jj] >= 0);
            }
          }
          indices.push_back(ndx);
        }
      }
    }

    computeExtents(positions, 3, position_info);
    computeExtents(normals, 3, normal_info);
    computeExtents(uvs, 2, uv_info);

    printf("num positions: %d\n", static_cast<int>(positions.size() / 3));
    printf("num normals  : %d\n", static_cast<int>(normals.size() / 3));
    printf("num uvs      : %d\n", static_cast<int>(uvs.size() / 2));
  }
};

void write32ByteFormat(const Obj& obj, const std::string& filename) {
  printf("--write 32 byte format--\n");

  std::vector<uint16_t> tri_indices;
  std::vector<float> indexed_positions;
  std::vector<float> indexed_normals;
  std::vector<float> indexed_uvs;
  Indexer<float>::VertMap vertex_map;

  // turn the faces we have into triangles.
  for (size_t ii = 0; ii < obj.indices.size(); ++ii) {
    const Obj::ObjIndices& indices = obj.indices[ii];
    float position[3];
    float normal[3];
    float uv[2];

    uint16_t quad_indices[4];
    for (size_t pp = 0; pp < 4; ++pp) {
      size_t p_index = indices.ndx[pp][0] * 3;
      size_t n_index = indices.ndx[pp][2] * 3;
      size_t u_index = indices.ndx[pp][1] * 2;

      position[0] = obj.positions[p_index + 0];
      position[1] = obj.positions[p_index + 1];
      position[2] = obj.positions[p_index + 2];

      normal[0] = obj.normals[n_index + 0];
      normal[1] = obj.normals[n_index + 1];
      normal[2] = obj.normals[n_index + 2];

      uv[0] = obj.uvs[u_index + 0];
      uv[1] = obj.uvs[u_index + 1];

      quad_indices[pp] = Indexer<float>::addVertex(
          position, normal, uv,
          &indexed_positions, &indexed_normals, &indexed_uvs,
          &vertex_map);
    }

    tri_indices.push_back(quad_indices[0]);
    tri_indices.push_back(quad_indices[1]);
    tri_indices.push_back(quad_indices[2]);

    tri_indices.push_back(quad_indices[0]);
    tri_indices.push_back(quad_indices[2]);
    tri_indices.push_back(quad_indices[3]);
  }

  deltafy(&indexed_positions, 3);
  deltafy(&indexed_normals, 3);
  deltafy(&indexed_uvs, 2);
  deltafy(&tri_indices, 1);

  std::vector<int16_t> data;
  data.push_back(indexed_positions.size() / 3);
  data.push_back(tri_indices.size() / 3);
  data.insert(
      data.end(),
      reinterpret_cast<int16_t*>(&indexed_positions[0]),
      reinterpret_cast<int16_t*>(&indexed_positions[0] + indexed_positions.size()));
  data.insert(data.end(),
      reinterpret_cast<int16_t*>(&indexed_normals[0]),
      reinterpret_cast<int16_t*>(&indexed_normals[0] + indexed_normals.size()));
  data.insert(data.end(),
      reinterpret_cast<int16_t*>(&indexed_uvs[0]),
      reinterpret_cast<int16_t*>(&indexed_uvs[0] + indexed_uvs.size()));
  data.insert(data.end(), tri_indices.begin(), tri_indices.end());

  // write as binary.
  write16BitAsBinary(data, filename);
  // Write has UTF8
  write16BitAsUTF8(data, filename);
}

void write16ByteFormat(const Obj& obj, const std::string& filename) {
  printf("--write 16 byte format--\n");

  std::vector<int16_t> unindexed_positions;
  std::vector<int16_t> unindexed_normals;
  std::vector<int16_t> unindexed_uvs;

  float position_scale[3];
  position_scale[0] = std::max(obj.position_info[0].scale,
                               std::max(obj.position_info[1].scale,
                                        obj.position_info[2].scale));
  position_scale[1] = position_scale[0];
  position_scale[2] = position_scale[0];
  float normal_scale[3] = { 1.0f, 1.0f, 1.0f };
  float min_values[3] = { 0, 0, 0, };

  // quantize the data to the values we will store.
  quantize(
      obj.positions, 3, min_values, position_scale, 0x3FFF,
      &unindexed_positions);
  quantize(
      obj.normals, 3, min_values, normal_scale, 0x1FF,
      &unindexed_normals);
  quantize(obj.uvs, 2, min_values, normal_scale, 0x1FF,
      &unindexed_uvs);

  std::vector<uint16_t> tri_indices;
  std::vector<int16_t> indexed_positions;
  std::vector<int16_t> indexed_normals;
  std::vector<int16_t> indexed_uvs;
  Indexer<int16_t>::VertMap vertex_map;

  // turn the faces we have into triangles.
  for (size_t ii = 0; ii < obj.indices.size(); ++ii) {
    const Obj::ObjIndices& indices = obj.indices[ii];
    int16_t position[3];
    int16_t normal[3];
    int16_t uv[2];

    uint16_t quad_indices[4];
    for (size_t pp = 0; pp < 4; ++pp) {
      size_t p_index = indices.ndx[pp][0] * 3;
      size_t n_index = indices.ndx[pp][2] * 3;
      size_t u_index = indices.ndx[pp][1] * 2;

      position[0] = unindexed_positions[p_index + 0];
      position[1] = unindexed_positions[p_index + 1];
      position[2] = unindexed_positions[p_index + 2];

      normal[0] = unindexed_normals[n_index + 0];
      normal[1] = unindexed_normals[n_index + 1];
      normal[2] = unindexed_normals[n_index + 2];

      uv[0] = unindexed_uvs[u_index + 0];
      uv[1] = unindexed_uvs[u_index + 1];

      quad_indices[pp] = Indexer<int16_t>::addVertex(
          position, normal, uv,
          &indexed_positions, &indexed_normals, &indexed_uvs,
          &vertex_map);
    }

    tri_indices.push_back(quad_indices[0]);
    tri_indices.push_back(quad_indices[1]);
    tri_indices.push_back(quad_indices[2]);

    tri_indices.push_back(quad_indices[0]);
    tri_indices.push_back(quad_indices[2]);
    tri_indices.push_back(quad_indices[3]);
  }

  deltafy(&indexed_positions, 3);
  deltafy(&indexed_normals, 3);
  deltafy(&indexed_uvs, 2);
  deltafy(&tri_indices, 1);

  std::vector<int16_t> data;
  data.push_back(indexed_positions.size() / 3);
  data.push_back(tri_indices.size() / 3);
  addFloats(&position_scale[0], &position_scale[3], &data);
  data.insert(data.end(), indexed_positions.begin(), indexed_positions.end());
  data.insert(data.end(), indexed_normals.begin(), indexed_normals.end());
  data.insert(data.end(), indexed_uvs.begin(), indexed_uvs.end());
  data.insert(data.end(), tri_indices.begin(), tri_indices.end());

  printf("num 16byte vertices : %d\n",
         static_cast<int>(indexed_positions.size() / 3));
  printf("num 16byte triangles: %d\n",
         static_cast<int>(tri_indices.size() / 3));

  // write as binary.
  write16BitAsBinary(data, filename);
  // Write has UTF8
  write16BitAsUTF8(data, filename);
}

void write9ByteFormat(const Obj& obj, const std::string& filename) {
  printf("--write 9 byte format--\n");

  std::vector<int16_t> unindexed_positions;
  std::vector<int16_t> unindexed_normals;
  std::vector<int16_t> unindexed_uvs;

  float position_min[3] = {
    obj.position_info[0].min_value,
    obj.position_info[1].min_value,
    obj.position_info[2].min_value,
  };
  float position_scale[3] = {
    obj.position_info[0].range,
    obj.position_info[1].range,
    obj.position_info[2].range,
  };
  float normal_scale[3] = { 1.0, 1.0, 1.0 };
  float min_values[3] = { 0, 0, 0, };

  // quantize the data to the values we will store.
  quantize(obj.positions, 3, position_min, position_scale, 0x7FF,
           &unindexed_positions, true);
  quantize(obj.normals, 3, min_values, normal_scale, 0x7F, &unindexed_normals);
  quantize(obj.uvs, 2, min_values, normal_scale, 0xFF, &unindexed_uvs);

  std::vector<uint16_t> tri_indices;
  std::vector<int16_t> indexed_positions;
  std::vector<int16_t> indexed_normals;
  std::vector<int16_t> indexed_uvs;
  Indexer<int16_t>::VertMap vertex_map;

  // turn the faces we have into triangles.
  for (size_t ii = 0; ii < obj.indices.size(); ++ii) {
    const Obj::ObjIndices& indices = obj.indices[ii];
    int16_t position[3];
    int16_t normal[3];
    int16_t uv[2];

    uint16_t quad_indices[4];
    for (size_t pp = 0; pp < 4; ++pp) {
      size_t p_index = indices.ndx[pp][0] * 3;
      size_t n_index = indices.ndx[pp][2] * 3;
      size_t u_index = indices.ndx[pp][1] * 2;

      position[0] = unindexed_positions[p_index + 0];
      position[1] = unindexed_positions[p_index + 1];
      position[2] = unindexed_positions[p_index + 2];

      normal[0] = unindexed_normals[n_index + 0];
      normal[1] = unindexed_normals[n_index + 1];
      normal[2] = unindexed_normals[n_index + 2];

      uv[0] = unindexed_uvs[u_index + 0];
      uv[1] = unindexed_uvs[u_index + 1];

      quad_indices[pp] = Indexer<int16_t>::addVertex(
          position, normal, uv,
          &indexed_positions, &indexed_normals, &indexed_uvs,
          &vertex_map);
    }

    tri_indices.push_back(quad_indices[0]);
    tri_indices.push_back(quad_indices[1]);
    tri_indices.push_back(quad_indices[2]);

    tri_indices.push_back(quad_indices[0]);
    tri_indices.push_back(quad_indices[2]);
    tri_indices.push_back(quad_indices[3]);
  }

  deltafy(&indexed_positions, 3);
  deltafy(&indexed_normals, 3);
  deltafy(&indexed_uvs, 2);
  deltafy(&tri_indices, 1);

  std::vector<int16_t> data;
  data.push_back(indexed_positions.size() / 3);
  data.push_back(tri_indices.size() / 3);
  addFloats(&position_min[0], &position_min[3], &data);
  addFloats(&position_scale[0], &position_scale[3], &data);
  compressTo11_10_11(indexed_positions, &data);
  compressTo8(indexed_normals, &data);
  compressTo8(indexed_uvs, &data);
  data.insert(data.end(), tri_indices.begin(), tri_indices.end());

  printf("num 9byte vertices : %d\n",
         static_cast<int>(indexed_positions.size() / 3));
  printf("num 9byte triangles: %d\n",
         static_cast<int>(tri_indices.size() / 3));

  // write as binary.
  write16BitAsBinary(data, filename);
  // Write has UTF8
  write16BitAsUTF8(data, filename);
}

//int _tmain(int argc, _TCHAR* argv[])
int main(int arvc, char* argv[])
{
  Obj obj;

  obj.readObj(stdin);

  write32ByteFormat(obj, "bytes32");
  write16ByteFormat(obj, "bytes16");
  write9ByteFormat(obj, "bytes9");

  return EXIT_SUCCESS;
}

