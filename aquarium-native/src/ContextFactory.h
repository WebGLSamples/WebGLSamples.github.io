#pragma once

#ifndef CONTEXTFACTORY
#define CONTEXTFACTORY 1
#include <string>
#include "Context.h"

class Context;

class ContextFactory
{
  public:
    ContextFactory(){};
    ~ContextFactory();
    Context *createContext(std::string str);

  private:
    Context *context;
};

#endif
