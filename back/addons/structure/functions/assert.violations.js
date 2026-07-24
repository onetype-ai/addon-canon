// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.structure.Fn('assert.violations', function(tree, file)
{
    this.walk = (visit) =>
    {
        canon.ast.Fn('do.walk', tree, visit);
    };

    const violations = [];

    for(const item of Object.values(this.Items()))
    {
        const report = (line, message) =>
        {
            violations.push({ rule: item.Get('id'), file, line, message });
        };

        item.Get('check').call(Object.create(this), file, tree, this.walk, report);
    }

    return violations;
});
