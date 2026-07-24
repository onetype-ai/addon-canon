// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.linter.Fn('assert.violations', function(source, file)
{
    const violations = [];

    const masked = source.replace(/`(?:[^`\\]|\\[\s\S])*`/g, (template) =>
    {
        return template.replace(/[^\n`]/g, 'x');
    });

    const lines = masked.split('\n');

    for(const item of Object.values(this.Items()))
    {
        const report = (line, message) =>
        {
            violations.push({ rule: item.Get('id'), file, line, message });
        };

        item.Get('check').call(Object.create(this), masked, lines, report, file);
    }

    return violations;
});
