// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { readdirSync } from 'fs';
import canon from '#canon/back/addon.js';

canon.tree.Fn('assert.folders', function(base)
{
    this.walk = (folder) =>
    {
        const entries = readdirSync(folder, { withFileTypes: true })
            .filter((entry) =>
            {
                return entry.name !== 'node_modules'
                    && !entry.name.startsWith('.');
            });

        for(const entry of entries)
        {
            entry.isDirectory() && this.walk(folder + '/' + entry.name);
        }

        if(!entries.length)
        {
            violations.push({
                rule: 'folders',
                file: folder,
                line: 0,
                message: 'The folder ' + folder.replace(base + '/', '') + ' holds nothing, it goes away.'
            });
        }
    };

    const violations = [];

    this.walk(base);

    return violations;
});
