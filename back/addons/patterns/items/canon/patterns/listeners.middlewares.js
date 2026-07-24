// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'listeners.middlewares',
        description: 'A middleware listener intercepts one point with onetype.MiddlewareIntercept and nothing else, the file name is the point.',
        match: '/listeners/middlewares/[^/]+\\.js$',
        pattern: "onetype.middlewares.intercept('__file__', __callback__);"
    });
});
