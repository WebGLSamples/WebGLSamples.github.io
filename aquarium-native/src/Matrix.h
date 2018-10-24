// Matrix.h: Do matrix calculations including multiply, addition, substraction,
// transpose, inverse, translation, etc.

#ifndef MATRIX_H
#define MATIRX_H 1

#include <cmath>
#include <vector>

namespace matrix {
static long long RANDOM_RANGE_ = 4294967296;

template <typename T>
void mulMatrixMatrix4(std::vector<T> &dst, const std::vector<T> &a, const std::vector<T> &b)
{
    T a00   = a[0];
    T a01   = a[1];
    T a02   = a[2];
    T a03   = a[3];
    T a10   = a[4 + 0];
    T a11   = a[4 + 1];
    T a12   = a[4 + 2];
    T a13   = a[4 + 3];
    T a20   = a[8 + 0];
    T a21   = a[8 + 1];
    T a22   = a[8 + 2];
    T a23   = a[8 + 3];
    T a30   = a[12 + 0];
    T a31   = a[12 + 1];
    T a32   = a[12 + 2];
    T a33   = a[12 + 3];
    T b00   = b[0];
    T b01   = b[1];
    T b02   = b[2];
    T b03   = b[3];
    T b10   = b[4 + 0];
    T b11   = b[4 + 1];
    T b12   = b[4 + 2];
    T b13   = b[4 + 3];
    T b20   = b[8 + 0];
    T b21   = b[8 + 1];
    T b22   = b[8 + 2];
    T b23   = b[8 + 3];
    T b30   = b[12 + 0];
    T b31   = b[12 + 1];
    T b32   = b[12 + 2];
    T b33   = b[12 + 3];
    dst[0]  = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
    dst[1]  = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
    dst[2]  = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
    dst[3]  = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
    dst[4]  = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
    dst[5]  = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
    dst[6]  = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
    dst[7]  = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
    dst[8]  = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
    dst[9]  = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
    dst[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
    dst[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
    dst[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
    dst[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
    dst[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
    dst[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
}

template <typename T>
void inverse4(std::vector<T> &dst, const std::vector<T> &m)
{
    T m00    = m[0 * 4 + 0];
    T m01    = m[0 * 4 + 1];
    T m02    = m[0 * 4 + 2];
    T m03    = m[0 * 4 + 3];
    T m10    = m[1 * 4 + 0];
    T m11    = m[1 * 4 + 1];
    T m12    = m[1 * 4 + 2];
    T m13    = m[1 * 4 + 3];
    T m20    = m[2 * 4 + 0];
    T m21    = m[2 * 4 + 1];
    T m22    = m[2 * 4 + 2];
    T m23    = m[2 * 4 + 3];
    T m30    = m[3 * 4 + 0];
    T m31    = m[3 * 4 + 1];
    T m32    = m[3 * 4 + 2];
    T m33    = m[3 * 4 + 3];
    T tmp_0  = m22 * m33;
    T tmp_1  = m32 * m23;
    T tmp_2  = m12 * m33;
    T tmp_3  = m32 * m13;
    T tmp_4  = m12 * m23;
    T tmp_5  = m22 * m13;
    T tmp_6  = m02 * m33;
    T tmp_7  = m32 * m03;
    T tmp_8  = m02 * m23;
    T tmp_9  = m22 * m03;
    T tmp_10 = m02 * m13;
    T tmp_11 = m12 * m03;
    T tmp_12 = m20 * m31;
    T tmp_13 = m30 * m21;
    T tmp_14 = m10 * m31;
    T tmp_15 = m30 * m11;
    T tmp_16 = m10 * m21;
    T tmp_17 = m20 * m11;
    T tmp_18 = m00 * m31;
    T tmp_19 = m30 * m01;
    T tmp_20 = m00 * m21;
    T tmp_21 = m20 * m01;
    T tmp_22 = m00 * m11;
    T tmp_23 = m10 * m01;

    T t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    T t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    T t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    T t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    T d = static_cast<T>(1.0) / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    dst[0] = d * t0;
    dst[1] = d * t1;
    dst[2] = d * t2;
    dst[3] = d * t3;
    dst[4] =
        d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
    dst[5] =
        d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
    dst[6]  = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
                  (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
    dst[7]  = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
                  (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
    dst[8]  = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
                  (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
    dst[9]  = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
                  (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
    dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
                   (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
    dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
                   (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
    dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
                   (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
    dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
                   (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
    dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
                   (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
    dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
                   (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
}

template <typename T>
void transpose4(std::vector<T> &dst, std::vector<T> &m)
{
    if (dst == m)
    {
        T t;

        t    = m[1];
        m[1] = m[4];
        m[4] = t;

        t    = m[2];
        m[2] = m[8];
        m[8] = t;

        t     = m[3];
        m[3]  = m[12];
        m[12] = t;

        t    = m[6];
        m[6] = m[9];
        m[9] = t;

        t     = m[7];
        m[7]  = m[13];
        m[13] = t;

        t     = m[11];
        m[11] = m[14];
        m[14] = t;
    }

    T m00 = m[0 * 4 + 0];
    T m01 = m[0 * 4 + 1];
    T m02 = m[0 * 4 + 2];
    T m03 = m[0 * 4 + 3];
    T m10 = m[1 * 4 + 0];
    T m11 = m[1 * 4 + 1];
    T m12 = m[1 * 4 + 2];
    T m13 = m[1 * 4 + 3];
    T m20 = m[2 * 4 + 0];
    T m21 = m[2 * 4 + 1];
    T m22 = m[2 * 4 + 2];
    T m23 = m[2 * 4 + 3];
    T m30 = m[3 * 4 + 0];
    T m31 = m[3 * 4 + 1];
    T m32 = m[3 * 4 + 2];
    T m33 = m[3 * 4 + 3];

    dst[0]  = m00;
    dst[1]  = m10;
    dst[2]  = m20;
    dst[3]  = m30;
    dst[4]  = m01;
    dst[5]  = m11;
    dst[6]  = m21;
    dst[7]  = m31;
    dst[8]  = m02;
    dst[9]  = m12;
    dst[10] = m22;
    dst[11] = m32;
    dst[12] = m03;
    dst[13] = m13;
    dst[14] = m23;
    dst[15] = m33;
}

template <typename T>
void frustum(std::vector<T> &dst, T left, T right, T bottom, T top, T near_, T far_)
{
    T dx = right - left;
    T dy = top - bottom;
    T dz = near_ - far_;

    dst[0]  = 2 * near_ / dx;
    dst[1]  = 0;
    dst[2]  = 0;
    dst[3]  = 0;
    dst[4]  = 0;
    dst[5]  = 2 * near_ / dy;
    dst[6]  = 0;
    dst[7]  = 0;
    dst[8]  = (left + right) / dx;
    dst[9]  = (top + bottom) / dy;
    dst[10] = far_ / dz;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = near_ * far_ / dz;
    dst[15] = 0;
}

template <typename T>
void getAxis(std::vector<T> &dst, const std::vector<T> &m, int axis)
{
    int off = axis * 4;
    dst[0]  = m[off + 0];
    dst[1]  = m[off + 1];
    dst[2]  = m[off + 2];
}

template <typename T>
void mulScalarVector(T k, std::vector<T> &v)
{
    for (auto &value : v)
    {
        value = value * k;
    }
}

template <typename T>
void addVector(std::vector<T> &dst, const std::vector<T> &a, const std::vector<T> &b)
{
    int aLength = static_cast<int>(a.size());
    for (int i = 0; i < aLength; ++i)
    {
        dst[i] = a[i] + b[i];
    }
}

template <typename T>
void normalize(std::vector<T> &dst, const std::vector<T> &a)
{
    T n            = 0.0;
    size_t aLength = a.size();
    for (size_t i = 0; i < aLength; ++i)
        n += a[i] * a[i];
    n = sqrt(n);
    if (n > 0.00001)
    {
        for (size_t i = 0; i < aLength; ++i)
            dst[i] = a[i] / n;
    }
    else
    {
        for (size_t i = 0; i < aLength; ++i)
            dst[i] = 0;
    }
}

template <typename T>
void subVector(std::vector<T> &dst, const std::vector<T> &a, const std::vector<T> &b)
{
    size_t aLength = a.size();
    for (size_t i = 0; i < aLength; ++i)
    {
        dst[i] = a[i] - b[i];
    }
}

template <typename T>
void cross(std::vector<T> &dst, const std::vector<T> &a, const std::vector<T> &b)
{
    dst[0] = a[1] * b[2] - a[2] * b[1];
    dst[1] = a[2] * b[0] - a[0] * b[2];
    dst[2] = a[0] * b[1] - a[1] * b[0];
}

template <typename T>
T dot(std::vector<T> &a, std::vector<T> &b)
{
    return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
}

template <typename T>
void cameraLookAt(std::vector<T> &dst,
                  const std::vector<T> &eye,
                  const std::vector<T> &target,
                  const std::vector<T> &up)
{
    std::vector<T> t0(3), t1(3), t2(3);
    subVector(t0, eye, target);
    normalize(t0, t0);
    cross(t1, up, t0);
    normalize(t1, t1);
    cross(t2, t0, t1);

    dst[0]  = t1[0];
    dst[1]  = t1[1];
    dst[2]  = t1[2];
    dst[3]  = 0;
    dst[4]  = t2[0];
    dst[5]  = t2[1];
    dst[6]  = t2[2];
    dst[7]  = 0;
    dst[8]  = t0[0];
    dst[9]  = t0[1];
    dst[10] = t0[2];
    dst[11] = 0;
    dst[12] = eye[0];
    dst[13] = eye[1];
    dst[14] = eye[2];
    dst[15] = 1;
}

static long long randomSeed_;
static void resetPseudoRandom()
{
    randomSeed_ = 0;
}

static double pseudoRandom()
{
    randomSeed_ = (134775813 * randomSeed_ + 1) % RANDOM_RANGE_;
    return static_cast<double>(randomSeed_) / static_cast<double>(RANDOM_RANGE_);
}

template <typename T>
void translation(std::vector<T> &dst, const std::vector<T> &v)
{
    dst[0]  = 1;
    dst[1]  = 0;
    dst[2]  = 0;
    dst[3]  = 0;
    dst[4]  = 0;
    dst[5]  = 1;
    dst[6]  = 0;
    dst[7]  = 0;
    dst[8]  = 0;
    dst[9]  = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = v[0];
    dst[13] = v[1];
    dst[14] = v[2];
    dst[15] = 1;
}

static double random()
{
    return rand() / (double)RAND_MAX;
}

template <typename T>
void translate(std::vector<T> &m, const std::vector<T> &v)
{
    T v0  = v[0];
    T v1  = v[1];
    T v2  = v[2];
    T m00 = m[0];
    T m01 = m[1];
    T m02 = m[2];
    T m03 = m[3];
    T m10 = m[1 * 4 + 0];
    T m11 = m[1 * 4 + 1];
    T m12 = m[1 * 4 + 2];
    T m13 = m[1 * 4 + 3];
    T m20 = m[2 * 4 + 0];
    T m21 = m[2 * 4 + 1];
    T m22 = m[2 * 4 + 2];
    T m23 = m[2 * 4 + 3];
    T m30 = m[3 * 4 + 0];
    T m31 = m[3 * 4 + 1];
    T m32 = m[3 * 4 + 2];
    T m33 = m[3 * 4 + 3];

    m[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
    m[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
    m[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
    m[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;
}

float degToRad(float degrees)
{
    return static_cast<float>(degrees * M_PI / 180.0);
}
}
#endif
