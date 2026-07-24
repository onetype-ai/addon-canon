// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { existsSync } from 'fs';
import canon from '#canon/back/addon.js';

canon.tree.Fn('assert.pairs', function(full, path)
{
    this.applies = (item) =>
    {
        if(!item.Get('pair'))
        {
            return false;
        }

        return this.Fn('get.pattern', item.Get('path')).test(this.Fn('get.folded', path));
    };

    this.check = (item) =>
    {
        const sibling = '.' + item.Get('pair');

        if(existsSync(full.replace(/\.[^./]+$/, sibling)))
        {
            return;
        }

        violations.push({
            rule: 'tree',
            file: full,
            line: 1,
            message: 'The file rides in a pair, ' + full.split('/').pop().replace(/\.[^./]+$/, sibling) + ' stands beside it.'
        });
    };

    const violations = [];

    for(const item of Object.values(this.Items()))
    {
        if(this.applies(item))
        {
            this.check(item);
        }
    }

    return violations;
});
