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
	float getAverageFPS() { return averageFPS; }
	float getInstantaneousFPS() { return instantaneousFPS; }

private:
	
	float totalTime_;
	vector<float> timeTable_;
	int timeTableCursor_;
	float instantaneousFPS;
	float averageFPS;
};

#endif
