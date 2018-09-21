// FPSTimer.h: Define fps timer.

#pragma once
#ifndef FPS_TIMER
#define FPS_TIMER 1

#include <vector>

using namespace std;

static const int NUM_FRAMES_TO_AVERAGE = 16;

class FPSTimer
{
public:
  FPSTimer();

  void update(float elapsedTime);
  const float getAverageFPS() const { return mAverageFPS; }
  const float getInstantaneousFPS() const { return mInstantaneousFPS; }

private:
  float mTotalTime;
  vector<float> mTimeTable;
  int mTimeTableCursor;
  float mInstantaneousFPS;
  float mAverageFPS;
};

#endif
