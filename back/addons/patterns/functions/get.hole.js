// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.patterns.Fn('get.hole', function(node)
{
    if(!node || typeof node !== 'object')
    {
        return null;
    }

    if(node.type === 'Identifier')
    {
        return /^__([a-z]+)__$/.test(node.name) ? node.name.slice(2, -2) : null;
    }

    if(node.type === 'ExpressionStatement')
    {
        return this.Fn('get.hole', node.expression);
    }

    return node.type === 'Property' && node.shorthand ? this.Fn('get.hole', node.key) : null;
});
