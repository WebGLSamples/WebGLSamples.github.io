// FPSTimer.h: Define fps timer.

#ifndef FPS_TIMER
#define FPS_TIMER 1

#include <vector>

static const int NUM_FRAMES_TO_AVERAGE = 16;

class FPSTimer
{
public:
  FPSTimer();

  void update(float elapsedTime);
  float getAverageFPS() { return averageFPS; }
  float getInstantaneousFPS() { return instantaneousFPS; }

private:
  float totalTime_;
  std::vector<float> timeTable_;
  int timeTableCursor_;
  float instantaneousFPS;
  float averageFPS;
};

#endif
