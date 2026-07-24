// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.placements', (placements) =>
{
    placements.Item({
        id: 'exposed',
        method: 'FnExpose',
        home: '/functions/exposed/',
        description: 'An exposed function is the public API, it sits in its own folder.'
    });
});
