// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'listeners.emitters',
        description: 'An emitter listener catches one event with onetype.emitters.catch and nothing else, the file name is the event.',
        match: '/listeners/emitters/[^/]+\\.js$',
        pattern: "onetype.emitters.catch('__file__', __callback__);"
    });
});
