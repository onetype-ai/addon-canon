// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.patterns', (patterns) =>
{
    patterns.Item({
        id: 'functions',
        description: 'A function file holds imports and one Fn registration carrying a function body, the file name is the function name.',
        match: '(?<!/item)/functions/[^/]+\\.js$',
        pattern: "__addon__.Fn('__file__', __function__);"
    });
});
