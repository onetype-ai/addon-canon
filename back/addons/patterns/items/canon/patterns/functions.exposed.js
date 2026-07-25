// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'functions.exposed',
        description: 'An exposed function file holds imports and one FnExpose carrying a body and the sentence saying what calling it does.',
        match: '/functions/exposed/[^/]+\\.js$',
        pattern: "__addon__.FnExpose('__file__', __function__, __string__);"
    });
});
