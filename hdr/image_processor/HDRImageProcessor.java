/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import java.io.*;
import java.nio.*;
import java.nio.channels.*;

/**
 * Extracts the six cube map faces from an RGBE RADIANCE image in
 * cross format and writes them to six individual files. Each file
 * contains raw little-endian floating-point values representing the
 * RGB values per pixel, in top-down order.
 */

public class HDRImageProcessor {
  public void run(String[] args) {
    for (int i = 0; i < args.length; ++i) {
      try {
        process(args[i]);
      } catch (Exception e) {
        throw new RuntimeException("While processing file " + args[i] + ":", e);
      }
    }
  }

  public static void main(String[] args) {
    new HDRImageProcessor().run(args);
  }

  //----------------------------------------------------------------------
  // Internals only below this point
  //

  private void process(String filename) throws IOException {
    DataInputStream dataIn =
        new DataInputStream(
            new BufferedInputStream(new FileInputStream(filename)));
    RGBE.Header header = RGBE.readHeader(dataIn);
    int width = header.getWidth();
    int height = header.getHeight();
    // Figure out whether we're dealing with an image with mipmaps
    // (square image, with mipmap chain embedded down and to the right
    // of the cross) or not (simple cross).
    int faceSize = 0;
    if (width == height) {
      if ((width % 4) != 0) {
        throw new RuntimeException("Image width wasn't divisible by 4");
      }
      faceSize = width / 4;
    } else {
      if ((height % 4) != 0) {
        throw new RuntimeException("Image height wasn't divisible by 4");
      }
      if ((width % 3) != 0) {
        throw new RuntimeException("Image width wasn't divisible by 3");
      }
      faceSize = height / 4;
      if (faceSize != width / 3) {
        throw new RuntimeException(
            "Couldn't determine the size of each cube map face");
      }
    }

    byte[] byteData = new byte[width * height * 4];
    RGBE.readPixelsRawRLE(dataIn, byteData, 0, width, height);
    float[] data = new float[width * height * 3];
    float[] tempRGB = new float[3];
    for (int i = 0; i < width * height; ++i) {
      RGBE.rgbe2float(tempRGB, byteData, 4 * i);
      data[3 * i + 0] = tempRGB[0];
      data[3 * i + 1] = tempRGB[1];
      data[3 * i + 2] = tempRGB[2];
    }

    // Extract six faces and write them to disk
    String baseName = filename.substring(0, filename.lastIndexOf("."));

    float[] faceData = new float[faceSize * faceSize * 3];

    // Positive X
    int ptr = 0;
    for (int j = 0; j < faceSize; ++j) {
      for (int i = 0; i < faceSize; ++i) {
        int src = getPixelIndex(i, height - (faceSize + j + 1), width, height);
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
      }
    }
    writeBinaryFile(baseName, "posx", faceData);

    // Negative X
    ptr = 0;
    for (int j = 0; j < faceSize; ++j) {
      for (int i = 0; i < faceSize; ++i) {
        int src = getPixelIndex(2 * faceSize + i, height - (faceSize + j + 1), width, height);
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
      }
    }
    writeBinaryFile(baseName, "negx", faceData);

    // Positive Y
    ptr = 0;
    for (int j = 0; j < faceSize; ++j) {
      for (int i = 0; i < faceSize; ++i) {
        int src = getPixelIndex(2 * faceSize - (i + 1), 3 * faceSize + j, width, height);
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
      }
    }
    writeBinaryFile(baseName, "posy", faceData);

    // Negative Y
    ptr = 0;
    for (int j = 0; j < faceSize; ++j) {
      for (int i = 0; i < faceSize; ++i) {
        int src = getPixelIndex(2 * faceSize - (i + 1), faceSize + j, width, height);
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
      }
    }
    writeBinaryFile(baseName, "negy", faceData);

    // Positive Z
    ptr = 0;
    for (int j = 0; j < faceSize; ++j) {
      for (int i = 0; i < faceSize; ++i) {
        int src = getPixelIndex(2 * faceSize - (i + 1), j, width, height);
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
      }
    }
    writeBinaryFile(baseName, "posz", faceData);

    // Negative Z
    ptr = 0;
    for (int j = 0; j < faceSize; ++j) {
      for (int i = 0; i < faceSize; ++i) {
        int src = getPixelIndex(faceSize + i, height - (faceSize + j + 1), width, height);
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
        faceData[ptr++] = data[src++];
      }
    }
    writeBinaryFile(baseName, "negz", faceData);
  }

  private int getPixelIndex(int x, int y, int width, int height) {
    return ((width * (height - 1 - y)) + x) * 3;
  }

  private void writeBinaryFile(String baseName, String suffix, float[] data) throws IOException {
    ByteBuffer buf = ByteBuffer.allocateDirect(4 * data.length);
    buf.order(ByteOrder.LITTLE_ENDIAN);
    FloatBuffer floatBuf = buf.asFloatBuffer();
    floatBuf.put(data);
    String outputFilename = baseName + "-" + suffix + ".bin";
    FileChannel chan = new FileOutputStream(outputFilename).getChannel();
    int len = buf.capacity();
    int totalWritten = 0;
    while (totalWritten < len) {
      int written = chan.write(buf);
      if (written == 0)
        throw new IOException("Error writing " + outputFilename);
      totalWritten += written;
    }
    chan.force(true);
    chan.close();
  }
}
