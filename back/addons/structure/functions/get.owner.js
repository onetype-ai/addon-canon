// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.structure.Fn('get.owner', function(file, side)
{
    const segments = file.split('/');
    const anchor = segments.lastIndexOf(side);
    const chain = [segments[anchor - 1].replace('@', '')];

    let index = anchor + 1;

    while(segments[index] === 'addons' && segments[index + 1])
    {
        chain.push(segments[index + 1]);
        index += 2;
    }

    return chain.join('.');
});
