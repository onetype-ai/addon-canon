// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'functions.exposed',
        description: 'An exposed function file holds imports and one FnExpose registration carrying a function body, the file name is the exposed name.',
        match: '/functions/exposed/[^/]+\\.js$',
        pattern: "__addon__.FnExpose('__file__', __function__);"
    });
});
