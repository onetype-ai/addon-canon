// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.patterns.Fn('get.kind', function(node)
{
    const kinds = {
        ObjectExpression: 'object',
        ArrayExpression: 'array',
        FunctionExpression: 'function',
        ArrowFunctionExpression: 'function'
    };

    if(node.type === 'Literal')
    {
        return typeof node.value;
    }

    return kinds[node.type] ? kinds[node.type] : null;
});
