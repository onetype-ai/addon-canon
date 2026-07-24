// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import canon from '#canon/back/addon.js';

canon.reach.Fn('get.reached', function(root, alias, side, missing = null)
{
    this.resolvePath = (specifier, from) =>
    {
        if(specifier.startsWith('.'))
        {
            return resolve(dirname(from), specifier);
        }

        if(alias && specifier.startsWith(alias.prefix))
        {
            return resolve(root, alias.target, specifier.slice(alias.prefix.length));
        }

        return null;
    };

    this.follow = (specifier, file) =>
    {
        const next = this.resolvePath(specifier, file);

        if(!next || !next.endsWith('.js'))
        {
            return;
        }

        if(existsSync(next))
        {
            return this.walk(next);
        }

        missing && missing.push({ file, specifier });
    };

    this.walk = (file) =>
    {
        if(reached.has(file))
        {
            return;
        }

        reached.add(file);

        for(const specifier of this.Fn('get.imports', file))
        {
            this.follow(specifier, file);
        }
    };

    const entry = resolve(root, side, 'load.js');
    const reached = new Set();

    if(existsSync(entry))
    {
        this.walk(entry);
    }

    return reached;
});
