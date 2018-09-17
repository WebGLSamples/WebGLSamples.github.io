// FPSTimer.cpp: Implement fps timer.

#include "FPSTimer.h"
#include <cmath>

FPSTimer::FPSTimer() : mTotalTime(static_cast<float>(NUM_FRAMES_TO_AVERAGE)), mTimeTableCursor(0)
{
    for (int i = 0; i < NUM_FRAMES_TO_AVERAGE; ++i)
    {
        mTimeTable.push_back(1.0f);
    }
}

void FPSTimer::update(float elapsedTime)
{
    mTotalTime += elapsedTime - mTimeTable[mTimeTableCursor];
    mTimeTable[mTimeTableCursor] = elapsedTime;

    ++mTimeTableCursor;
    if (mTimeTableCursor == NUM_FRAMES_TO_AVERAGE)
    {
        mTimeTableCursor = 0;
    }

    mInstantaneousFPS = floor(1.0f / elapsedTime + 0.5f);
    mAverageFPS = floor((1.0f / (mTotalTime / static_cast<float>(NUM_FRAMES_TO_AVERAGE))) + 0.5f);
}