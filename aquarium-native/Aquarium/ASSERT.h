#ifndef ASSERT_H
#define ASSERT_H 1

#ifndef _NDEBUG
#define	ASSERT(expression)				{	\
		if (!(expression))				{	\
			printf("Assertion(%s) failed: file \"%s\", line %d\n", \
				#expression, __FILE__, __LINE__); \
            abort();				        \
		}									\
	}
#else
#define ASSERT(expression) expression
#endif

#endif // !ASSERT_H




