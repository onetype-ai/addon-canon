// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { existsSync } from 'fs';
import { join } from 'path';
import canon from '#canon/back/addon.js';

canon.reach.Fn('assert.violations', function(root)
{
    const manifest = join(root, 'package.json');

    if(!existsSync(manifest))
    {
        return [];
    }

    const alias = this.Fn('get.alias', manifest);
    const violations = [];

    for(const item of Object.values(this.Items()))
    {
        const report = (file, message) =>
        {
            violations.push({
                rule: item.Get('id'),
                file,
                line: 1,
                message
            });
        };

        item.Get('check').call(Object.create(this), root, alias, report, this);
    }

    return violations;
});
