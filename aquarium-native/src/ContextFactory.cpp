#include "ContextFactory.h"
#include "opengl/ContextGL.h"

ContextFactory::~ContextFactory()
{
    delete context;
}

Context *ContextFactory::createContext(std::string str)
{
    if (str == "opengl")
    {
        context = new ContextGL();
    }
    else if (str == "dawn")
    {
        // TODO(yizhou) : create ContextDawn
    }

    return context;
}
