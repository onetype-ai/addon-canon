// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.tree.Fn('get.pattern', function(path)
{
    const pattern = path
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/\*\*/g, '\0')
        .replace(/\*/g, '[^/]+')
        .replace(/\0/g, '.+');

    return new RegExp('^' + pattern + '$');
});
