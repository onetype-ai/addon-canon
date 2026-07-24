// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'items.front',
        description: 'A front items file wraps its registration in onetype.AddonReady, the back may register bare.',
        match: '/front/(?:.*/)?items/(?:[^/]+/)+[^/]+\\.js$',
        pattern: "onetype.AddonReady('__name__', __callback__);"
    });
});
