// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.ast.Fn('do.walk', function(root, visit)
{
    this.push = (value) =>
    {
        if(value && typeof value.type === 'string')
        {
            this.queue.push(value);
        }
    };

    this.children = (node) =>
    {
        for(const key of Object.keys(node))
        {
            const value = node[key];

            Array.isArray(value) ? value.forEach(this.push) : this.push(value);
        }
    };

    this.queue = [root];

    while(this.queue.length)
    {
        const node = this.queue.pop();

        if(node && typeof node.type === 'string')
        {
            visit(node);
            this.children(node);
        }
    }
});
