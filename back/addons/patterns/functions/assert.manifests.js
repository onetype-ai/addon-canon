// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.patterns.Fn('assert.manifests', function(file)
{
    const violations = [];

    for(const item of Object.values(this.Items()))
    {
        if(!item.Get('json') || !new RegExp(item.Get('match')).test(file))
        {
            continue;
        }

        const report = (line, message) =>
        {
            violations.push({ rule: item.Get('id'), file, line, message });
        };

        this.Fn('assert.manifest', file, item.Get('fields'), report);
    }

    return violations;
});
