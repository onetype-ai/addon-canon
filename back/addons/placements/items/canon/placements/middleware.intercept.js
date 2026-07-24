// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.placements', (placements) =>
{
    placements.Item({
        id: 'middleware.intercept',
        method: 'MiddlewareIntercept',
        receiver: 'onetype',
        home: '/listeners/middlewares/',
        description: 'An interception of a flow is a listener.'
    });
});
