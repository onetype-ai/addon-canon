// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';
import canon from '#canon/back/addon.js';

canon.tree.Fn('assert.violations', function(root)
{
    this.file = (full) =>
    {
        const path = relative(root, full);

        if(this.Fn('is.allowed', path))
        {
            return this.Fn('assert.pairs', full, path);
        }

        return [{
            rule: 'tree',
            file: full,
            line: 1,
            message: 'Nothing lives on ' + this.Fn('get.folded', path) + ', the file moves or a tree item allows it.'
        }];
    };

    this.entry = (full) =>
    {
        if(statSync(full).isDirectory())
        {
            return this.walk(full);
        }

        violations.push(...this.file(full));
    };

    this.walk = (folder) =>
    {
        for(const entry of readdirSync(folder))
        {
            if(!SKIP.includes(entry))
            {
                this.entry(join(folder, entry));
            }
        }
    };

    const SKIP = ['node_modules', '.git', '.DS_Store'];
    const violations = [];

    this.walk(root);

    violations.push(...this.Fn('assert.folders', root));

    for(const item of Object.values(this.Items()))
    {
        if(item.Get('required') && !existsSync(join(root, item.Get('path'))))
        {
            violations.push({
                rule: 'tree',
                file: join(root, item.Get('path')),
                line: 1,
                message: 'The package misses ' + item.Get('path') + ', ' + item.Get('description')
            });
        }
    }

    return violations;
});
