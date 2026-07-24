// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import canon from '#canon/back/addon.js';

canon.reach.Fn('find.files', function(folder)
{
    this.entry = (full) =>
    {
        if(statSync(full).isDirectory())
        {
            return this.Fn('find.files', full);
        }

        return full.endsWith('.js') ? [full] : [];
    };

    const files = [];

    for(const entry of readdirSync(folder))
    {
        if(entry !== 'node_modules')
        {
            files.push(...this.entry(join(folder, entry)));
        }
    }

    return files;
});
